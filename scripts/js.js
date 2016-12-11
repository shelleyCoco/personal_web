var Ad = new Audio();
var playNum = false;
var songNun = 1;
Ad.src = 'music/'+songNun + '.mp3';
//Ad.loop = 'loop'
var maxR = 0;
var rand = false;
var volFlag = true;
var arr = [];
var json = [{
		name: 'hello',
		singer: 'Adale'
	}, {
		name: 'If I were a boy',
		singer: 'beyonce'
	}, {
		name: 'try ',
		singer: 'Colbie Caillat'
	}]
	//初始化歌曲信息
songName.innerHTML = json[songNun - 1].name;
singer.innerHTML = json[songNun - 1].singer;

function Time(current, dura) {
	var n = dura - current;
	var h = parseInt(n / 3600);
	n %= 3600;
	var m = parseInt(n / 60);
	n %= 60;
	var s = parseInt(n);
	return '-' + h + ':' + tob(m) + ':' + tob(n);
}

function rnd(n, m) {
	return parseInt(Math.random() * (m - n) + n);
}

function tob(n) {
	return n < 10 ? "0" + n : '' + n
}

//			setInterval(function() {
//					var songTime = Ad.duration.toFixed(0);
//					time.innerHTML = Time(Ad.currentTime.toFixed(0), songTime);
//				}, 100)
//			
//时间线点击事件

Ad.addEventListener('ended', function() {
	songNun++;
	if(songNun > 3) {
		songNun = 1;
	}
	songName.innerHTML = json[songNun - 1].name;
	singer.innerHTML = json[songNun - 1].singer;
	Ad.src = songNun + '.mp3';
	player_warp.style.cssText += 'background:url(img/' + songNun + '.jpg) no-repeat center;background-size: cover;transition:.5s;'
	timeLine.style.width = 0
	Ad.currentTime = 0;
	Ad.play()
}, false)

timeLineClick.addEventListener('click', function(e) {
	e = e || event;
	var timeLineClickValue = e.clientX - (timeLineClick.offsetLeft + controls.offsetLeft + player_warp.offsetLeft + player_bg.offsetLeft);
	//	console.log(timeLineClick.parentNode.offsetLeft)
	//				console.log(timeNode.offsetWidth/2)
	var maxR = timeLineClick.offsetWidth;
	var moveNum = timeLineClickValue / maxR;
	timeLineClickValue = timeLineClickValue < 0 ? 0 : timeLineClickValue;
	timeLineClickValue = timeLineClickValue > maxR ? maxR : timeLineClickValue;
	Ad.currentTime = Ad.duration * moveNum;
	console.log(Ad.currentTime)
		//					console.log(timeLineClickValue)
		//					console.log(timeLineClickValue)
	timeLine.style.width = moveNum * 100 + '%'
}, false)

play.addEventListener('click', function() {
	playNum = !playNum
	if(playNum) {
		Ad.play();
		playImg.src = 'img/pause.png'
	} else {
		Ad.pause();
		playImg.src = 'img/play.png'
	}
}, false)

prev.addEventListener('click', function() {
	if(rand) {
		var n = rnd(1, 4)
		var length = arr.length;
		while(arr.length < length+1){
			 if(n == arr[arr.length - 1]) {
				n = rnd(1, 4)
			} else if(n != arr[arr.length - 1]) {
				arr.push(n)
			}
		}
		songNun = arr[arr.length - 1]
		songName.innerHTML = json[songNun-1].name;
		singer.innerHTML = json[songNun-1].singer;
		Ad.src = (songNun) + '.mp3'
		player_warp.style.cssText += 'background:url(img/' + (songNun) + '.jpg) no-repeat center;background-size: cover;transition:.5s;'
	} else {
		songNun--;
		if(songNun < 1) {
			songNun = 3;
		}
		songName.innerHTML = json[songNun - 1].name;
		singer.innerHTML = json[songNun - 1].singer;
	}
	Ad.src = songNun + '.mp3';
	player_warp.style.cssText += 'background:url(img/' + songNun + '.jpg) no-repeat center;background-size: cover;transition:.5s;'
	if(playNum) {
		Ad.play();
	}
	timeLine.style.width = 0
}, false)
next.addEventListener('click', function() {
	if(rand) {
		var n = rnd(1, 4)
		var length = arr.length;
		while(arr.length < length+1){
			 if(n == arr[arr.length - 1]) {
				n = rnd(1, 4)
			} else if(n != arr[arr.length - 1]) {
				arr.push(n)
			}
		}
		songNun = arr[arr.length - 1]
		songName.innerHTML = json[songNun-1].name;
		singer.innerHTML = json[songNun-1].singer;
		Ad.src = (songNun) + '.mp3'
		player_warp.style.cssText += 'background:url(img/' + (songNun) + '.jpg) no-repeat center;background-size: cover;transition:.5s;'
	} else {
		songNun++;
		if(songNun > 3) {
			songNun = 1;
		}
		songName.innerHTML = json[songNun - 1].name;
		singer.innerHTML = json[songNun - 1].singer;
		Ad.src = songNun + '.mp3';
		player_warp.style.cssText += 'background:url(img/' + songNun + '.jpg) no-repeat center;background-size: cover;transition:.5s;'
	}
	if(playNum) {
		Ad.play();
	}
	timeLine.style.width = 0
}, false)
Ad.addEventListener('timeupdate', function() {
	var needW = Ad.currentTime / Ad.duration
	timeLine.style.width = needW * 100 + '%';
}, false)

circulation.onclick = function() {
	rand = !rand;
	if(rand) {
		Ad.loop = 'loop';
	} else {
		Ad.loop = '';
		var n = rnd(1, 4)
		songNun = n;
	}
}

var timer = null
volume.onmouseover = function() {
	clearTimeout(timer)
	voluemeLineBox.style.visibility = 'visible'
}
volume.onmouseout = function() {
	timer = setTimeout(function() {
		voluemeLineBox.style.visibility = 'hidden'
	}, 1500)
}
volumeNode.onmousedown = function(e) {
	var ev = e || event;
	var l = ev.clientY - this.offsetTop;
	clearInterval(timer)
	voluemeLineBox.style.visibility = 'visible'
	document.onmousemove = function(e) {
		clearTimeout(timer)
		var ev = e || event;
		var needL = ev.clientY - l;
		var maxL = volumeNode.parentNode.offsetHeight - volumeNode.offsetHeight;
		needL = needL < 0 ? 0 : needL;
		needL = needL > maxL ? maxL : needL;
		volumeNode.style.top = needL + 'px';
		Ad.volume = 1 - volumeNode.offsetTop / maxL;
		var needP = volumeNode.offsetTop / (volumeNode.parentNode.offsetHeight - volumeNode.offsetHeight)
		volLine.style.height = (1 - needP) * 100 + '%'
	};
	document.onmouseup = function() {
		timer = setTimeout(function() {
			voluemeLineBox.style.visibility = 'hidden'
		}, 1500)
		document.onmousemove = document.onmouseup = null;
	};
	return false;
}

function getStyle(obj, sName) {
	return obj.currentStyle ? obj.currentStyle[sName] : getComputedStyle(obj, false)[sName]
}
var b = []
var c = []
volume.onclick = function(ev) {
		volFlag = !volFlag;
		c.push(Ad.volume)
		if(volFlag) {
			Ad.volume = 1
			volumeNode.style.top = 0;
			var needP = volumeNode.offsetTop / (volumeNode.parentNode.offsetHeight - volumeNode.offsetHeight)
			volLine.style.height = (1 - needP) * 100 + '%'
		} else {
			Ad.volume = 0
			volumeNode.style.top = volumeNode.parentNode.offsetHeight - volumeNode.offsetHeight + 'px';
			var needP = volumeNode.offsetTop / (volumeNode.parentNode.offsetHeight - volumeNode.offsetHeight)
			volLine.style.height = (1 - needP) * 100 + '%'
		}

	}
	//
function getStyle(obj, sName) {
	return obj.currentStyle ? obj.currentStyle[sName] : getComputedStyle(obj, false)[sName]
}