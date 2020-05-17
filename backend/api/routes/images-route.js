/**
 * Images endpoint route definitions.
 */
"use strict";
var express = require("express");
var router = express.Router();
const imageController = require("../controllers/images-controller");
const authChecker = require("../middleware/authChecker");


// Add authchecker middleware for all the routes to restrict unauthorized access 
router
  .route("/:userName/images")
  .get(authChecker, imageController.listAllImage)
  .post(authChecker, imageController.AddNewImage)
  .put(authChecker, imageController.UpdateImg)
  .delete(authChecker, imageController.DeleteImg);

router
  .route("/images")
  .get(authChecker, imageController.listAllImage);

module.exports = router;
