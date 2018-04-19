(function($){

		/* ---------------------------------------------- /*
		 * CountTo Animation
		/* ---------------------------------------------- */

		$('.count-item, .stat-card').each(function() {
			$(this).appear(function() {
				var number = $(this).find('.count-to').data('countto');
				$(this).find('.count-to').countTo({from: 0, to: number, speed: 1200, refreshInterval: 30});
			});
		});

		/* ---------------------------------------------- /*
		 * Image Backgrounds
		/* ---------------------------------------------- */

		var module = $('.intro-module, .intro-module-small, .side-image, .intro__pt-50');
		module.each(function() {
			if ($(this).attr('data-background')) {
				$(this).css('background-image', 'url(' + $(this).attr('data-background') + ')');
			}
		});

		/* ---------------------------------------------- /*
		 * Vertical Bar Stats Fill
		/* ---------------------------------------------- */

			$(function() {
					
				setTimeout(function(){
				
					$('.vbar-fill').each(function() {
						var me = $(this);
						var perc = me.attr('data-limit');
						var current_perc = 0;
						
						if(!$(this).hasClass('stop')){
						
							var progress = setInterval(function() {
															
								if (current_perc>=perc) {
									clearInterval(progress);
								} else {
									current_perc +=1;
									me.css('height', (current_perc)+'%');
									me.children('span').html(current_perc+'%');
								}
						
							}, 15);
							
							me.addClass('stop');
							
						}
						
					});
					
				}, 0);
				
			});

		/* ---------------------------------------------- /*
		 * Initlaize Nivo Lightbox
		/* ---------------------------------------------- */

		var lightbox = $('.lightbox, .nivo-lightbox');
		lightbox.each(function() {
			$(this).nivoLightbox();
		});

})(jQuery);