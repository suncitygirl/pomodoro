'use strict';

var userSettings = document.getElementsByTagName('input');

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
    alert(timeList);
    return timeList;
}

function TimeFormatException(message) {
    this.message = message;
}

//Timer constructor
function Clock(fullTime) {
    var breakLength = fullTime[0] * 60;
    var sessionLength = fullTime[1] * 60;
    var countdown;
    var count;
    var time;
    var pause = false;
    var timer = function() {
      if (!pause) {
        countdown = setInterval(function() {
            time -= 1;
            count++;
            if (time == 0) {
              if(count == sessionLength) {
                count = 0;
                time = breakLength;
              }
              else {
                count = 0;
                time = sessionLength;
              }
            }
            console.log(time);
        }, 1000);
      }
      else {
        clearInterval(countdown);
      }
    }
    this.start = function() {
        if (!time) time = sessionLength;
        timer();
    }
    this.startBreak = function() {
        time = breakLength;
        timer();
    }
    this.isPause = function() {
      return pause;
    }
    this.toggle = function() {
      if (pause) { pause = false }
      else { pause = true;}
        console.log('pause changes to ', pause);
    }
}

var pomodoro = new Clock(getTime(userSettings));
var btn = document.getElementsByClassName("start-btn")[0];
btn.addEventListener('click', entryPoint);

//Event handler entry point after btn click event has been occured
function entryPoint() {
  //preventdeafult
  pomodoro.start();

    if (!pomodoro.isPause()) {
        pomodoro.toggle();
    } else {
        pomodoro.toggle();
    }
}
