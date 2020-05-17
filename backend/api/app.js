/**
 * Import the routes & models used in the project
 */
"use strict";

module.exports = function (app) {
  
  //Initialize the models
  let userModel = require("./models/user");
  let imageModel = require("./models/Imagebank");

  //Initialize the routes
  let usersRoute = require("./routes/users-route");
  let ocrRoute = require("./routes/ocr-route");
  usersRoute(app);
  ocrRoute(app);

};
