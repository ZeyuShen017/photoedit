const Nexmo = require("nexmo");
const util = require("util");

//Specify the API key and secret
const nexmo = new Nexmo({
  apiKey: "ee981d37",
  apiSecret: "3tYapITucIoJBYPR",
});

//Number that will send the message, provided by Nexmo
const from = "19565390354";

exports.sendMessage = async function (number, otp) {
  // Return a promise on execution of the async function
  return new Promise(function (resolve, reject) {
    // Set the message string
    const message = "Your verification code is: " + otp;
    nexmo.message.sendSms(from, number, message, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
