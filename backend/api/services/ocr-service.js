/**
 * Service to extract text from an image
 */

const vision = require("@google-cloud/vision");

// Create an ImageAnnotator client
const client = new vision.ImageAnnotatorClient({
  keyFilename: "./config/cloud-vision-api-key.json",
});

exports.checkImage = async function (data, file) {

    //Convert the imageData to buffer
    var base64Data = data.replace(/^data:image\/\w+;base64,/, "");
    var dataBuffer = new Buffer(base64Data, "base64");

    // Execute textDetection function on the data
    const [result] = await client.textDetection(dataBuffer);
    if (result.error) {
      return result.error;
    } else {
      return result.fullTextAnnotation.text;
    /*const detections = result.textAnnotations;
  detections.forEach((text) => console.log(text));*/
  }
};
