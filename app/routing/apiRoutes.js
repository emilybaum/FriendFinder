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
        console.log("Score for the current user");
        console.log(userMatchScore);

        
        // var bestMatch = {
        //     name: "",
        //     photo: "",
        //     matchScore: function (num, arr) {
        //         var arr = friendsArray.scores;
        //         var curr = arr[0];
        //         var diff = Math.abs(num - curr);
        //         for (var i = 0; i < arr.length; i++) {
        //             var newdiff = Math.abs(num - arr[i])
        //             if (newdiff < diff) {
        //                 diff = newdiff;
        //                 curr = arr[i];
        //             }
        //         }
        //         return curr;
        //     }
        // }


        var scoresArray = [];

        bestMatch = {
            name: "",
            photo: "",
            currentUser: user,
            bestMatchDifference: 1000,
        }


        // get sum of the friendsArray[i].scores
        // compare the sum to the user number
        // update the best match with the detials from the friendsArray (the index will be the same for this)

        getSumOfFriendScores(friendsArray)
        function getSumOfFriendScores(arr) {

            for (var i = 0; i < arr.length; i++) {
                var scoresArray = arr[i].scores
                pushSum(scoresArray)
            }

            closest(userMatchScore, scoresArray)
        }

        // function for finding the sum of an array?
        function pushSum(arr) {
            var sum = 0;
            for (var i = 0; i < arr.length; i++) {
                sum += arr[i];
            };

            scoresArray.push(sum);
        }
        
        console.log("should is an array of the sum of friend scores")
        console.log(scoresArray)
        console.log("-------------------------")

        
        // function compareScores() {
        //     var matchDifference = 0;
        //     for (var i = 0; i < friendScores.length; i++) {
        //         if (Math.abs(userMatchScore - friendScores[i]) < matchDifference) {
        //             matchDifference = friendScores[i]
        //         }
        //         else {
        //             console.log("index of: " + [i]);
        //             return [i];
        //         }
        //     }
        // }

        function closest(num, arr) {
            
            console.log("arr in closest()");
            console.log(arr);
            console.log("------------------")

            console.log("length in closest()");
            console.log(arr.length);
            console.log("------------------")


            var curr = arr[0];
            var index = []
            var diff = Math.abs(num - curr);
            for (var i = 0; i < arr.length; i++) {
                var newdiff = Math.abs(num - arr[i]);
                if (newdiff < diff) {
                    diff = newdiff;
                    curr = arr[i];
                    index = [i];
                }
            }
            console.log("this is hte index: " + index);
            console.log(curr);
            return index;
        }

        // for (var i = 0; i < friendsArray.length; i++) {
        //     matchDifference = 0;
        //     var friendsSum = 0;
        //     console.log("level one");

        //     for (var z = 0; z < friendsArray[i].scores.length; z++) {
        //         friendsSum += friendsArray[i].scores[z];
        //         console.log("level two");
            
        //     }

        //     for (var x = 0; x < surveyAnswers.scores.length; x++) {
        //         matchDifference += Math.abs(userMatchScore - friendsSum);
        //         if (matchDifference < bestMatch.bestMatchDifference) {
        //             bestMatch.name = this.name;
        //             console.log(this.name);

        //             bestMatch.photo = this.photo;
        //             console.log(this.photo);

        //             bestMatch.bestMatchDifference = matchDifference;
        //             console.log(matchDifference);

        //             console.log("level three");
        //         }
        //         else {
        //             console.log("failed")
        //         }

        //     }
            
        // }

        // console.log("result of the best match:")
        // console.log(bestMatch)
        // console.log("-----------------------------------")

        // console.log("closest match?")
        // console.log(bestMatch.matchScore(userMatchScore, friendsArray));

        // function diff(a, b) { 
        //     return Math.abs(a - b); 
        // }


        // SHOULD THIS ONLY USE THE NEW PERSON ADDED TO THE ARRAY??
        friendsArray.push(surveyAnswers);
        res.json(bestMatch);
    });

};


