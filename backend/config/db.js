const mongoose = require("mongoose");
const { DB_URI } = require("./config");

const options = {
  poolSize: 10,
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

// To connect to MongoDB database
mongoose
.connect(DB_URI, options)
.then(() => {
    console.log("Database connection established!");
  },
  (err) => {
    console.log("Error connecting Database instance due to: ", err);
  }
);
