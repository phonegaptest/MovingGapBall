document.addEventListener("deviceready", onDeviceReady, false);


var width = 350;
var height = 480;
var x = width / 2;
var y = height / 2;
var ctx = null;
var timer = null;

function onDeviceReady(event) {
    var canvas = document.getElementById("mycanvas");
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight - 100;
    width = canvas.width;
    height = canvas.height;
    var options = { frequency: 100 };
    ctx = canvas.getContext("2d");
    timer = navigator.accelerometer.watchAcceleration(onSuccess, onError, options); 
}

function onSuccess(a) {
    updateValues(a);
    updateDraw(a);
}

function onError() {
    alert('onError!');
}

function updateDraw(a) {
    var canvas = document.getElementById("mycanvas");
    ctx = canvas.getContext("2d");
    ctx.fillStyle = "black";
    ctx.clearRect(x - 30, y - 30, 60, 60);
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();

    var dx = roundNumbers(a.x, 1);
    var dy = roundNumbers(a.y, 1);
    if (x - dx <= width && x - dx > 0)
        x -= dx;
    if (y + dy <= height && y + dy > 0)
        y += dy;

//    document.getElementById('z').innerHTML = x;
}

function updateValues(a) {
    document.getElementById('x').innerHTML = roundNumbers(a.x, 3);
    document.getElementById('y').innerHTML = roundNumbers(a.y, 3);
    document.getElementById('z').innerHTML = roundNumbers(a.z, 3);
}

var roundNumbers = function (num, dec) {
    var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
    return result * 4;
}
