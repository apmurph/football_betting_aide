// ==========================================================================================
// ============= Odds API ===================================================================
// ==========================================================================================

function getData(cb) {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "https://api.the-odds-api.com/v3/odds/?apiKey=ba3845918a1f0adef372a0e978784d16&sport=soccer_epl&region=uk&mkt=h2h");
    xhr.send();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
    };
}

function printDataToConsole(data) {
    console.log(data.data);
}

function writeToDocument(data) {
    var game_details = document.getElementById("PL_Games");
    games = data.data;
    game_id = 0;
    games.forEach(function(item) {
        commence_time = item.commence_time;
        var ts = new Date(commence_time * 1000);
        var game_date = ts.toDateString();
        var game_time = ts.toLocaleTimeString();
        game_details.innerHTML += '<div class="game" data-game=' + game_id + '><div>' + item.teams[1] + '</div><div>' + 'vs' + '</div><div>' + item.teams[0] + '</div><div>' + game_date + ' ' + game_time + '</div></div>';
        game_id++;
    });
    $(function() {
        $('.game').on('click', function() {
            $('.game_details').toggleClass('toggleDetails');
            game_index = this.dataset.game;
            bookkeepers = games[game_index].sites;

            console.log(games[game_index].sites);
            var bookkeeper_details = document.getElementById("bookkeepers");
            bookkeeper_details.innerHTML = '<div class="gameTitle">' + games[game_index].teams[1] + ' vs ' + games[game_index].teams[0] + '</div>';
            bookkeepers.forEach(function(item) {
                bookkeeper_details.innerHTML += '<div class="bookkeeper"><div>' + item.site_nice + '</div><div>' + 'Home ' + item.odds.h2h[1] + '</div><div>' + 'Draw ' + item.odds.h2h[2] + '</div><div>' + 'Away ' + item.odds.h2h[0] + '</div></div>';
            });
        });
    });
}

getData(printDataToConsole);
getData(writeToDocument);

//==========================================================================================
// ============= Odds API ===================================================================
// ==========================================================================================

$.ajax({
    headers: { 'X-Auth-Token': '42a42dcc3110469ea789f200ccb94677' },
    url: 'http://api.football-data.org/v2/competitions/2021/standings',
    dataType: 'json',
    type: 'GET',
}).done(function(response) {

    var standings = response.standings[0].table;
    console.log(standings);
    var standing_table_content = document.getElementById("standing_table_content");
    standings.forEach(function(item) {
        standing_table_content.innerHTML += '<tr class="standing-table__row" data-item-id="155"><td class="standing-table__cell">' + item.position + '</td> <td class = "standing-table__cell standing-table__cell--name" ><a href="#" class="standing-table__cell--name-link">' + item.team.name + '</a> </td><td class="standing-table__cell">' + item.playedGames + '</td><td class="standing-table__cell">' + item.won + '</td><td class="standing-table__cell">' + item.draw + '</td><td class="standing-table__cell">' + item.lost + '</td><td class="standing-table__cell">' + item.goalsFor + '</td><td class="standing-table__cell">' + item.goalsAgainst + '</td><td class="standing-table__cell">' + item.goalDifference + '</td><td class="standing-table__cell">' + item.points + '</td><td class="standing-table__cell"><div class="standing-table__form"><span class=""> </span><span class=""> </span><span class=""> </span><span class=""> </span><span class=""> </span></div></td></tr > '
    });


});
$.ajax({
    headers: { 'X-Auth-Token': '42a42dcc3110469ea789f200ccb94677' },
    url: 'http://api.football-data.org/v2/competitions/2021/',
    dataType: 'json',
    type: 'GET',
}).done(function(response) {
    console.log(response);
});

// ==========================================================================================

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

    //=============  Toggle side game_details on-screen   =======================

    $('.toggleGameDetails').click(function() {
        $('.game_details').toggleClass('toggleDetails');
    });

});