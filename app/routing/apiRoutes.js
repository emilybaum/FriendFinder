// Your apiRoutes.js file should contain two routes:
    // A GET route with the url / api / friends.This will be used to display a JSON of all possible friends.
    // A POST routes / api / friends.This will be used to handle incoming survey results.This route will also be used to handle the compatibility logic.

var friendsArray = require("../data/friends.js");

module.exports = function (app) {

    // ---------------------------------------------------------------------------
    app.get("/api/friends", function (req, res) {
        return res.json(friendsArray);
    });



    // ---------------------------------------------------------------------------
    // API POST Requests
    app.post("/api/friends", function (req, res) {
        var surveyAnswers = req.body;
        var scores = surveyAnswers.scores

        surveyAnswers.scores = surveyAnswers.scores.map(function (x) {
            return parseInt(x, 10);
        });

        // friendsArray.push(surveyAnswers);
        res.json(surveyAnswers);
    });

};


