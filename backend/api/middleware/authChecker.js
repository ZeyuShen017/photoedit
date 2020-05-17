const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config/config");

let authChecker = async (req, res, next) => {
  //Check if Authorization header is present
  if (req.header("Authorization")) {
    //console.log("Some authorization header found");

    //Extract the token from the header
    var token = req.header("Authorization").replace("Bearer ", "");
    // Remove the quotes at the end and the beginning of the token 
    token = token.slice(0,token.length);

    try {
      // Verify the token
      jwt.verify(token, JWT_SECRET, (err) => {
        if (err) {
          // If invalid, send a 403 error
          res.sendStatus(403);
        } else {
          // Pass on to the controller. Request can be processed
          next();
        }
      });
    } catch (e) {
      // Catch unaccounted error
      res.status(500);
    }
  }

  // If no authorization header is found
  else {
    res.status(401).send({
      status: 401,
      msg: "Unauthenticated",
    });
  }
};

module.exports = authChecker;
