// define global variable
let obj, value;
let canvas = document.getElementById("canvas"),
    spirit, startX, startY;
let demo = document.querySelector(".demo"),
    endcut = document.querySelector(".endCut"),
    tips = document.querySelector(".tips__mask"),
    arrow = document.querySelector(".arrow"),
    bg = document.querySelectorAll(".star__bg .item");
let point = document.querySelectorAll(".star__item .item");
let magicarr = [];
let t1 = document.getElementById("point1"),
    t2 = document.getElementById("point2"),
    t3 = document.getElementById("point3"),
    t4 = document.getElementById("point4"),
    t5 = document.getElementById("point5");

let name, stuas;
let stuasList = [0, 0, 0, 0, 0];

function objStyle(obj, value) { obj.style.display = value; };

// touch start listener
function touchmove(event) {
    event.preventDefault();
    if (spirit || !event.touches.length) return;
    let touch = event.touches[0];
    startX = touch.pageX;
    startY = touch.pageY;
    let pt1 = getPosition(t1),
        pt2 = getPosition(t2),
        pt3 = getPosition(t3),
        pt4 = getPosition(t4),
        pt5 = getPosition(t5);

    if (startX > (pt5.x - 20) && startX < (pt5.x + 20) && startY < (pt5.y + 20) && startY > (pt5.y - 20)) {
        if (stuasList[0] != 1) {
            stuasList[0] = 1;
            return (name = "c1", stuas = true, checkOptin(name, stuas));
        }
    }
    if (startX > (pt2.x - 20) && startX < (pt2.x + 20) && startY < (pt2.y + 20) && startY > (pt2.y - 20)) {
        if (stuasList[1] != 1) {
            stuasList[1] = 1;
            return (name = "c2", stuas = true, checkOptin(name, stuas));
        }
    }
    if (startX > (pt4.x - 20) && startX < (pt4.x + 20) && startY < (pt4.y + 20) && startY > (pt4.y - 20)) {
        if (stuasList[2] != 1) {
            stuasList[2] = 1;
            return (name = "c3", stuas = true, checkOptin(name, stuas));
        }
    }
    if (startX > (pt3.x - 20) && startX < (pt3.x + 20) && startY < (pt3.y + 20) && startY > (pt3.y - 20)) {
        if (stuasList[3] != 1) {
            stuasList[3] = 1;
            stuasList[4] = 0;
            return (name = "c4", stuas = true, checkOptin(name, stuas));
        }
    }
    if (startX > (pt1.x - 20)  && startX < (pt1.x + 20) && startY > (pt1.y - 20) && startY < (pt1.y + 20)) {
        if (stuasList[4] != 1) {
            stuasList[4] = 1;
            return (name = "end", stuas = true, checkOptin(name, stuas));
        }
    }
}
function getPosition(element) {
    let x = 0;
    let y = 0;
    while (element) {
        x += element.offsetLeft - element.scrollLeft + element.clientLeft;
        y += element.offsetTop - element.scrollLeft + element.clientTop;
        element = element.offsetParent;
    }
    return { x: x, y: y };
}
function checkOptin(name, stuas) {
    if (name == "c1" && stuas == true) {
        point[4].classList.add("touch");
        magicarr.push(2);
    }
    if (name == "c2" && stuas == true) {
        point[1].classList.add("touch");
        magicarr.push(3);
    }
    if (name == "c3" && stuas == true) {
        point[3].classList.add("touch");
        magicarr.push(4);
    }
    if (name == "c4" && stuas == true) {
        point[2].classList.add("touch");
        magicarr.push(5);
    }
    if (name == "end" && stuas == true) {
        magicarr.push(0);
    }
};
function touchstart(event) {
    event.preventDefault();
    if (spirit || !event.touches.length) return;
    let touch = event.touches[0];
    objStyle(arrow, "none");
    point[0].classList.add("touch");
    magicarr.push(1);
    canvas.addEventListener("touchmove", touchmove, false);
};

function touchend(event) {
    let checkarr = [1, 0, 2, 3, 4, 5, 0];
    let finalarr = _.isEqual(checkarr, magicarr);
    console.log(magicarr);
    if (finalarr === true) {
        console.log("畫完魔法陣囉...我要接著跳轉囉！！")
        objStyle(bg[0], "none");
        objStyle(bg[1], "block");
        setTimeout(function () {
            objStyle(demo, "none");
            objStyle(endcut, "block");
        }, 3000)
    } else {
        objStyle(tips, "block");
    }
}
// add touch start listener

canvas.addEventListener("touchstart", touchstart, false);
canvas.addEventListener("touchend", touchend, false);

function replay() {
    objStyle(tips, "none");
    objStyle(bg[1], "none");
    objStyle(bg[0], "block");
    objStyle(demo, "block");
    objStyle(endcut, "none");
    objStyle(arrow, "block");
    magicarr = [];
    stuasList = [];
    stuas = null;
    var i;
    for (i = 0; i < point.length; i++) {
        point[i].classList.remove("touch");
    }
};
