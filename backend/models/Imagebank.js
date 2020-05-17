const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//  ImageSchema which consists imagedata
const ImagebankSchema = new Schema({

  id:{
    type:String,
    required:true,
  },
  img:{
    type:String,
    required:true,
  },
  userName: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
  modifiedOn: {
    type:Date,
    default: null
  }

});

// Exporting data
module.exports = mongoose.model("Imagebank", ImagebankSchema);
