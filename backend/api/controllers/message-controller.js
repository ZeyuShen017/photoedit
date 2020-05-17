"use strict";
const messageService = require("../services/message-service");
/**
 * Send a one time password to the user for login
 */

exports.sendMessage = function (request, response) {
  const resolve = (item) => {
    response.status(200);
    response.json(item);
  };

  //Extract the required fields from the request
  const num = request.body.phoneNumber;
  const otp = request.body.otp;

  // Call the messageService
  messageService
    .sendMessage(num, otp)
    .then(resolve)
    .catch(renderErrorResponse(response));
};

//In case of error 
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
