console.log('API Route Connected Successfully');


// Link in Friends Data
var friendsData = require('../data/friends.js');


// Includes Two Routes
function apiRoutes(app) {

  // A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
  app.get('/api/friends', function (req, res) {
    res.json(friendsData);
  });

  // A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.
  app.post('/api/friends', function (req, res) {

    // Parse new friend input to get integers (AJAX post seemed to make the numbers strings
    var newFriend = {
      name: req.body.name,
      photo: req.body.photo,
      scores: []
    };
    var scoresArray = [];
    for(var i=0; i < req.body.scores.length; i++){
      scoresArray.push( parseInt(req.body.scores[i]) )
    }
    newFriend.scores = scoresArray;



    var scoreComparisionArray = [];
    for(var i=0; i < friendsData.length; i++){


      var currentComparison = 0;
      for(var j=0; j < newFriend.scores.length; j++){
        currentComparison += Math.abs( newFriend.scores[j] - friendsData[i].scores[j] );
      }

      // Push each comparison between friends to array
      scoreComparisionArray.push(currentComparison);
    }


    var bestMatchPosition = 0; 
    for(var i=1; i < scoreComparisionArray.length; i++){
      

      if(scoreComparisionArray[i] <= scoreComparisionArray[bestMatchPosition]){
        bestMatchPosition = i;
      }

    }


    var bestFriendMatch = friendsData[bestMatchPosition];


    res.json(bestFriendMatch);



    // Push the new friend to the friends data array for storage
    friendsData.push(newFriend);

  });

}


// Export for use in main server.js file
module.exports = apiRoutes;