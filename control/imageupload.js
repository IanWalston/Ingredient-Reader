const path = require("path");
const fs = require("fs");
const handleError = (err, res) => {
  res
    .status(500) //server error
    .contentType("text/plain")
    .end("Oops! Something went wrong!");
};

const imageupload = (req, res) => {
  return new Promise(function(resolve, reject) {
    //define where we want the file to go
    const targetPath = path.join(__dirname, "../uploads/image.png");

    //set the temporary path to the incoming image
    const tempPath = req.file.path;

    //if extension is .png
    if (path.extname(req.file.originalname).toLowerCase() === ".png") {
      //move file to targetpath
      fs.rename(tempPath, targetPath, err => {
        if (err) reject(handleError(err, res));
        //resolve promise
        resolve("done");
      });
    } else {
      //if extension is not .png
      fs.unlink(tempPath, err => {
        if (err) reject(handleError(err, res));

        res
          .status(403) //Forbidden
          .contentType("text/plain")
          .end("Only .png files are allowed!");
      });
    }
  });
};

module.exports = imageupload