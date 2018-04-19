(function($){

		// Inject nav triggers

		var mainNavHTML = '<span class="main-nav-trigger" role="button" aria-label="Toggle main navigation" tabindex="0"><em class="sbuicon-menu7"></em></span>';

		$('.main-site-nav').prepend(mainNavHTML);

		var subNavHTML = '<span class="open-sub" role="button" tabindex="0" aria-label="Show sub navigation"><em class="sbuicon-menu7"></em></span>';

		$('.main-site-nav > ul li ul').each(function() {
			$(this).siblings('a').append(subNavHTML);
			$(this).addClass('hide-accessible-mobile-960');
		});

		/* Nav Accessibility: on focus, show the sub nav dropdown */

		$('.main-site-nav a').on('focus',function() {
			$(this).parent('li').addClass('hover');
//			console.log($(this).parent().parent().parent());
//			console.log($(this).parent().parent().parent().length);
			if($(this).parent().parent().parent().length) {
				$(this).parent().parent().parent().addClass('hover');
			}
		});

		$('.main-site-nav a').on('focusout',function() {
			$(this).parent('li').removeClass('hover');
			if($(this).parent().parent().parent().length) {
				$(this).parent().parent().parent().removeClass('hover');
			}
		});

		/* Make Space and Enter activate the click handler */

		$('[role="button"]').keydown(function(event) {
	        if(event.which==13 || event.which==32) {
	        	$(this).click();
	        }
	    });

		$('[aria-role="button"]').keydown(function(event) {
	        if(event.which==13 || event.which==32) {
	        	$(this).click();
	        }
	    });

		/* Sub Nav */

		//add class of hide-accessible-mobile-960 to hide on mobile by default
		//if noscript, nav will just show on mobile automatically
		$('.main-site-nav > ul li ul').addClass('hide-accessible-mobile-960');
		var $subNav = '';

		$('div.main-site-nav .open-sub').click(function(event){
			event.preventDefault();

			$subNav = $(this).closest('li').find('ul');

	        if($(this).hasClass('active')) {
	              $subNav.removeClass('open');
	              $subNav.addClass('hide-accessible-mobile-960').show();
	        } else {
	              $subNav.removeClass('hide-accessible-mobile-960').addClass('open');
	        }


			$(this).toggleClass('active').find('em').toggleClass('sbuicon-menu7').toggleClass('sbuicon-cross2');

	    });

		/* Main Nav */

		//add class of hide-accessible-mobile-960 to hide on mobile by default
		//if noscript, nav will just show on mobile automatically
		var $navMenu = $('.main-site-nav > ul');
		$navMenu.addClass('hide-accessible-mobile-960');

		$('div.main-site-nav .main-nav-trigger').click(function(){
			//$('.div.main-site-nav:after').hide();

	        if($(this).hasClass('active')) {
	            $navMenu.fadeIn(0,function(){
	              $navMenu.removeClass('open')
	                .slideUp('fast',function() {
	                    $navMenu.addClass('hide-accessible-mobile-960').show();
	                });
	            });
	        } else {
	            $navMenu.fadeOut(0,function(){
	              $navMenu.removeClass('hide-accessible-mobile-960').addClass('open').slideDown('fast');
	            });
	        }


			$(this).toggleClass('active').find('em').toggleClass('sbuicon-menu7').toggleClass('sbuicon-cross2');

	    });

})(jQuery);
