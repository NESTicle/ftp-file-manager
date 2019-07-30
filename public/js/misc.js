(function ($) {
    'use strict';
    $(function () {
        //Add active class to nav-link based on url dynamically
        if (!$('#sidebar').hasClass("dynamic-active-class-disabled")) {
            var current = location.pathname.split("/").slice(-1)[0].replace(/^\/|\/$/g, '');
            $('#sidebar >.nav > li:not(.not-navigation-link) a').each(function () {
                var $this = $(this);
                if (current === "") {
                    //for root url
                    if ($this.attr('href').indexOf("/") !== -1) {
                        $(this).parents('.nav-item').last().addClass('active');
                        if ($(this).parents('.sub-menu').length) {
                            $(this).addClass('active');
                        }
                    }
                } else {
                    //for other url
                    if ($this.attr('href').indexOf(current) !== -1) {
                        $(this).parents('.nav-item').last().addClass('active');
                        if ($(this).parents('.sub-menu').length) {
                            $(this).addClass('active');
                        }
                        if (current !== "/") {
                            $(this).parents('.nav-item').last().find(".nav-link").attr("aria-expanded", "true");
                            if ($(this).parents('.sub-menu').length) {
                                $(this).closest('.collapse').addClass('show');
                            }
                        }
                    }
                }
            })
        }

        //Close other submenu in sidebar on opening any
        $("#sidebar > .nav > .nav-item > a[data-toggle='collapse']").on("click", function () {
            $("#sidebar > .nav > .nav-item").find('.collapse.show').collapse('hide');
        });

        //checkbox and radios
        $(".form-check label,.form-radio label").append('<i class="input-helper"></i>');

    });
})(jQuery);