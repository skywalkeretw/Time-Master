

function calc() {
    var beginnTimeH = Number(document.getElementById("beginnHour").value);
    var beginnTimeM = Number(document.getElementById("beginnMin").value);
    var workTimeH = Number(document.getElementById("workTimeHour").value);
    var workTimeM = Number(document.getElementById("workTimeMin").value);
    var breakTimeH = Number(document.getElementById("breakTimeHour").value);
    var breakTimeM = Number(document.getElementById("breakTimeMin").value);

    var minInH = Math.floor((beginnTimeM + workTimeM + breakTimeM)/60);
    var hours= beginnTimeH + workTimeH + breakTimeH +minInH;
    var minLeft = (beginnTimeM + workTimeM + breakTimeM)%60;
    if (minLeft<10){
        minLeft = '0'+ minLeft;
    }
    if(hours>24){
        hours-=24;
    }
    var answer = "you finish work at "+hours+":"+minLeft ;

    startCountdown(hours,minLeft);

    document.getElementById("out").innerHTML = answer;
}


function calc2() {
    var startHour = Number(document.getElementById("startHour").value);
    var startMin = Number(document.getElementById("startMin").value);
    var endHour = Number(document.getElementById("endHour").value);
    var endMin = Number(document.getElementById("endMin").value);
    var breakTimeH = Number(document.getElementById("breakTimeHour2").value);
    var breakTimeM = Number(document.getElementById("breakTimeMin2").value);
    if(startHour<25 && startMin<60) {
        var minusNumber =0;
        if (endMin>0){
            endHour +=1;
            minusNumber = 60-endMin;
        }

        var minToHour = Math.floor(( startMin + breakTimeM +minusNumber) / 60);
        var leftMin = (startMin + breakTimeM +minusNumber) % 60;
        if (leftMin != 0){
            endHour -=1;
            leftMin = 60-leftMin;
        }

        var hours = endHour - startHour - breakTimeH - minToHour;

        var answer = 'hours' + hours + 'min' + leftMin;

        document.getElementById("outWorkTime").innerHTML = answer;
    }
}


function standardBreaks(btn){
    console.log(btn.value);
    var hours;
    var min;
    switch (btn.value){
        case '0':
            hours = 0;
            min = 0;
            break;
        case '1':
            hours = 0;
            min = 30;
            break;
        case '2':
            hours = 0;
            min = 45;
            break;
        case '3':
            hours = 1;
            min = 0;
            break;
    }
    if(btn.name == 1) {
        document.getElementById("breakTimeHour").value = hours;
        document.getElementById("breakTimeMin").value = min;
    }else {
        document.getElementById("breakTimeHour2").value = hours;
        document.getElementById("breakTimeMin2").value = min;
    }
}


function standardHours(btn){
    var hours;
    var min;
    switch (btn.value){
        case '0':
            hours = 8;
            min = 0;
            break;
        case '1':
            hours =7;
            min = 30;
            break;
        case '2':
            hours = 7;
            min = 0;
            break;
    }
    document.getElementById("workTimeHour").value = hours;
    document.getElementById("workTimeMin").value = min;

}


function getFinishTime() {
    document.getElementById("endHour").value = time().getHours();
    document.getElementById("endMin").value = time().getMinutes();
}

function time() {
    return new Date();
}


//--------------------------------

var currentIntervalId = -1;

function startCountdown(hours,minutes){
    /*var hours = document.getElementById('countdownHour').value;
    var minutes = +document.getElementById('countdownMinute').value;*/
    document.getElementById("start_button").setAttribute("disabled", "true");

    if(currentIntervalId != -1){ // Nötig, da sonst bei jedem neuen Start ein weiterer Countdown parallel startet.
        clearInterval(currentIntervalId);
    }
    update(hours, minutes);
    currentIntervalId = setInterval(function(){update(hours, minutes)}, 10000);

}

function update(hours, minutes){
    var d = new Date();
    var hoursNow = d.getHours();
    var minutesNow = d.getMinutes();
    var hoursUntil = hours - hoursNow;
    var minutesUntil = minutes - minutesNow;
    if(minutesUntil < 0 && hoursUntil > 0){
        hoursUntil -= 1;
        minutesUntil += 60;
    } else if(minutesUntil > 0 && hoursUntil < 0){
        hoursUntil += 1;
        minutesUntil -= 60;
    }
    document.getElementById('outCountdown').innerHTML = hoursUntil + 'h ' + minutesUntil + 'min';
    document.title = hoursUntil + 'h ' + minutesUntil + 'min';
    return true;
}

function enableStartButton(){
    document.getElementById("start_button").removeAttribute("disabled");
}