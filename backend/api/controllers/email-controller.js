const fs = require('fs');
const send = require("gmail-send")({
    user: "photoedit6150@gmail.com",
    pass: "quarantinesquad#123",
  });


exports.sendEmail = function (req, res) {
    if (req.body.Action === "share") {
      //share for send picture; verify for reset password

      // Clean image data 
      var base64Data = req.body.content.replace(/^data:image\/\w+;base64,/, "");
      
      // Convert to buffer 
      var dataBuffer = new Buffer(base64Data, "base64");
      
      // Write the data 
      fs.writeFile("email.png", dataBuffer, (err) => {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          send(
            {
              subject: req.body.title,
              to: req.body.To,
              files: ["email.png"],
            },
            (error, result, fullResult) => {
              if (error) res.send(error);
              // Once the email has been sent. Delete the temporary file that we created
              fs.unlinkSync("email.png", (err)=> {
                  if(err) throw err;
              });
              res.status(200).json("Success");
            }
          );
        }
      });
    } else {
      // Send email for resetting the password 
      send(
        {
          subject: req.body.title,
          text: req.body.content,
          to: req.body.To,
        },
        (error, result, fullResult) => {
          if (error) res.send(error);
          res.status(200).json("success");
        }
      );
    }
  };