"use strict";
/**
 * @var User this gets us the User model from the db
 */
const User = require("../models/user");

/**
 * @exports anon this is a search function that searches for the users in the collection
 */
exports.search = () => {
  const promise = User.find({});
  return promise;
};

