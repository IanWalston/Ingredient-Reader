const path = require("path");
//dependencies
const express = require("express");
const app = express();
const exphbs = require("express-handlebars");

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//use files in the public folder for get requests to the root '/'
app.use(express.static("uploads"));

//a post request to '/upload' will [cause the server to console.log(array of ingredients read by tesseract)]
require(path.join(__dirname, "/routes.js"))(app);

//set server to listen to port 3000, or whatever port the host wants it to use
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("App listening on PORT " + PORT));
