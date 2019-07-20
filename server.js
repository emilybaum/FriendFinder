var express = require('express');
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// added this per jordan's demo
app.use(express.static("public"));

// requiring these here as if they are in this file
require("./app/routing/htmlRoutes.js")(app);
require("./app/routing/apiRoutes.js")(app);


app.listen(PORT, function () {
    console.log("App listening on http://localhost:" + PORT);
});