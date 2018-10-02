jQuery(document).ready(function ($) {
    var MQL = 1170;

    //primary navigation slide-in effect
    if ($(window).width() > MQL) {
        var headerHeight = $('.navbar-default').height();
        $(window).on('scroll', {
                previousTop: 0
            },
            function () {
                var currentTop = $(window).scrollTop();
                //check if user is scrolling up
                if (currentTop < this.previousTop) {
                    //if scrolling up...
                    if (currentTop > 0 && $('.navbar-default').hasClass('is-fixed')) {
                        $('.navbar-default').addClass('is-visible');
                    } else {
                        $('.navbar-default').removeClass('is-visible is-fixed');
                    }
                } else {
                    //if scrolling down...
                    $('.navbar-default').removeClass('is-visible');
                    if (currentTop > headerHeight && !$('.navbar-default').hasClass('is-fixed')) $('.navbar-default').addClass('is-fixed');
                }
                this.previousTop = currentTop;
            });
    }
});