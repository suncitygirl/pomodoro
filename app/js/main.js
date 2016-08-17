'use strict';
var btn = document.getElementsByClassName("start-btn")[0];
btn.addEventListener('click', entryPoint);

var userSettings = document.getElementsByTagName('input');

//Check format and return an array [breakLength, sessionLength]
function getTime(inputList) {
    var timeList = [].map.call(inputList, function(item) {
        return item.value;
    })
    timeList.forEach(function(item) {
        try {
            if (isNaN(parseFloat(item)) || isFinite(item) || item < 1) {
                throw new TimeFormatException('Invalid time format');
            }
        } catch (err) {
            if (err instanceof TimeFormatException) {
                alert('Invalid format. Time is set up to default state')
                return [5, 25];
            };
        }
    });
    return timeList;
}

function TimeFormatException(message) {
    this.message = message;
}

//Timer constructor
function Clock(fullTime) {
    var breakLength = fullTime[0];
    var sessionLength = fullTime[1];
    var timer = function(time) {
        setInterval(function() {
            time = time - 1;
            console.log(time);
        }, 1000);
    }
    this.startSession = function() {
        var time = sessionLength * 60;
        timer(time);
    }
    this.startBreak = function() {
        var time = breakLength * 60;
        timer(time);
    }
}

//Event handler entry point after btn click event has been occured
function entryPoint() {
    var pomodoro = new Clock(getTime(userSettings));
    pomodoro.startSession();
}
