const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config/config");
const userService = require("../services/user-service");

// Getting All The Users. ROUTE: /users
exports.listAllUsers = function (request, response) {
  const resolve = (user) => {
    response.status(200);
    response.json(user);
  };
  userService.search().then(resolve).catch(renderErrorResponse(response));
};

// Creating a new user
exports.createNewUser = (req, res) => {
  //Container object for creating a new user
  let newUser = new User();
  newUser.account = req.body.account;
  newUser.userName = req.body.userName;

  // If a phone number was provided
  if (req.body.phoneNumber) {
    newUser.phoneNumber = req.body.phoneNumber;
  }

  // Extract the text password
  var tempPassword = req.body.password;
  console.log("Text password", tempPassword);

  // Hash the tempPassword using bcrypt
  bcrypt.hash(tempPassword, 10, function (err, hash) {
    if (err) {
    } else {
      // Assign the hash to newUser::password
      newUser.password = hash;
      //Save the new user object to the database
      newUser.save((err, user) => {
        if (err) {
          res.status(500).send(err);
        }
        res.status(201).json(user);
      });
    }
  });
};

// To get user data
exports.readUser = (req, res) => {
  User.findById(req.params.usersId, (err, user) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(user);
  });
};

// For Posting update
exports.updateUser = (req, res) => {
  console.log("Update called!");
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      console.log("Error while hashing the password, Error: " + err);
    } else {
      console.log("Hashed password is", hash);
      User.findOneAndUpdate(
        { account: req.params.account },
        { $set: { password: hash } },
        (err, user) => {
          if (err) {
            res.status(500).send(err);
          }
          res.status(200).json(user);
        }
      );
    }
  });
};

// To authenticate the user
exports.authenticate = (req, res) => {
  if (req.body.type == "password") {
    // First check if the user is a registered user
    User.findOne({ account: req.body.account }, (err, user) => {
      if (err) {
        res.status(500).send(err);
      } else {
        // If user is registered compare the provided password with the hash from the DB
        bcrypt.compare(req.body.password, user.password, function (
          error,
          result
        ) {
          // If the function returns true, return the user object
          if (result == true) {
            // Create a new jwt for the user
            jwt.sign(
              { account: user.account },
              JWT_SECRET,
              { expiresIn: "7200s" },
              (err, token) => {
                // Return the user object along with the JSON token
                //console.log("Sending token: ", token);
                res.status(200).json({
                  user,
                  token,
                });
              }
            );
          }
          // Else return error 401 Unauthorized. Invalid Credentials
          else {
            res.status(401).send(error);
          }
        });
      }
    });
  } else if (req.query.type == "otp") {
    //console.log("Trying to login using OTP");

    User.findOne(
      { userName: req.body.userName, otp: req.body.otp },
      (err, user) => {
        if (err || user == undefined || user == null) {
          res.status(401).send(err);
        }

        if (user) {
          // If no error, return a signed token to Angular
          jwt.sign(
            { account: user.account },
            JWT_SECRET,
            { expiresIn: "7200s" },
            (err, token) => {
              // Return the user object along with the JSON token
              //console.log("Sending token: ", token);
              res.status(200).json({
                user,
                token,
              });
            }
          );
        }
      }
    )
      .then()
      .catch((err) => {
        res.send("Couldnt authenticate");
      });
  }
};

// Delete user
exports.deleteUser = (req, res) => {
  User.findByIdAndDelete(req.params.usersId, (err, user) => {
    if (err) {
      res.status(404).send(err);
    }
    res.status(200).json({ message: "Task successfully deleted" });
  });
};

//For updating the OTP
exports.updateOTP = (req, res) => {
  User.findOneAndUpdate(
    { userName: req.params.username },
    { $set: { otp: req.body.otp } },
    (err, user) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json(user);
    }
  );
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
        message: error.message,
      });
    }
  };
  return errorCallback;
};
