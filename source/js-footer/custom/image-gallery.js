(function($) {

    $(document).ready(function(){
        $('.image-gallery li img').on('click',function(){

            var src = $(this).attr('src');
            var img = '<img src="' + src + '" class="img-responsive"/>';

            var index = $(this).parent('li').index();

            var html = '';
            html += img;
            html += '<div style="height:25px;clear:both;display:block;">';
            html += '<a class="controls next" href="'+ (index+2) + '">next &raquo;</a>';
            html += '<a class="controls previous" href="' + (index) + '">&laquo; prev</a>';
            html += '</div>';

            $('.image-gallery--modal').modal();

            $('.image-gallery--modal').on('shown.bs.modal', function(){
                $('.image-gallery--modal .modal-body').html(html);
                //new code
                $('a.controls').trigger('click');
            })

            $('.image-gallery--modal').on('hidden.bs.modal', function(){
                $('.image-gallery--modal .modal-body').html('');
            });
        });
    });

})(jQuery);
