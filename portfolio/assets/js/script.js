$(document).ready(function () {
    $(document).on("scroll", onScroll);

    //smoothscroll
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");

        $('a').each(function () {
            $(this).removeClass('active');
        })
        $(this).addClass('active');

        var target = this.hash,
            menu = target;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top + 2
        }, 500, 'swing', function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
    });
});

function onScroll(event) {
    var scrollPos = $(document).scrollTop();
    $('#menu-center a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('#menu-center ul li a').removeClass("active");
            currLink.addClass("active");
        }
        else {
            currLink.removeClass("active");
        }
    });
}

// 
$(document).ready(function () {

    // Add class to mailto link
    // Needed to separate the disabling of the default action AND copy email to clipboard
    $('a[href^=mailto]').addClass('mailto-link');

    var mailto = $('.mailto-link');
    var messageCopy = 'Click to copy email address';
    var messageSuccess = 'Email address copied to clipboard';

    mailto.append('<span class="mailto-message"></span>');
    $('.mailto-message').append(messageCopy);

    // Disable opening your email client. yuk.
    $('a[href^=mailto]').click(function () {
        return false;
    })

    // On click, get href and remove 'mailto:' from value
    // Store email address in a variable.
    mailto.click(function () {
        var href = $(this).attr('href');
        var email = href.replace('mailto:', '');
        copyToClipboard(email);
        $('.mailto-message').empty().append(messageSuccess);
        setTimeout(function () {
            $('.mailto-message').empty().append(messageCopy);
        }, 2000);
    });

});

// Grabbed this from Stack Overflow.
// Copies the email variable to clipboard
function copyToClipboard(text) {
    var dummy = document.createElement("input");
    document.body.appendChild(dummy);
    dummy.setAttribute('value', text);
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
}