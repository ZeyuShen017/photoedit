const ImageBank = require("../models/Imagebank");
const fs = require("fs");

// Listing image
exports.listAllImage = (req, res) => {
    ImageBank.find({userName: req.params.username}, (err, img) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json(img);
    });
  };

  // Image Attributes
exports.AddNewImage = (req, res) => {
  console.log("1234");

  var image= new ImageBank();
  var imgData = req.body.imgData;
  var userName = req.body.userName;
  image.userName=req.body.userName;
  var id= req.body.id; // file name
  image.img="http://localhost:3301/photo/"+ userName + "/" + id + ".png" ; //image url
  image.id=id;
  
  let __dirname= "E:\\Spring Semester\\INFO 6150\\Final Project April\\New folder\\final-project-quarantine-squad\\backend\\photo\\" + userName+ "\\";
  fs.exists(__dirname,(exists) => {
    if(!exists){
      fs.mkdir(__dirname,(err) => {
        if (err) {
          console.error("Couldnt make folder");
        }
        console.log("Created folder successfully");
      });
    }
    var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
    var dataBuffer = new Buffer(base64Data, 'base64');
    fs.writeFile(__dirname+ id + ".png", dataBuffer, (err) => {
      if(err){
        console.log("Couldnt write file");
      }else{
        console.log("suceess");
      }
    });
  });


  image.save((err, img) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(201).json(img);
  });
};

exports.UpdateImg = (req,res)=>{
  console.log("1234");
  var imgData = req.body.imgData;
  var userName = req.body.userName;
  var id= req.params.id; // file name
  ImageBank.updateOne({id: req.params.id},
      {$set: {modifiedOn: Date.now()}}, (err, user) => {
        if (err) {
          res.status(500).send(err);
        }
        res.status(200).json(user);
      }
  );
  let __dirname="C:\\Users\\heev\\Desktop\\web\\final-project-quarantine-squad\\backend\\photo\\" + userName+ "\\";
  fs.exists(__dirname,(exists) => {
    if (!exists) {
      fs.mkdir(__dirname, (err) => {
        if (err) {
          console.error(err);
        }
        console.log("create path successfully");
      });
    }
    var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
    var dataBuffer = new Buffer(base64Data, 'base64');
    fs.writeFile(__dirname + id + ".png", dataBuffer, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("suceess");
      }
    });

  });


}


exports.DeleteImg = (req,res)=>{
  var userName = req.body.userName;
  console.log(userName);
  var id= req.params.id; // file name

  ImageBank.deleteOne({id: req.params.id},
       (err, user) => {
        if (err) {
          res.status(500).send(err);
        }
        res.status(200).json(user);
      }
  );
  let __dirname="C:\\Users\\heev\\Desktop\\web\\final-project-quarantine-squad\\backend\\photo\\" + userName+ "\\";
  fs.exists(__dirname,(exists) => {
    if (!exists) {
      fs.mkdir(__dirname, (err) => {
        if (err) {
          console.error(err);
        }
        console.log("create path successfully");
      });
    }
    fs.unlinkSync(__dirname + id + ".png", (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("suceess");
      }
    });

  });


}
