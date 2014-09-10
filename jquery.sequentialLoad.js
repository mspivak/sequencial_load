(function($, window, document, undefined) {
		
	$.fn.sequentialLoad = function(options) {

		var elements = this;
		var pending_images = [];
		var finished = false;

		var settings = {
			paralel: 2,
			max_attempts: 2
		}

		if(options) {
            $.extend(settings, options);
        }

		$(window).load(function() {
			// Load images stack
			get_images();
			// Load first image
			for ( i=0 ; i < settings.paralel ; i++ )
				load_next_image();
		});

		function get_images() {

			elements.each(function() {
				var self = $(this);
				if ( !self.data('src') ) return;
				pending_images.push( $(self) );
			});
			got_images = true;

		}

		function load_next_image ( next_image ) {

			if ( !next_image )
				var next_image = pending_images.shift();

			if ( typeof(next_image) != 'object')
				return;



			$('<img />')
				.attr('src', next_image.data('src') )
				.load(function() {

					var src = next_image.data('src');
					$(this).attr('src', src);

					if ( next_image.is('img') )
						next_image.attr('src', src);
					else
						next_image.css('background-image', 'url(' + src + ')');
					
					// Recursively load remaining images.
					load_next_image();

				})
				.error( function() {

					if ( !next_image['attempts'] ) 
						next_image['attempts'] = 1;
					else 
						next_image['attempts']++;

					if (next_image['attempts'] < settings.max_attempts) 
						load_next_image(next_image) 
					else 
						load_next_image();

				});
		}

		function replace_src(element) {
			var src = element.data('src');
			console.log('Loading image: '+ src);

			$(this).attr('src', src);

			if ( element.is('img') ) {
				element.attr('src', src);
			} else {
				element.css('background-image', 'url(' + src + ')');
			} 

			// Recursively load remaining images.
			load_next_image();
		}

	}
})(jQuery, window, document);