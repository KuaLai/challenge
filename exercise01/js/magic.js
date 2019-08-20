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
let end;
let name;
let statusList = [0, 0, 0, 0, 0];
let pointX = 0;
let pointY = 0;

function objStyle(obj, value) { obj.style.display = value; };

function getPosition(element) {
    let x = 0;
    let y = 0;
    while (element) {
        x += element.offsetLeft - element.scrollLeft + element.clientLeft;
        y += element.offsetTop - element.scrollLeft + element.clientTop;
        element = element.offsetParent;
    }
    return { x: x, y: y };
};

function setPoint(element,index){
    pointX = getPosition(element).x;
    pointY = getPosition(element).y;
    return { pointX: pointX, pointY: pointY , index: index };
};

function callbackSwitch(elementX,elementY,startX,startY,index){
    let num = index;
    let allLength = statusList.length;

    // isTouched()
    
    if (startX > (elementX - 40) && startX < (elementX + 40) && startY < (elementY + 40) && startY > (elementY - 40)) {
        if (statusList[num] != (num + 1)) {
            statusList[num] = num + 1;   
            name = 'open' + num;
            num = num + 1;
            return(checkOptin(name));
        } 
        if ( statusList[num] == allLength ){


            // setFirstPointToOriginalStatus
            statusList[0] = 0;  
            point[0].classList.remove("touch");
            statusList[num] = num + 1; 
            name = "end";
            num = num + 1;
            end = true;
            return(checkOptin(name));
        }
    } 
};

function checkOptin(name) {
    for (let i = 0; i < statusList.length; i++) {
        if (name == ("open" + i)) {
            point[i].classList.add("touch");
            magicarr.push(i);
            checkarr[0] = (magicarr[0]);

            if (end == true) {
                checkArray("end");

            } else {
                checkArray(i);
            }
        }
    }
};

// touch start listener
function touchstart(event) {
    event.preventDefault();
    if (!event.touches.length) return;
    
    objStyle(arrow, "none");

};

function touchmove(event) {
    event.preventDefault();
    if (!event.touches.length) return;
    let touch = event.touches[0];
    startX = touch.pageX;
    startY = touch.pageY;
    let initialPoint ;
    for (let i = 0; i < statusList.length; i++) {
        initialPoint = setPoint(point[i],i);
        callbackSwitch(initialPoint.pointX,initialPoint.pointY,startX,startY,i);
        if (i > statusList.length) {
            return;
        }
    };
    
}
function touchend() {
    // checkTouch();
}
// add touch start listener

canvas.addEventListener("touchstart", touchstart, false);
canvas.addEventListener("touchend", touchend, false);

canvas.addEventListener("touchmove", touchmove,false);

// replay
function replay() {
    objStyle(tips, "none");
    objStyle(bg[1], "none");
    objStyle(bg[0], "block");
    objStyle(demo, "block");
    objStyle(endcut, "none");
    objStyle(arrow, "block");
    magicarr = []; checkarr = [];
    end = false;
    for (let i = 0; i < point.length; i++) {
        point[i].classList.remove("touch");
        statusList[i] = 0;
    }
};

// check array
let endArray = [];
let checkarr = [];
function checkArray(item){
    console.log(checkarr, magicarr);
    let line = _.isEqual(checkarr, magicarr);
    if (line === false) {
        objStyle(tips, "block");
    }
   if (magicarr[0] == 0){
        for (let i = 0; i < statusList.length ; i++) {

            if ( item == i  ){
                if(checkarr.length < statusList.length )
                    checkarr.push( i + 1);

                else
                    checkarr.push( checkarr[0] );  
            }
            if ( item == "end"){               
                endArray = checkarr;
                checkTouch();
            }   

        }
    }

    else
        objStyle(tips, "block");
    
    
};

function checkTouch(){
    let finalarray = _.isEqual(endArray, magicarr);
    
    if (finalarray === true) {
        objStyle(bg[0], "none");
        objStyle(bg[1], "block");
        setTimeout(function () {
            objStyle(demo, "none");
            objStyle(endcut, "block");
        }, 3000)
    }

}
