//export the whole file as something meant to be curried by a server.js like this: "require("./fileupload.js")(app);"
module.exports = app => {
  const path = require("path");
  const recognize = require(path.join(__dirname, "/control/recognize.js"));
  const imageupload = require(path.join(__dirname, "/control/imageupload.js"));
  const ingredientfilter = require(path.join(
    __dirname,
    "/control/ingredientfilter.js"
  ));

  const multer = require("multer");
  const upload = multer({
    dest: path.join(__dirname, "/uploads")
    // you might also want to set some limits: https://github.com/expressjs/multer#limits
  });

  app.get("/", (req, res) => {
    res.render("index", {
      ingredients: ["your ingredients will be displayed here"]
    });
  });

  app.post(
    path.join(__dirname, "/upload"),
    upload.single("file" /* name attribute of <file> element in your form */),
    (req, res) => {
      imageupload(req, res)
        .then(() => {
          recognize().then(data => {
            console.log(data);

            const ingredientarr = ingredientfilter(data);

            res
              .status(200) //OK
              .render("index", { ingredients: ingredientarr });
          });
        })
        .catch(err => {
          throw err;
        });
    }
  );
};
