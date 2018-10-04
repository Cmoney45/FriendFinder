
var friendData = require("../data/friends");

module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        res.json(friendData);
    });


    app.post("/api/friends", function (req, res) {
        console.log(req.body);
        let bestMatch = [];
        let bestMatchScore = 50;
        let bestMatchID = 0;

        // For every friend stored in our data, loop through and calculate the difference between scores.
        for (friend in friendData) {
            // Set total difference to zero for the friend the loop is on
            let totalDifference = 0;
            // For every score, find the absulte difference between the two
                //i.e. 5-1 = 4 === 1-5= -4
            for(match in friendData[friend].scores){
                totalDifference += Math.abs(req.body.scores[match] - friendData[friend].scores[match])
            }
            // If the current friend in the loop's difference in scores is less than the best match score
            // then they will become the best match since they are more likely to be friends
            if (totalDifference < bestMatchScore) {
                bestMatch = (friendData[friend]);
                bestMatchScore=totalDifference;
                bestMatchID = friend;
            }
        }
        // After the above friend search is ran, push the new friend sent in to the data/friends array
        friendData.push(req.body);

        // Send back the best match object to be used in the JS
        res.json([bestMatch,bestMatchID]);

    });

};
