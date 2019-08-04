var friendsArray = require("../data/friends.js");
// friendsArray[1].scores
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
            scores: surveyAnswers.scores,
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
        console.log("Score for the current user: " + userMatchScore + "\n------------------------------");
                

        // hold the scores for available friends
        var scoresArray = [];

        var bestMatch = {
            name: "",
            photo: "",
            currentUser: user,
            scoreDiff: 0,
        }


// =================================================================================================================
// =================================================================================================================

        // ENTRY POINT TO THE LOGIC FOR SUMMATION ONLY
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
        // friendsArray.push(surveyAnswers);

        console.log("best match:");
        console.log(JSON.stringify(bestMatch, null, 2));
        console.log("--------------------------------")

        // send the best match to the survey.html document via the callback
        res.json(bestMatch);
    });

};

// =================================================================================================================
// =================================================================================================================


// compareEachScoreIndex(friendsArray, user.scores); // closest (as the call back)

// function makeComparisonArr(userArr) {
//     var comparisonArr = [];
//     for (var i = 0; i < userArr.length; i++) {
//         i = 0;
//         comparisonArr.push(i);
//     }
//     console.log("comparisonArr:")
//     console.log(comparisonArr)
//     console.log("-----------------------------")
//     return comparisonArr;
// }


// compareEachScoreIndex(friendsArray, surveyAnswers.scores)
// function compareEachScoreIndex(arr1, arr2) {         
//     for (var i = 0; i < arr1.length; i++) {
//         directCompare(arr1[i].scores, arr2);
//     }
// }

// whichever number in the comparisonArr is the highest, that is the index that corresponds to the closest friend match
// function makeArryOfFriends() {
//     var friendScores;
//     for (var j = 0; j < friendsArr.length; j++) {
//         friendScores = friendsArr[j].scores;
//     }
//     directCompare(friendScores)
// }


// function directCompare(arr1, arr2) {
//     console.log(arr1);
//     console.log("-/-/-/-/-/-/-/-/-/-/-/-/-/-/-")
//     console.log(arr2);
// 
//     var comparisonArr = []
//     for (var k = 0; k < arr1.length; k++) {
//         if (arr1[k] === arr2[k]) {
//             comparisonArr.push(6);
//         }
//         else if (Math.abs(arr1[k] - arr2[k]) === 1) {
//             // push 3 into the array for that 
//             comparisonArr.push(3);
//         }
//         else {
//             // push 0 into the array for that number
//             comparisonArr.push(0);
//         }
//     }
//     console.log("comparison array:" + comparisonArr)
// }