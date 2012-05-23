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
		store.get('gameSettings', function(saved)
		{
			if (saved)
			{
				alert("minDifficulty: " + saved.minDifficulty);
				alert("maxDifficulty: " + saved.maxDifficulty);
				alert("gameLength: " + saved.gameLength);
				
				//let's get a target
				var target = 12;
				x$('input[name=txtTarget]').value = target;
			}
			else
			{
				alert("Error retrieving settings");
				//x$('input[id=txtTarget]').value = "Error retrieving settings";
			}
		});
		
	}
	);
	
	/*
	when('#game', function()
	{
		alert("trying to get game settings...");
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
		
	}
	);
	*/
});