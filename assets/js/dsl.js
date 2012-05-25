// the app method accepts a fn to invoke on init unobtrusively 
var run = function(application) {
    if (navigator.userAgent.indexOf('Browzr') > -1) {
        // blackberry
        setTimeout(application, 250)	
    } else {
        // attach to deviceready event, which is fired when phonegap is all good to go.
        x$(document).on('deviceready', application, false);
    }
}

// throw our settings into a lawnchair
, store = new Lawnchair({adaptor:'dom'})

// shows id passed
, display = function(id)
{
    x$(["#welcome", "#newgame", "#game", "#stats", "#settings", "#gameOver"]).each(function(e, i)
	{
		var display = '#' + x$(e)[0].id === id ? 'block' : 'none';
		x$(e).css({ 'display':display })
    });
}

// reg a click to [id]_button, displays id (if it exists) and executes callback (if it exists)
, when = function(id, callback) {
    x$(id + '_button').on('touchstart', function () {
        if (x$(id).length > 0)
            display(id);
        if (callback)
            callback.call(this);
		return false;
    });
}

// gets the value of the setting from the ui
, ui = function(setting) {
    var radio = x$('#newgame_form')[0][setting];
    for (var i = 0, l = radio.length; i < l; i++) {
        if (radio[i].checked)
            return radio[i].value;
    }
}

, gameTurn = function(action)
{
	display('#game');
	
	if (x$('input[name=txtTurn]').attr('value') == "")
	{
		x$('input[name=txtTurn]').attr('value', 1);
		x$('input[name=txtScore]').attr('value', 0);
	}
	else
	{
		var turn = parseInt(x$('input[name=txtTurn]').attr('value'));
		var score = parseInt(x$('input[name=txtScore]').attr('value'));
		var target = parseInt(x$('input[name=txtTarget]').attr('value'));
		
		// add any score
		if (action == "hit")
		{
			var thisScore = parseInt(x$('input[name=txtDifficulty]').attr('value'));
			score = score + thisScore;
			x$('input[name=txtScore]').attr('value', score);
		}
		
		// increment turn
		store.get('gameSettings', function(saved)
		{
			if (saved)
			{
				if (turn == saved.gameLength)
				{
					x$('input[name=txtTurn]').attr('value', "End");
					gameOver(turn, score);
				}
				else
				{
					turn = turn + 1;
					x$('input[name=txtTurn]').attr('value', turn);
				}
			}
		});
	}
	
	// load the saved data into the game view
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

			// let's get a random target (zero-based for array indexing)
			var targetIndex = Math.floor((Math.random() * targetsForGame.length));
			var target = targetsForGame[targetIndex];
			x$('input[name=txtTarget]').attr('value',target);
			
			// fetch the difficulty and display this too
			var difficulty = 0;
			
			if (targetsLevel1.indexOf(target) != -1)
				difficulty = 1;
			else if (targetsLevel2.indexOf(target) != -1)
				difficulty = 2;
			else if (targetsLevel3.indexOf(target) != -1)
				difficulty = 3;
			else if (targetsLevel4.indexOf(target) != -1)
				difficulty = 4;
			else if (targetsLevel5.indexOf(target) != -1)
				difficulty = 5;
			else if (targetsLevel6.indexOf(target) != -1)
				difficulty = 6;
			else if (targetsLevel7.indexOf(target) != -1)
				difficulty = 7;
			else
				alert("Error getting difficulty from target.");
			
			x$('input[name=txtDifficulty]').attr('value',difficulty);
		}
		else
		{
			alert("Error retrieving settings");
		}
	});
}

, gameOver = function(gameLength, finalScore)
{
	display('#gameOver');
	alert("I showed the gameOver screen...");
}

// set up an array of targets for each difficulty level
, targetsLevel1 = [4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40]
, targetsLevel2 = [2, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60]
, targetsLevel3 = [61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80]
, targetsLevel4 = [81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 100]
, targetsLevel5 = [99, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120]
, targetsLevel6 = [121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 160]
, targetsLevel7 = [161, 164, 167, 170]
;