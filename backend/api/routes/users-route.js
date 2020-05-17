/**
 * User related endpoints definitions
 */

"use strict";
const userController = require("../controllers/user-controller");
const OCRController = require("../controllers/ocr-controller");
module.exports = function (app) {
  //Reset the password using email
  app
    .route("/users/reset/:account")
    .put(userController.updateUser)
    .get(userController.listAllUsers);

  //Create a new user
  app.route("/users/registration").post(userController.createNewUser);

  //Authenticate a user. Password login and OTP login share this route
  app.route("/users/authentication").post(userController.authenticate);

  //Set the OTP in the database
  app.put("/users/:username", userController.updateOTP);

  // Call the extending image routes
  app.use("/users", require("./images-route"));

  // Call extending email routes
  app.use("/users", require("./email-routes"));

  // Call the extending message routes
  app.use("/users", require("./message-route"));
};
