var targetTime;
var timer;
var ms;

function startCountdown() {

    resetGlobals()

    ms = getAsNumber("hh") * 60 * 60 * 1000;
    ms += getAsNumber("mm") * 60 * 1000;
    ms += getAsNumber("ss") * 1000;

    targetTime += ms;

    targetTime = new Date(targetTime);

    countToZero();

    timer = setInterval(countToZero, 100);
}

function getAsNumber(id) {
    var i = parseInt(getValue(id))
    return isNaN(i)
        ? 0
        : i
}

function getValue(id) {
    return getElement(id).value
}

function resetGlobals() {
    timer = null
    targetTime = new Date().getTime()
}

function countToZero() {

    var dif = targetTime - new Date(); // ms

    if (dif <= 100) {
        getElement("output").innerHTML = getTimeString(0, 0, 0)
        notifyMe();
        clearInterval(timer);
        return
    }

    dif /= 1000; // s
    var sec = Math.floor(dif % 60);
    dif /= 60; // m
    var min = Math.floor(dif % 60);
    dif /= 60 // h;
    var hour = Math.floor(dif);

    getElement("output").innerHTML = getTimeString(hour, min, sec)
}

function getTimeString(h, m, s) {
    return pad(h) + ":" + pad(m) + ":" + pad(s)
}

function pad(n) {
    return (n < 10) ? ("0" + n) : n
}

function getElement(id) {
    return document.getElementById(id)
}

// request permission on page load
document.addEventListener('DOMContentLoaded', function () {
    if (!Notification) {
        alert('Desktop notifications not available in your browser.')
        return
    }

    if (Notification.permission !== "granted")
        Notification.requestPermission()
});

function notifyMe() {
    if (Notification.permission !== "granted")
    // Notification.requestPermission();
        alert("Countdown finished")
    else {

        var notification = new Notification('Countdown finished', {
            icon: './favicon-96x96.png',
            body: "",
        });

        notification.onclick = function () {
            window.open("")
        }
    }
}