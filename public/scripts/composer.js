//jQuery function: At certain height of the window a 
//button will fade in and fade out 
$(window).scroll(function() {
    var height = $(window).scrollTop();
    if (height > 100) {
        $(".backTop").fadeIn();
    } else {
        $(".backTop").fadeOut();
    }
});
//When the button fadeIn a click action occures 
//and bring it back to the top
$(document).ready(function() {
    $(".backTop").click(function(event) {
        event.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    });
});
