var express = require("express");
var router = express.Router();
const emailController = require("../controllers/email-controller");
const authChecker = require("../middleware/authChecker");
/*************** send mail*****************/

router
  .post("/:userName/sendEmail", emailController.sendEmail);

module.exports = router; 