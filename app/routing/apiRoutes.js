// Your apiRoutes.js file should contain two routes:
    // A GET route with the url/api/friends.This will be used to display a JSON of all possible friends.
    // A POST routes /api/friends.This will be used to handle incoming survey results.This route will also be used to handle the compatibility logic.

var friendsArray = require("../data/friends.js");

module.exports = function (app) {

    // ---------------------------------------------------------------------------
    app.get("/api/friends", function (req, res) {
        // SHOWING ALL FRIENDS IN THE ARRAY
        return res.json(friendsArray);
    });



    // ---------------------------------------------------------------------------
    // API POST Requests
    app.post("/api/friends", function (req, res) {
        var surveyAnswers = req.body;

        console.log("friendsArray")
        console.log(friendsArray);
        console.log("-----------------------------")

        surveyAnswers.scores = surveyAnswers.scores.map(function (x) {
            return parseInt(x, 10);
        });

        var user = {
            name: surveyAnswers.name,
            photo: surveyAnswers.photo,
            matchScore: function() {
                var sum = 0;
                for (var i = 0; i < surveyAnswers.scores.length; i++) {
                    sum += surveyAnswers.scores[i];
                };
        
                return sum;
            }
        }


        userMatchScore = user.matchScore();
        console.log("Score for the current user:");
        console.log(userMatchScore);
        console.log("------------------------------")

                


        var scoresArray = [];

        bestMatch = {
            name: "",
            photo: "",
            currentUser: user,
            bestMatchDifference: 1000,
        }


        getSumOfFriendScores(friendsArray, closest)

        // add up the 
        function getSumOfFriendScores(arr, callback) {

            for (var i = 0; i < arr.length; i++) {
                var individualScores = arr[i].scores
                pushSum(individualScores)
            }

            callback(userMatchScore, scoresArray)
        } 

        // find the sum of the scores for each friend
        function pushSum(arr) {
            var sum = 0;
            for (var i = 0; i < arr.length; i++) {
                sum += arr[i];
            };

            scoresArray.push(sum);
            // closest(userMatchScore, scoresArray)
        }


        function closest(num, arr) {
            
            var curr = arr[0];
            var index = 0;
            var diff = Math.abs(num - curr);
            for (var i = 0; i < arr.length; i++) {
                var newdiff = Math.abs(num - arr[i]);
                if (newdiff < diff) {
                    diff = newdiff;
                    curr = arr[i];
                    index = i;
                }
            }

            return index;
        }

        // SHOULD THIS ONLY USE THE NEW PERSON ADDED TO THE ARRAY??
        friendsArray.push(surveyAnswers);

        res.json(bestMatch);
    });

};


