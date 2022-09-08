$(document).ready(() => {
    window.addEventListener('message', function (event) {
        const item = event.data;

        if (item.time && item.time > 0) {
            renderCountdown(item.time);
        }

        if (item.stop) {
            $("#main").empty();
        }
    });

    function renderCountdown(time) {
        let elem = '<h1 class="timer" data-seconds-left=' + time + '></h1>';

        $(elem).appendTo('#main');

        $('.timer').startTimer({
            onComplete: function (element) {
                $("#main").empty();
            }
        })
    }
});
