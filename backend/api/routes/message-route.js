/**
 * Message endpoint route definitions.
 */
"use strict";
var express = require("express");
var router = express.Router();
const messageController = require("../controllers/message-controller");

// Route to send message/OTP to the user
router
    .post("/:userName/sendMessage", messageController.sendMessage);

module.exports = router;
