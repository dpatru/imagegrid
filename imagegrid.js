// alert("hello");
var canvas = document.getElementById('c');
var ctx = canvas.getContext("2d");


function loadImage() {
    // see https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image#What_is_a_.22tainted.22_canvas.3F
    // alert("loadImage");
    var img = new Image;
    img.onload = function() {
	// alert("loaded"+img.src);
	loadImageOnCanvas(img);
	drawGrid();
    };
    img.onerror = function() {
	alert("couldn't load image at url "+ url);
    };
    img.crossOrigin = "Anonymous";
    var url = document.getElementById('url').value;
    img.src = url;
    // make sure the load event fires for cached images too
    if ( img.complete || img.complete === undefined ) {
    	img.src = "";
    	img.src = url;    // alert("loading cached img");
    	return false;
    };
};

function loadImageOnCanvas(img) {
    var canvas = document.getElementById('c');
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage( img, 0, 0 );
};

// from http://stackoverflow.com/a/1421988/268040q
function isNumber(obj) { return !isNaN(parseFloat(obj)) }

function drawGrid() {
    // alert("drawing grid");
    var spacing = parseFloat(document.getElementById('spacing').value);
    if (!isNumber(spacing)) {
	alert(spacing +" is not a number!");
	return;
    }
    var canvas = document.getElementById('c');
    var ctx = canvas.getContext("2d");
    for (var x = spacing-.5; x < canvas.width; x+=spacing) {
	ctx.moveTo(x, 0);
	ctx.lineTo(x, canvas.height);
	// console.log("x = "+x);
    }
    for (var y = spacing-.5; y < canvas.height; y+=spacing) {
	ctx.moveTo(0, y);
	ctx.lineTo(canvas.width, y);
	// console.log("y = "+y);
    }
    ctx.lineWidth = document.getElementById("width").value; // "1";
    ctx.strokeStyle = document.getElementById("style").value;
    ctx.stroke();
}
