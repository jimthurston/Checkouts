// 
//  --- our app behavior logic ---
//
run(function () {
    // immediately invoked on first run
    var init = (function () {
    })();
    
    // a little inline controller
    when('#welcome');
    when('#newgame');
    when('#stats');
    when('#startgame', function()
	{
		// save game configuration - this will then become the default
		store.save({
			key:'gameSettings',
			minDifficulty:ui('minDifficulty'),
			maxDifficulty:ui('maxDifficulty'),
			gameLength:ui('gameLength')
		});
	}
	);
	
	when('#game', function()
	{
		// load game config from store and make sure we persist radio buttons.
		store.get('gameSettings', function(saved) {
			if (saved) {
				if (saved.minDifficulty) {
					x$('input[name=minDifficulty][value=' + saved.minDifficulty + ']').attr('checked',true);
				}
				if (saved.maxDifficulty) {
					x$('input[name=maxDifficulty][value="' + saved.maxDifficulty + '"]').attr('checked',true);
				}
				if (saved.gameLength) {
					x$('input[name=gameLength][value="' + saved.gameLength + '"]').attr('checked',true);
				}
			}
		});
	};
	
    when('#settings', function() {

	});
	
    when('#save', function () {
		display('#welcome');
    });
	
    when('#back', function () {
        display('#welcome');
    });
	
    when('#quit', function () {
        display('#welcome');
    });
});