$(function() {

    var Messenger = function(el) {
        'use strict';
        var m = this;

        m.init = function() {
            m.codeletters = "&#*+%?£@§$";
            m.message = 0;
            m.current_length = 0;
            m.fadeBuffer = false;
            m.messages = [
                '',
                '',
                'Find the best odds',
                'Build your own algorithms...',
                '...discover a winning formula.',
                '',
                '',
            ];

            setTimeout(m.animateIn, 30);
        };

        m.generateRandomString = function(length) {
            var random_text = '';
            while (random_text.length < length) {
                random_text += m.codeletters.charAt(Math.floor(Math.random() * m.codeletters.length));
            }

            return random_text;
        };

        m.animateIn = function() {
            if (m.current_length < m.messages[m.message].length) {
                m.current_length = m.current_length + 2;
                if (m.current_length > m.messages[m.message].length) {
                    m.current_length = m.messages[m.message].length;
                }

                var message = m.generateRandomString(m.current_length);
                $(el).html(message);

                setTimeout(m.animateIn, 20);
            } else {
                setTimeout(m.animateFadeBuffer, 20);
            }
        };

        m.animateFadeBuffer = function() {
            if (m.fadeBuffer === false) {
                m.fadeBuffer = [];
                for (var i = 0; i < m.messages[m.message].length; i++) {
                    m.fadeBuffer.push({ c: (Math.floor(Math.random() * 12)) + 1, l: m.messages[m.message].charAt(i) });
                }
            }

            var do_cycles = false;
            var message = '';

            for (var i = 0; i < m.fadeBuffer.length; i++) {
                var fader = m.fadeBuffer[i];
                if (fader.c > 0) {
                    do_cycles = true;
                    fader.c--;
                    message += m.codeletters.charAt(Math.floor(Math.random() * m.codeletters.length));
                } else {
                    message += fader.l;
                }
            }

            $(el).html(message);

            if (do_cycles === true) {
                setTimeout(m.animateFadeBuffer, 50);
            } else {
                setTimeout(m.cycleText, 2000);
            }
        };

        m.cycleText = function() {
            m.message = m.message + 1;
            if (m.message >= m.messages.length) {
                m.message = 0;
            }

            m.current_length = 0;
            m.fadeBuffer = false;
            $(el).html('');

            setTimeout(m.animateIn, 200);
        };

        m.init();
    }

    console.clear();
    var messenger = new Messenger($('#messenger'));


    //============= Header animation and fade in =======================
    $('.openWebsite').click(function() {
        $('.openWebsite').css({ 'transition': '0.3s', 'opacity': '0' });
        $('header').addClass('hideHeader');
        $('main').addClass('openMain');
    });
    $('#skipIntro').click(function() {
        $('.openWebsite').css({ 'transition': '0.3s', 'opacity': '0' });
        $('header').addClass('hideHeader');
        $('main').addClass('openMain');
    });

    $('.background').addClass('scaleImage');

    function transformLogo() {
        $('.openWebsite').addClass('transformLogo');
    };

    setTimeout(transformLogo, 3000);

    //=============  Toggle border bottom on navbar  =====================

    $('.navHeaders a').click(function() {
        $('.navHeaders a').removeClass('bottomBorderNav');
        $(this).addClass('bottomBorderNav');
    });

    //=============  Toggle side menu on-screen   =======================

    $('.toggleMenu').click(function() {
        $('.navMenu').toggleClass('showMenu');
        $('nav').toggleClass('moveRight');
        $('.overlay').toggleClass('active');
        $('.overlayBtn').toggleClass('moveRight');
    });

    // ================== SHOW AND CANCEL CONTACT FORM ===========================
    function contact() {
        $('.contact-me').click(function() {
            console.log("working");
            $('.contact-form').toggleClass('hide-form');
        });
        $('.cancel-message').click(function() {
            $('.contact-form').addClass('hide-form');
        });
    }

    contact()

});


