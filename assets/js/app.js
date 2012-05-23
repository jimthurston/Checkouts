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
			
			gameTurn();
		}
	}
	);
	
	when('#hit', function()
	{
		alert("Great shot!");
		gameTurn();
	})
	
	when('#miss', function()
	{
		alert("Aw boo :(");
		gameTurn();
	})
});