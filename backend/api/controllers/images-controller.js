const ImageBank = require("../models/Imagebank");
const { IMGUR_CLIENT_ID } = require("../../config/config");
const request = require("request");
const imageService = require("../services/image-service");

/**
 *  Return all the images for the matching user.  If user=null, it will
 *  return the images for all the  users
 *  USe imageService for this only because the dependency is very low with the other data
 *  Not as intertwined as other functions
 */

exports.listAllImage = function (request, response) {
  const resolve = (img) => {
    response.status(200);
    response.json(img);
  };
  imageService
    .search(request.params.userName)
    .then(resolve)
    .catch(renderErrorResponse(response));
};

/**
 *  1) Uploads a new image to imgur by sending a new request 
 *  2) Take the response from that request and save the url to the db
 *  ImageService skipped due to high dependency 
 */

exports.AddNewImage = (req, res) => {
  var image = new ImageBank();
  var imgData = req.body.imgData;
  image.userName = req.body.userName;
  image.id = req.body.id;

  // Clean the imgData
  var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");

  // Provide options for sending a request to the Imgur API
  var options = {
    method: "POST",
    url: "https://api.imgur.com/3/image",
    headers: {
      Authorization: IMGUR_CLIENT_ID,
    },
    formData: {
      image: base64Data,
    },
  };

  // Send the request
  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    if (response) {
      //Parse the body to access the objects 
      var bod = JSON.parse(body);

      // Get the link from the parsed body
      image.img = bod.data.link;
      image.deleteHash = bod.data.deletehash;

      // Save the image to the database
      image.save((e, img) => {
        if (e) { 
          res.status(500).send(e);
        }
        res.status(200).json(img);
      });
    }
  });
};


/**
 *  1) Send a request to imgur with the deleteHash to delete the old image
 *  2) Upload a new image using the base64 data  received in the req body 
 *  3) Set the new url in the database
 */


exports.UpdateImg = (req, res) => {
  
  ImageBank.findOne({ img: req.body.img }, (err, img) => {
    if (err) {
      res.status(500).send(err);
    }
    const options = {
      method: "DELETE",
      url: "https://api.imgur.com/3/image/" + img.deleteHash,
      headers: {
        Authorization: IMGUR_CLIENT_ID,
      },
    };

    request(options, function (error) {
      if (error) throw new Error(error);
    });
  });

  var imgData = req.body.imgData;
  // Clean the imgData
  var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
  var options = {
    method: "POST",
    url: "https://api.imgur.com/3/image",
    headers: {
      Authorization: IMGUR_CLIENT_ID,
    },
    formData: {
      image: base64Data,
    },
  };

  // Send the request
  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    if (response) {
      var bod = JSON.parse(body);

      // Save the image to the database
      ImageBank.updateOne(
        { img: req.body.img },
        {
          $set: {
            modifiedOn: Date.now(),
            img: bod.data.link,
            deleteHash: bod.data.deletehash,
          },
        },
        (e, img) => {
          if (e) {
            console.log(e);
            res.status(500).send(e);
          }
          res.status(201).json(img);
        }
      );
    }
  });
};


/**
 *  1) Delete the image from the database first. Record is deleted from the ImageBank colection
 *  2) Send an HTTP request to imgur with the deleteHash to request deletion of the pic 
 */

exports.DeleteImg = (req, res) => {
  ImageBank.findOneAndDelete({ img: req.body.img }, (err, img) => {
    if (err) {
      res.status(500).send(err);
    }

    // Set Imgur options
    var options = {
      method: "DELETE",
      url: "https://api.imgur.com/3/image/" + img.deleteHash,
      headers: {
        Authorization: IMGUR_CLIENT_ID,
      },
    };

    // Send the request
    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      if (response) {
        console.log(response.body);
      }
    });
    res.status(200).json(img);
  });
};


/** 
 * @function anon this function is used to handle the error 
 * @param response this variable helps us send the response  
*/
let renderErrorResponse = (response) => {
  const errorCallback = (error) => {
      if (error) {
          response.status(500);
          response.json({
              message: error.message
          });
      }
  }
  return errorCallback;
};