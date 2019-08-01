
function hour() {
	var min = 0,
		max = 24,
		select = document.getElementById('select-hour');

	for (var i = min; i <= max; i++) {
		var opt = document.createElement('option');
		opt.value = i;
		opt.innerHTML = i;
		select.appendChild(opt);
	}
}
function minute() {
	var min = 0,
		max = 59,
		select = document.getElementById('select-minute');

	for (var i = min; i <= max; i++) {
		var opt = document.createElement('option');
		opt.value = i;
		opt.innerHTML = i;
		select.appendChild(opt);
	}
}
function second() {
	var min = 0,
		max = 59,
		select = document.getElementById('select-second');

	for (var i = min; i <= max; i++) {
		var opt = document.createElement('option');
		opt.value = i;
		opt.innerHTML = i;
		select.appendChild(opt);
	}
}

function clock() {
	var min = 1,
		max = 12,
		hour = document.getElementById('hours-layout');

	for (var i = min; i <= max; i++) {
		var ss = "<span>" + i + "</span>";
		var hh = document.createElement('div');

		hh.innerHTML = ss;
		hour.appendChild(hh);
	}
}

hour();
minute();
second();
clock();
