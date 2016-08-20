'use strict';

//Check format and return an array [breakLength, sessionLength]
function getTime(inputList) {
    var timeList = [].map.call(inputList, function(item) {
        return item.value;
    })
    timeList.forEach(function(item) {
        try {
            if (isNaN(parseFloat(item)) || !isFinite(item) || item < 1) {
                throw new TimeFormatException('Invalid time format');
            }
        } catch (err) {
            if (err instanceof TimeFormatException) {
                alert('Invalid format. Time is set up to the default state')
                timeList = [5, 25];
            }
        };
    });
    return timeList;
}

function TimeFormatException(message) {
    this.message = message;
}

//Timer constructor
function Clock() {
    this.breakLength = 5;
    this.sessionLength = 25;
    var countdown;
    var count = 0;
    var time;
    var pause = false;
    var timer = function() {
        if (!pause) {
            countdown = setInterval(function(self) {
                if (time == 0) {
                    if (count == this.sessionLength) {
                        count = 0;
                        time = this.breakLength;
                    } else {
                        count = 0;
                        time = this.sessionLength;
                    }
                } else {
                    time -= 1;
                    count++;
                }
                minutes.innerHTML = Math.floor(time / 60);
                seconds.textContent = time % 60;
                console.log(time);
            }.bind(this), 1000);
        } else {
            clearInterval(countdown);
        }
    }.bind(this);
    this.run = function() {
        if (!time) time = this.sessionLength;
        timer();
    }
    this.isPause = function() {
        return pause;
    }
    this.toggle = function() {
        if (pause) {
            pause = false
        } else {
            pause = true;
        }
        console.log('pause changes to ', pause);
    }
}

var btn = document.getElementsByClassName("start-btn")[0];
var minutes = document.getElementsByClassName('timer__minutes')[0];
var seconds = document.getElementsByClassName('timer__seconds')[0];
btn.addEventListener('click', startTimer);

var pomodoro = new Clock();

//Event handler entry point after btn click event has been occured
function startTimer() {
    var userSettings = document.getElementsByTagName('input');
    pomodoro.sessionLength = getTime(userSettings)[1] * 60;
    pomodoro.breakLength = getTime(userSettings)[0] * 60;
    pomodoro.run();
    if (!pomodoro.isPause()) {
        pomodoro.toggle();
    } else {
        pomodoro.toggle();
    }
}
