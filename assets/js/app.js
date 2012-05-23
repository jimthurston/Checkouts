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
					// create a new array by combining all arrays of valid difficulties
					var targetsForGame = new Array();
					
					if (saved.minDifficulty == 1)
						targetsForGame = targetsForGame.concat(targetsLevel1);

					if (saved.minDifficulty <= 2 && saved.maxDifficulty >= 2)
						targetsForGame = targetsForGame.concat(targetsLevel2);

					if (saved.minDifficulty <= 3 && saved.maxDifficulty >= 3)
						targetsForGame = targetsForGame.concat(targetsLevel3);

					if (saved.minDifficulty <= 4 && saved.maxDifficulty >= 4)
						targetsForGame = targetsForGame.concat(targetsLevel4);

					if (saved.minDifficulty <= 5 && saved.maxDifficulty >= 5)
						targetsForGame = targetsForGame.concat(targetsLevel5);

					if (saved.minDifficulty <= 6 && saved.maxDifficulty >= 6)
						targetsForGame = targetsForGame.concat(targetsLevel6);

					if (saved.maxDifficulty == 7)
						targetsForGame = targetsForGame.concat(targetsLevel7);

					//let's get a random target (zero-based for array indexing)
					alert("number of poss targets: " + targetsForGame.length);
					var targetIndex = Math.floor((Math.random() * targetsForGame.length));
					alert(targetIndex);
					var target = targetsForGame[targetIndex];
					alert(target);
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