const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// User schema data

const UserSchema = new Schema({
  
  // Email id of the user
  account: {
    type: String,
    required: true,
    unique:true,
    lowercase:true
  },
  password: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true,
    unique: true
  },
  createdOn: {
    type: Date,
    default: Date.now
  },

  // Phone number of the user with the country code
  phoneNumber: {
    type: String,
    required: false,
  },
  otp: {
    type: String,
    required: false
  }
});

// Exporting users model
module.exports = mongoose.model("users", UserSchema);