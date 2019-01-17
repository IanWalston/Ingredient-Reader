//dependencies
const express = require("express");
const app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//use files in the public folder for get requests to the root '/'
app.use(express.static("public"));

//a post request to '/upload' will [cause the server to console.log(array of ingredients read by tesseract)]
require("./fileupload.js")(app);

//set server to listen to port 3000, or whatever port the host wants it to use
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("App listening on PORT " + PORT));
