/**
 * OCR endpoints definitions
 */

"use strict";
const OCRController = require("../controllers/ocr-controller");
module.exports = function (app) {
  app
    .route("/getOCR")
    .post(OCRController.getTextFromImage);
};
