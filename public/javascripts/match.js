var guessingGifs;

$('.gif-wrapper.unmatched').click(function(e){
	$(e.currentTarget).addClass('flipped');
	guessingGifs = $('.gif-wrapper.unmatched.flipped');
	if(guessingGifs.length > 1) {
		var gif0 = $(guessingGifs[0]).find('img').attr('src');
		var gif1 = $(guessingGifs[1]).find('img').attr('src');
		if(gif0 !== gif1){
			setTimeout(function(){
				guessingGifs.removeClass('flipped');
				guessingGifs = null;
			}, 1500);
		} else {
			guessingGifs.removeClass('unmatched');
			guessingGifs = null;
			length = $('.gif-wrapper.unmatched').length;

			if(length === 0) {
				$('.winner').removeClass('hidden');
			}
		}
	}
})