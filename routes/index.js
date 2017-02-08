var express = require('express');
var router = express.Router();
var request = require('request');
var gifs = [];
var gifsLength = 4;

/* GET users listing. */
router.get('/', function(req, res, next) {
	request('http://api.giphy.com/v1/stickers/search?q=cat&api_key=dc6zaTOxFJmzC', function (error, response, body) {
		if(error){
			console.log(error);
		}
		if (!error && response.statusCode == 200) {
			gifs = getGifs(body);

			res.render('index', { 
				title: 'Flip a Gif!',
				gifs: gifs
			});
			// res.send(bodyParsed.data[0]);
		}
	})
	
});

router.post('/', function (req, res) {
  res.send('Got a POST request')
})

module.exports = router;

// function: getGifs()
// Loads preselected number of random gifs into a list
function getGifs(body) {
	var bodyParsed=JSON.parse(body);
	var gifList = [];
	var randomInt;

	for(var i = 0; i < gifsLength; i++){
		randomInt = Math.floor(Math.random() * bodyParsed.data.length);

		gifList[i] = gifList[i + gifsLength] = {
			gif_num: i,
			gif_url: bodyParsed.data[randomInt].images.fixed_height.url
		};
	}

	shuffleList(gifList);

	return gifList;
}

// Shuffles the list so that the gif order is randomized
function shuffleList(array) {
  var i = 0;
  var j = 0;
  var temp = null;

  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1))
    temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}
