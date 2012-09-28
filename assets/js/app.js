// 
//  --- our app behavior logic ---
//
run
(
function()
{
	// immediately invoked on first run
	var init = (function() {
	})();

	// a little inline controller
	when('#welcome');
	when('#newgame');
	when('#help');

	when('#stats', function() {
		showStats();
	});

	when('#stats2', function() {
		showStats();
	});

	when('#back', function() {
		display('#welcome');
	});

	when('#statsok', function() {
		display('#welcome');
	});
	
	when('#help2', function() {
		display('#help');
	});

	when('#quit', function() {
		// resetting these stops the turns
		x$('input[name=txtTurn]').attr('value', "");
		x$('input[name=txtScore]').attr('value', "");
		display('#welcome');
	});

	when('#startgame', function() {
		/*
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
			
		gameTurn("new");
		}
		*/

		// save game configuration - this will then become the default
		var sliderValues = $('#difficulty').slider('value');
		var minDifficulty = sliderValues[0];
		var maxDifficulty = sliderValues[2];
		var gameLength = $('#gameLength').slider('value');

		store.save
		({
			key: 'gameSettings',
			minDifficulty: minDifficulty,
			maxDifficulty: maxDifficulty,
			gameLength: gameLength
		});

		gameTurn("new");
	});

	when('#hit', function() {
		gameTurn("hit");
	});

	when('#miss', function() {
		gameTurn("miss");
	});

	when('#game2', function() {
		display('#newgame');
	});
});