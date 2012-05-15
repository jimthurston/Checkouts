// 
//  --- our app behavior logic ---
//
run
(
	function ()
	{
		// immediately invoked on first run
		var init =
		(
			function ()
			{}
		) ();
		
		// a little inline controller
		when('#welcome');
		
		when('#stats');
		
		when('#gamestart');
		
		when('#game');
		
		when
		(
			'#settings',
			function()
			{
				// load settings from store and make sure we persist radio buttons.
				store.get
				(
					'config',
					function(saved)
					{
						if (saved)
						{
							if (saved.map)
							{
								x$('input[value=' + saved.map + ']').attr('checked',true);
							}
							if (saved.zoom)
							{
								x$('input[name=zoom][value="' + saved.zoom + '"]').attr('checked',true);
							}
						}
					}
				);
			}
		);
	
		when
		(
			'#save',
			function ()
			{
				store.save
				(
					{
						key:'config',
						map:ui('map'),
						zoom:ui('zoom')
					}
				);
				
				display('#welcome');
			}
		);
	}
);
