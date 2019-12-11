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

    // Hide banner when it is past the conference date
    function getCompareDate() {
        var d = new Date(),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        return [year, month, day].join('');
    }

    $('[future-date]').each(function() {
        console.log(getCompareDate());
        if($(this).attr('future-date') < getCompareDate())
            $(this).remove();
    });
});