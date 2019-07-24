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

        console.log("surveyAnswers:")
        console.log(JSON.stringify(surveyAnswers))
        console.log("-----------------------------")

        // convert string scores into numbers
        surveyAnswers.scores = surveyAnswers.scores.map(function (x) {
            return parseInt(x, 10);
        });

        // represent the user in this object
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

        // call method for user match score and save as variable
        userMatchScore = user.matchScore();
        console.log("Score for the current user:");
        console.log(userMatchScore);
        console.log("------------------------------")

                

        // hold the scores for available friends
        var scoresArray = [];

        var bestMatch = {
            name: "",
            photo: "",
            currentUser: user,
            scoreDiff: 0,
        }


        getSumOfFriendScores(friendsArray, closest)

        // sum up the scores for each friend (includes call back to find closest match)
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
        }

        // find the closet match between the user and the avaiable friends
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
                    bestMatch.scoreDiff = newdiff;
                }
            }

            getBestMatchDetails(index)
        }

        function getBestMatchDetails(index) {
            bestMatch.name = friendsArray[index].name;
            bestMatch.photo = friendsArray[index].photo;
        }

        // add the current user to the array of available friends
        friendsArray.push(surveyAnswers);

        console.log("best match:");
        console.log(JSON.stringify(bestMatch, null, 2));
        console.log("--------------------------------")

        // send the best match to the survey.html document via the callback
        res.json(bestMatch);
    });

};


