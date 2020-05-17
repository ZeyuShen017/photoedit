"use strict";
//Import the OCR service.
const ocrService = require("../services/ocr-service");
/**
 * Identify text in an image using the Google Cloud Vision API and return the text
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */

exports.getTextFromImage = function (request, response) {
  const resolve = (item) => {
    response.status(200);
    response.json(item);
  };

  let data = request.body.data;
  let file = request.body.file;
  //const image = request.body.imagePath;

  // Call the ocrService 
  ocrService
    .checkImage(data, file)
    .then(resolve)
    .catch(renderErrorResponse(response));
};

let renderErrorResponse = (response) => {
  const errorCallback = (error) => {
    if (error) {
      response.json({
        message: error.message,
      });
    }
  };
  return errorCallback;
};
