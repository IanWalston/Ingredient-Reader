//export the whole file as something meant to be curried by a server.js like this: "require("./fileupload.js")(app);"
module.exports = app => {
  //dependencies for file uploader
  const multer = require("multer");
  const path = require("path");
  const fs = require("fs");
  const ingedientread = require("./ingredientread.js");

  const handleError = (err, res) => {
    res
      .status(500) //server error
      .contentType("text/plain")
      .end("Oops! Something went wrong!");
  };

  const upload = multer({
    dest: "./uploads"
    // you might also want to set some limits: https://github.com/expressjs/multer#limits
  });

  app.post(
    "/upload",
    upload.single("file" /* name attribute of <file> element in your form */),
    (req, res) => {
      const tempPath = req.file.path;

      //define where we want the file to go
      const targetPath = path.join(__dirname, "./uploads/image.png");

      //if extention is .png
      if (path.extname(req.file.originalname).toLowerCase() === ".png") {
        //move file to targetpath
        fs.rename(tempPath, targetPath, err => {
          if (err) return handleError(err, res);

          res
            .status(200) //OK
            .contentType("text/plain")
            .end("File uploaded!");
        });
      } else {
        fs.unlink(tempPath, err => {
          if (err) return handleError(err, res);

          res
            .status(403) //Forbidden
            .contentType("text/plain")
            .end("Only .png files are allowed!");
        });
      }
      //after uploading the file to /uploads/image.png,
      return ingedientread.read();
    }
  );
};
