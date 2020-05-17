"use strict";
/**
 * @var ImageBank this gets us the ImageBank model from the db
 */
const ImageBank = require("../models/Imagebank");

/**
 * @exports anon this is a search function that searches for the images in the collection
 */
exports.search = function (params) {
  const promise = ImageBank.find({ userName: params }).exec();
  return promise;
};
