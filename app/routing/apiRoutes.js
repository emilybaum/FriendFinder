// Your apiRoutes.js file should contain two routes:
    // A GET route with the url / api / friends.This will be used to display a JSON of all possible friends.
    // A POST routes / api / friends.This will be used to handle incoming survey results.This route will also be used to handle the compatibility logic.
var path = require("path");

var friendsArray = require("../data/friends.js");


module.exports = function (app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------

    app.get("/api/friends", function (req, res) {
        return res.json(friendsArray);
    });

    
    // ---------------------------------------------------------------------------
    // API POST Requests
    // app.post("/api/friends", function (req, res) {
    //     console.log("post is working")
    //     // req.body is available since we're using the body parsing middleware
    //     friendsArray.push(req.body);
    //     console.log(req.body);

    //     res.json(true);

    //     console.log("post is at the end")

    // });


    app.post("/api/friends", function (req, res) {
        var newFiend = req.body;

        console.log(newFiend);

        friendsArray.push(newFiend);

        res.json(newFiend);
    });

    // ---------------------------------------------------------------------------
    // app.post("/api/clear", function (req, res) {
    //     // Empty out the arrays of data
    //     friendsArray.length = 0;

    //     res.json({ ok: true });
    // });
};


