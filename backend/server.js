const express = require("express"),
  app = express(),
  port = process.env.PORT || 3301,
  bodyParser = require("body-parser");
  db = require("./config/db");
  cors = require("cors");

//Adding body parser for handling request and response objects.
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "10mb",
  })
);

app.use(bodyParser.json({ limit: "5mb" }));
app.use(cors());

//Enabling CORS
// Allow headers. Authorization header is necessary for exchanging of JWT tokens 
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  next();
});

//Initialize the app
let initApp = require("./api/app");
initApp(app);

app.listen(port);
console.log("Editor service started on port: " + port);
