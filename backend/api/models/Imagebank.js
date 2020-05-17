const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//  ImageSchema which consists imagedata
const ImagebankSchema = new Schema({

  id:{
    type:String,
    required:true,
  },

  // URL of the image: imgurl link 
  img:{
    type:String,
    required:true,
  },

  // Image belongs to which user 
  userName: {
    type: String,
    required: true
  },

  // Created date 
  createdOn: {
    type: Date,
    default: Date.now
  },

  // Useful when sending a DELETE HTTP Request to the Imgur API 
  deleteHash: {
    type: String,
    default: null
  },
  
  modifiedOn: {
    type:Date,
    default: null
  }

});

// Exporting data
module.exports = mongoose.model("Imagebank", ImagebankSchema);
