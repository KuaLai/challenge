function initClocks(h,m,s) {
    var seconds = s;
    var minutes = m;
    var hours = h;

    var hands = [
        {
            hand: 'hours',
            angle: (hours * (360 / 12)) + (minutes * ((360 / 12) / 60)) // 目前時間的時針角度
            // 時針一圈12小時，一圈360度，所以360度/12時=30度/時，也就是每小時旋轉30度
            // 對時針來說每分鐘旋轉角度為30度/60分=0.5度/分，也就是每分鐘旋轉0.5度
        },
        {
            hand: 'minutes',
            angle: (minutes * (360 / 60)) // 目前時間的分針角度
            // 分針一圈60分，一圈360度，所以360度/60分=6度/分
        },
        {
            hand: 'seconds',
            angle: ('-' + seconds * (360 / 60)) // 目前時間的秒針角度
            // 秒針一圈60秒，一圈360度，所以360度/60秒=6度/秒
        }
    ];

    for (var j = 0; j < hands.length; j++) {
        var elements = document.querySelectorAll('.' + hands[j].hand); // 取得所有的指針(時針，分針，秒針)
        // 將指針依照目前時間來設定角度
        elements[0].style.webkitTransform = 'rotateZ(' + hands[j].angle + 'deg)'; // for Safari 
        elements[0].style.transform = 'rotateZ(' + hands[j].angle + 'deg)'

        // 將秒針目前的角度註記在分針上
        if (hands[j].hand === 'minutes') {
            elements[0].parentNode.setAttribute('data-second-angle', hands[j + 1].angle); // 秒針目前的角度
        }
    }
};

