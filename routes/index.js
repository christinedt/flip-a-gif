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
			bodyParsed=JSON.parse(body);
			for(var i = 0; i < gifsLength; i++){
				gifs[i] = {
					gif_num: i,
					gif_url: bodyParsed.data[i].images.fixed_height.url
				};
			}

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
