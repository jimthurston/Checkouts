// 
//  --- our app behavior logic ---
//
run(function() {
    // immediately invoked on first run
    var init = (function() {
    })();
    
    // a little inline controller
    when('#welcome');
    when('#newgame');
	when('#stats');
	when('#settings');
	
	when('#save', function()
	{
		// save settings here
		display('#welcome');
    });
	
	when('#statsok', function()
	{
		display('#welcome');
    });
	
    when('#quit', function()
	{
        display('#welcome');
    });
	
	when('#startgame', function()
	{
		// save game configuration - this will then become the default
		store.save({
			key:'gameSettings',
			minDifficulty:ui('minDifficulty'),
			maxDifficulty:ui('maxDifficulty'),
			gameLength:ui('gameLength')
		});
		display('#game');
		
		// now let's load the saved data into the game view

		// load game config from store and make sure we persist radio buttons.
		
		
		store.get('gameSettings', function(saved)
		{
			if (saved)
			{
				//alert("saved! apparently");
				if (saved.minDifficulty) {
					alert("minDifficulty: " + saved.minDifficulty);
					alert(x$);
					x$('input[id=lblMinDifficulty][value=' + saved.minDifficulty + ']').attr('checked',true);
				}
				if (saved.maxDifficulty) {
					alert("maxDifficulty: " + saved.maxDifficulty);
					x$('input[id=lblMaxDifficulty][value="' + saved.maxDifficulty + '"]').attr('checked',true);
				}
				if (saved.gameLength) {
					alert("gameLength: " + saved.gameLength);
					x$('input[id=lblGameLength][value="' + saved.gameLength + '"]').attr('checked',true);
				}
			}
		});
		
	}
	);
	
	
	when('#game', function()
	{
		alert("trying to get game settings...");
		// load game config from store and make sure we persist radio buttons.
		
		/*
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
		*/
	}
	);

});