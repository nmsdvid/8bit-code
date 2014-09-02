$(function() {

    //if JavaScript is enabled add .js class to show the enhanced version
    $("html").addClass("js");


    //setting some variables
    var timeout = null;
    var nav = $("nav");
    var navLiEven = nav.find("li:even a");
    var navLiOdd = nav.find("li:odd a");

    navLiEven.addClass("animated");
    navLiOdd.addClass("animatedOdd");

    $(document).on('mousemove', function(event) {
        if (timeout !== null) {
            nav.addClass("focus");
            navLiEven.removeClass("fadeInDownBig").addClass("fadeInUpBig");
            navLiOdd.removeClass("fadeInDownBig").addClass("fadeInUpBig");

            clearTimeout(timeout);
        }

        timeout = setTimeout(function() {
            nav.removeClass("focus");
            navLiEven.removeClass("fadeInUpBig").addClass("fadeInDownBig");
            navLiOdd.removeClass("fadeInUpBig").addClass("fadeInDownBig");
        }, 2000); //Mouse idle for 2 sec
    });

    //when the user leaves the screen
    $("body").mouseleave(function() {
        nav.removeClass("focus");
        navLiEven.removeClass("fadeInUpBig").addClass("fadeInDownBig");
        navLiOdd.removeClass("fadeInUpBig").addClass("fadeInDownBig");
    });

    //code explanation at
    //http://stackoverflow.com/questions/16050564/horizontal-scroll-on-mousemove-wide-div-in-smaller-div-with-overflowhidden-c
    var $bl = $(".main-nav"),
        $th = $(".main-nav ul"),
        blW = $bl.outerWidth(),
        blSW = $bl[0].scrollWidth,
        wDiff = (blSW / blW) - 1, // widths difference ratio
        mPadd = 200, // Mousemove Padding
        damp = 20, // Mousemove response softness
        mX = 0, // Real mouse position
        mX2 = 0, // Modified mouse position
        posX = 0,
        mmAA = blW - (mPadd * 2), // The mousemove available area
        mmAAr = (blW / mmAA); // get available mousemove fidderence ratio

    $bl.mousemove(function(e) {
        mX = e.pageX - this.offsetLeft;
        mX2 = Math.min(Math.max(0, mX - mPadd), mmAA) * mmAAr;
    });

    setInterval(function() {
        posX += (mX2 - posX) / damp; // zeno's paradox equation "catching delay"
        $th.css({
            marginLeft: -posX * wDiff
        });
    }, 10);

});
