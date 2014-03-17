var ctx;
var canvas;
var ctx1;
var canvas1;
var locx = 60;
var locy = 30;

$(function () {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    canvas1 = document.getElementById("canvas1");
    ctx1 = canvas1.getContext("2d");

    var body = document.body,
    html = document.documentElement;


    var height = Math.max(body.scrollHeight, body.offsetHeight,
                           html.clientHeight, html.scrollHeight, html.offsetHeight);

    var width = Math.max(body.scrollWidth, body.offsetWidth,
                           html.clientWidth, html.scrollWidth, html.offsetWidth);

    canvas.setAttribute('height', 0.75 * height);
    canvas.setAttribute('width', 0.81 * width);
    canvas1.setAttribute('height', 0.75 * height);
    canvas1.setAttribute('width', 0.81 * width);

    startGame(1);
});

function startGame(level) {
    locx = 60;
    locy = 30;
    drawPlayer(0, 0);
    drawRaspberry(true);
    drawMap(level);
}

var playerRect = new Rect(0, 0, 0, 0);
var raspberryRect = new Rect(0,0,0,0);

function drawPlayer(ofx, ofy, onCollision) {
    var img = new Image;
    img.src = "./boy.png";
    img.onload = function () {
        ctx1.clearRect(locx, locy, 80, 92);

        locx = locx + ofx;
        locy = locy + ofy;

        var tempPlayerRect = new Rect(locx, locy, 80, 92);
        for (var i = 0; i < rects.length; i++) {
            if (rectscollide(tempPlayerRect, rects[i]) || rectscollide(rects[i], tempPlayerRect) ) {
                onCollision();
                return;
            }
        }

        playerRect = tempPlayerRect;
        if (rectscollide(raspberryRect, playerRect) || rectscollide(playerRect, raspberryRect)) {
            drawRaspberry(false);
            startGame(1);

        }

        ctx1.drawImage(img, 0, 0, 50, 50, locx, locy, 80, 92);
        //ctx1.fillRect(locx, locy, 80, 92);



    }
}

function drawRaspberry(vis) {
    var img = new Image;
    img.src = "./raspberrypi.jpg";
    if (vis == true) {
        img.onload = function () {
            ctx.drawImage(img, 200, 400, 100, 70);
            raspberryRect = new Rect(200, 400, 50, 50);
            //ctx.fillRect(200, 400, 50, 50);
        }
    } else {
        ctx.clearRect(200, 400, 100, 100);
    }
}

var rects = [];
var bar_width = 28;
function drawMap(level) {
    ctx.clearRect(0, 0, 500, 500);
    ctx1.clearRect(0, 0, 500, 500);

    rects.push(new Rect(0, 200, 300, bar_width));
    rects.push(new Rect(350, 200, bar_width, 100));

    rects.push(new Rect(750, 300, 300, bar_width));
    rects.push(new Rect(350, 430, bar_width, 300));

    rects.push(new Rect(250, 200, 300, bar_width));
    rects.push(new Rect(550, 200, bar_width, 300));


    ctx.fillStyle = "#629632";
    for (var i = 0; i < rects.length; i++) {
        ctx.fillRect(rects[i].x, rects[i].y, rects[i].w, rects[i].h);
    }

}

function onRight() {
    drawPlayer(20, 0, onLeft);
}

function onDown() {
    drawPlayer(0, 20, onUp);
}

function onUp(clear) {
    drawPlayer(0, -20, onDown);
}

function onLeft(clear) {
    drawPlayer(-20, 0, onRight);
}

function admin(){
    document.onkeyup = function (e) {
        //console.log(e.keyCode);
        switch (e.keyCode) {
            case 32: onSpace();
                break;
            case 37: onLeft();//drawskier(ctx, spriterects[0].rect, new Point(10,10));
                break;
            case 38: onUp();
                break;
            case 39: onRight();//drawskier(ctx, spriterects[1].rect, new Point(10,10));
                break;
            case 40: onDown();
                break;
            case 70: onFButton();
                break;
            case 80: onPButton();
                break;
        }
    }
};