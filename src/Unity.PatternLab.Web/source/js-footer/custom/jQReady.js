(function($) {

    $(document).ready(function() {

        var accordionContent;
        var openTab;
        $('.drop-accordion-card').on('click', function() {

            accordionContent = $(this).closest('.drop-accordion-card').find('.drop-accordion-card--content-wrap');
            openTab = $(this).closest('.drop-accordion-cards').find('.js-drop-accordion-card__open').closest('.drop-accordion-card').find('.drop-accordion-card--tab');

            if (accordionContent.hasClass('hide-accessible')) {
                $(this).addClass('js-drop-accordion-card__active');
                accordionContent.slideUp(0, function() {
                    accordionContent.removeClass('hide-accessible').addClass('js-drop-accordion-card__open')
                        .slideDown('fast');
                    openTab.click();
                });

            } else {
                $(this).removeClass('js-drop-accordion-card__active');
                accordionContent.slideUp('fast', function() {
                    accordionContent.addClass('hide-accessible').removeClass('js-drop-accordion-card__open')
                        .slideDown(0);
                });

            }

        });

       activeTab = $('.nav-tabs-wrapper li.active');
       //console.log(activeTab);

       if(activeTab.length === 0 )
       {
         activeTab = $('.nav-tabs-wrapper li').first();
         //console.log('activetab');
         //console.log(activeTab);
         activeTab.addClass('active');

         activeTabContent = $('.nav-tabs-wrapper .tab-content .tab-pane');
         activeTabContent.first().addClass('active');
         //console.log(activeTabContent);
       }

    });





$(document).on('click', 'a.controls', function(){
    var index = $(this).attr('href');
    var src = $('ul.row li:nth-child('+ index +') img').attr('src');

    $('.modal-body img').attr('src', src);

    var newPrevIndex = parseInt(index) - 1;
    var newNextIndex = parseInt(newPrevIndex) + 2;

    if($(this).hasClass('previous')){
        $(this).attr('href', newPrevIndex);
        $('a.next').attr('href', newNextIndex);
    }else{
        $(this).attr('href', newNextIndex);
        $('a.previous').attr('href', newPrevIndex);
    }

    var total = $('ul.row li').length + 1;
    //hide next button
    if(total === newNextIndex){
        $('a.next').hide();
    }else{
        $('a.next').show()
    }
    //hide previous button
    if(newPrevIndex === 0){
        $('a.previous').hide();
    }else{
        $('a.previous').show()
    }


    return false;
});

//boldMovesBox

$('.bold-moves-box').on('click',function(e) {
  if($(e.target).hasClass('boldMovesBox-title') || $(e.target).parents('.boldMovesBox-title').length) {
    e.preventDefault();
  }
  // if($(window).width()<1024) {
  //   if(!$(this).hasClass('engaged') && !$(e.target).hasClass('boldMovesBox-link')) {
  //     $(this).toggleClass('engaged');
  //   } else if($(e.target).hasClass('close-boldMovesBox') || $(e.target).hasClass('close-boldMovesBox-x')) {
  //     e.preventDefault();
  //     $(this).closest('.boldMovesBox').removeClass('engaged');
  //   }
  // }
});

$('.bold-moves-box').hover(
  function() {
    console.log();
    if($(window).width()>=1024) {
      if(!$(this).hasClass('bold-moves-box__engaged')) {
        $(this).addClass('bold-moves-box__engaged');
      }
    }
  }, function() {
    if($(window).width()>=1024) {
      if($(this).hasClass('bold-moves-box__engaged')) {
        $(this).removeClass('bold-moves-box__engaged');
      }
    }
  }
);

})(jQuery);
