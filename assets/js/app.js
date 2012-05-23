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
		// first check the difficulty levels are sensible
		if (ui('minDifficulty') > ui('maxDifficulty'))
		{
			alert("Nonsense difficulty levels chosen!");
		}
		else
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
					//alert("minDifficulty: " + saved.minDifficulty);
					//alert("maxDifficulty: " + saved.maxDifficulty);
					//alert("gameLength: " + saved.gameLength);
					
					// create a new array by combining all arrays of valid difficulties
					var targetsForGame = new Array();
					
					if (saved.minDifficulty == 1)
						targetsForGame = targetsForGame.concat(targetsLevel1);

					//let's get a target
					alert(targetsForGame);
					
					var target = 12;
					x$('input[name=txtTarget]').attr('value',target);
				}
				else
				{
					alert("Error retrieving settings");
				}
			});
		}
	}
	);
	
	when('#hit', function()
	{
		alert("Great shot!");
		display('#game');
	})
	
	when('#miss', function()
	{
		alert("Aw boo :(");
		display('#game');
	})
});