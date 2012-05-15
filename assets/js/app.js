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
			{
				if (navigator.network.connection.type == Connection.NONE)
				{
					alert("No internet connection - we won't be able to show you any maps");
				}
				else
				{
					alert("We can reach Google - get ready for some awesome maps!");
				}
			}
		) ();
		
		// a little inline controller
		when('#welcome');
		
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
