browser.browserAction.onClicked.addListener(handleClick);

function handleClick(){
    MeasureConnectionSpeed();
}

var imageAddr = "http://www.kenrockwell.com/contax/images/g2/examples/31120037-5mb.jpg"; 
var downloadSize = 4995374; //bytes
var startTime, endTime;

function ShowProgressMessage(msg){
  if (typeof msg == "string"){
  	console.log(msg);
  } else {
    for ( var i = 0 ; i < msg.length ; ++i ){
      console.log(msg[i]);
    }
  }
}

if (window.addEventListener) {
    window.addEventListener('load', MeasureConnectionSpeed, false);
} else if (window.attachEvent) {
    window.attachEvent('onload', MeasureConnectionSpeed);
}

function MeasureConnectionSpeed() {
    
    var download = new Image();
    download.onload = function () {
        endTime = (new Date()).getTime();
        showResults();
    }
    
    download.onerror = function (err, msg) {
        ShowProgressMessage("Error During Speed Test");
    }
    
    startTime = (new Date()).getTime();
    var cacheBuster = "?nnn=" + startTime;
    download.src = imageAddr + cacheBuster;
    
}

function showResults() {
    var duration = (endTime - startTime) / 1000;
    var bitsLoaded = downloadSize * 8;
    var speedBps = (bitsLoaded / duration).toFixed(2);
    var speedKbps = (speedBps / 1024).toFixed(2);
    var speedMbps = (speedKbps / 1024).toFixed(2);
    ShowProgressMessage([
      "Your connection speed is:", 
      speedBps + " bps", 
      speedKbps + " kbps", 
      speedMbps + " Mbps"
    ]);
}
