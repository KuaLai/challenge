// define global variable

const canvas = document.getElementById("canvas");
const demo = document.querySelector(".demo"),
    endcut = document.querySelector(".endCut"),
    tips = document.querySelector(".tips__mask"),
    arrow = document.querySelector(".arrow"),
    bg = document.querySelectorAll(".star__bg .item");
const point = document.querySelectorAll(".star__item .item");

let obj, value, end, name;
let magicarray = [];
let endArray = [];
let checkarray = [];
let statusList = [0, 0, 0, 0, 0];

const touchRange = 40;

function elementDisplayStatus(element,value){
    if(element.length > 1){
        for (let index = 0; index < element.length; index++) {
            element[index].style.display = value;   
        }
    } else {
        element.style.display = value; 
    }
    
}

function getPosition(element) {
    let x = 0;
    let y = 0;

    x += element.offsetLeft - element.scrollLeft + element.clientLeft;
    y += element.offsetTop - element.scrollLeft + element.clientTop;
    element = element.offsetParent;
    return { x: x, y: y };
};

function setPoint(element) {
    let pointX = 0;
    let pointY = 0;

    pointX = getPosition(element).x;
    pointY = getPosition(element).y;
    return { x: pointX, y: pointY };
};

function isTouched(touchPosition, elementPosition) {
    return touchPosition.pageX > (elementPosition.x - touchRange) && touchPosition.pageX < (elementPosition.x + touchRange) && touchPosition.pageY > (elementPosition.y - touchRange) && touchPosition.pageY < (elementPosition.y + touchRange);
};

function setFirstPointToOriginalStatus(num) {
    statusList[0] = 0;
    point[0].classList.remove("touch");
    statusList[num] = num + 1;
    name = "end";
    num = num + 1;
    end = true;
    return (checkOptin(name));
};

function callbackSwitch(touchPosition, elementPosition, index) {
    let num = index;
    const allLength = statusList.length;

    if (isTouched(touchPosition, elementPosition)) {

        if (statusList[num] != (num + 1)) {
            statusList[num] = num + 1;
            name = 'open' + num;
            num = num + 1;
            return (checkOptin(name));
        }
        if (statusList[num] == allLength) {
            setFirstPointToOriginalStatus(num);
        }
    }
};

function checkOptin(name) {
    for (let i = 0; i < statusList.length; i++) {
        if (name == ("open" + i)) {
            point[i].classList.add("touch");
            magicarray.push(i);
            checkarray[0] = (magicarray[0]);
            if (end == true) {
                check("end");
            } else {
                check(i);
            }
        }
    }
};

// touch start listener
function touchstart(event) {
    event.preventDefault();
    if (!event.touches.length) return;
    elementDisplayStatus(arrow,"none");

};

function touchmove(event) {
    if (!event.touches.length) return;
    let touch = event.touches[0];
    for (let i = 0; i < statusList.length; i++) {
        callbackSwitch(touch, setPoint(point[i]), i);
        if (i > statusList.length) {
            return;
        }
    };

}

function touchend() {
    // checkTouch();
}

// replay
function replay() {
    elementDisplayStatus([arrow,bg[0],demo],"block");
    elementDisplayStatus([tips,bg[1],endcut],"none");
    magicarray = []; 
    checkarray = [];
    end = false;
    for (let i = 0; i < point.length; i++) {
        point[i].classList.remove("touch");
        statusList[i] = 0;
    }
};

// check array

function addOrdertoList(i) {
    if (checkarray.length < statusList.length) {
        checkarray.push(i + 1);
    }
    else {
        checkarray.push(checkarray[0]);
    }
}

function check(item) {
    console.log(checkarray, magicarray);
    let line = _.isEqual(checkarray, magicarray);
    if (line === false) {
        elementDisplayStatus(tips,"block");
    }

    if (magicarray[0] == 0) {
        for (let i = 0; i < statusList.length; i++) {

            if (item == i) {
                addOrdertoList(i);
            }

            if (item == "end") {
                endArray = checkarray;
                checkTouch();
            }
        }
    }

    else {
        elementDisplayStatus(tips,"block");
    }
};

function checkTouch() {
    let finalarray = _.isEqual(endArray, magicarray);

    if (finalarray === true) {
        elementDisplayStatus(bg[0],"none");
        elementDisplayStatus(bg[1],"block");

        setTimeout(function () {
            elementDisplayStatus(demo,"none");
            elementDisplayStatus(endcut,"block");
        }, 1000)
    }

}

// add touch start listener

canvas.addEventListener("touchstart", touchstart, false);
canvas.addEventListener("touchmove", touchmove, false);
canvas.addEventListener("touchend", touchend, false);