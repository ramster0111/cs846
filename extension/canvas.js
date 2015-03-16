
// function InsertDiagram()
// {
// 	console.log("insert diagram 2");
// }


// $(function()
// {
//     console.log("insert diagram 1");
//     $('#insertdiagram').click(function(){InsertDiagram();});
// });

"use strict";
	var canvas,
		ctx,
		mouse_x_coor,
		mouse_y_coor,
		started = false,
		drawingtool,
		drawingtools = {},
		tool_selected = 'rect',
		tool_default = 'rect',
		canvaso,
		rectangles = [],
		lines = [],
		arrowlines = [],
		ctxo;

function InsertDiagram(e) 
{
	// prepare data
	var transferData = {};
	transferData.rectangles = rectangles;
	transferData.lines = lines;
	transferData.arrowlines = arrowlines;

	// send data
    chrome.runtime.sendMessage({directive: "insertdiagram", data: transferData}, function(response)
    //chrome.runtime.sendMessage({directive: "insertdiagram", data: "stuff"}, function(response)  
    {
        this.close();
    });
}

function CancelDiagram(e) 
{
    chrome.runtime.sendMessage({directive: "canceldiagram"}, function(response) 
    {
        this.close();
    });
}

document.addEventListener('DOMContentLoaded', function () 
{
    document.getElementById('insertdiagram').addEventListener('click', InsertDiagram);
    document.getElementById('canceldiagram').addEventListener('click', CancelDiagram);
})



var drawingCanvas = (function () {

	drawingtools.line = function () {
			var tool = this;
			this.started = false;

			this.mousedown = function (ev) {
				tool.started = true;
				tool.x0 = ev._x;
				tool.y0 = ev._y;
				tool.x0 = Math.round(tool.x0 / 10) * 10;
				tool.y0 = Math.round(tool.y0 / 10) * 10;

			};

			this.mousemove = function (ev) {
				if (!tool.started || ev._y < 30 || ev._y > 300) {
					return;
				}
		
				ctx.clearRect(0, 31, canvas.width, canvas.height);
				ev._x = Math.round(ev._x / 10) * 10;
				ev._y = Math.round(ev._y / 10) * 10;

				
// We have to draw two lines
				if (Math.abs(ev._x - tool.x0) > Math.abs(ev._y - tool.y0)) {
					ctx.beginPath();
					ctx.moveTo(tool.x0, tool.y0);
					ctx.lineTo(ev._x, tool.y0);
					ctx.stroke();
					ctx.closePath();
					
					ctx.beginPath();
					ctx.moveTo(ev._x, tool.y0);
					ctx.lineTo(ev._x, ev._y);
					ctx.stroke();
					ctx.closePath();
				}

				if (Math.abs(ev._x - tool.x0) < Math.abs(ev._y - tool.y0)) {
					ctx.beginPath();
					ctx.moveTo(tool.x0, tool.y0);
					ctx.lineTo(tool.x0, ev._y);
					ctx.stroke();
					ctx.closePath();
					
					ctx.beginPath();
					ctx.moveTo(tool.x0, ev._y);
					ctx.lineTo(ev._x,ev._y);
					ctx.stroke();
					ctx.closePath();
				}


				/*
				ctx.moveTo(tool.x0, tool.y0);
				ctx.lineTo(ev._x, ev._y);
				ctx.stroke();
				ctx.closePath();
				*/
			};

			this.mouseup = function (ev) {
				if (tool.started) {
					tool.mousemove(ev);
					var storelineobject = {};
					storelineobject.x0 = tool.x0;
					storelineobject.y0 = tool.y0;
					if (Math.abs(ev._x - tool.x0) > Math.abs(ev._y - tool.y0)){
							storelineobject.x1 = ev._x
							storelineobject.y1 = tool.y0
	
					}
					else if (Math.abs(ev._x - tool.x0) < Math.abs(ev._y - tool.y0)){
							storelineobject.x1 = tool.x0
							storelineobject.y1 = ev._y
					}
					storelineobject.x2 = ev._x;
					storelineobject.y2 = ev._y;
					lines.push(storelineobject);
					tool.started = false;
					img_update();
				}
			};
	};

	drawingtools.arrowline = function () {
			var tool = this;
			this.started = false;
			var x,
				y;

			this.mousedown = function (ev) {
				tool.started = true;
				tool.x0 = ev._x;
				tool.y0 = ev._y;
				tool.x0 = Math.round(tool.x0 / 10) * 10;
				tool.y0 = Math.round(tool.y0 / 10) * 10;

			};

			this.mousemove = function (ev) {
				if (!tool.started || ev._y < 30 || ev._y > 300) {
					return;
				}
		
				ctx.clearRect(0, 31, canvas.width, canvas.height);
				ev._x = Math.round(ev._x / 10) * 10;
				ev._y = Math.round(ev._y / 10) * 10;

				if (Math.abs(ev._x - tool.x0) > Math.abs(ev._y - tool.y0)) {
					ctx.beginPath();
					ctx.moveTo(tool.x0, tool.y0);
					ctx.lineTo(ev._x, tool.y0);
					ctx.stroke();
					ctx.closePath();
					
					ctx.beginPath();
					ctx.moveTo(ev._x, tool.y0);
					ctx.lineTo(ev._x, ev._y);
					ctx.stroke();
					ctx.closePath();
					
					var endRadians = Math.atan((ev._y - tool.y0)/(ev._x - ev._x));
					endRadians += ((ev._x >= ev._x) ? 90 : -90 ) * Math.PI / 180;

					ctx.save();
					ctx.beginPath();
					ctx.translate(ev._x,ev._y);
					ctx.rotate(endRadians);
					ctx.moveTo(0,0);
					ctx.lineTo(5,10);
					ctx.lineTo(-5,10);
					ctx.closePath();
					ctx.restore();
					ctx.fill();		
				}

				if (Math.abs(ev._x - tool.x0) < Math.abs(ev._y - tool.y0)) {
					ctx.beginPath();
					ctx.moveTo(tool.x0, tool.y0);
					ctx.lineTo(tool.x0, ev._y);
					ctx.stroke();
					ctx.closePath();
					
					ctx.beginPath();
					ctx.moveTo(tool.x0, ev._y);
					ctx.lineTo(ev._x,ev._y);
					ctx.stroke();
					ctx.closePath();

					var endRadians = Math.atan((ev._y - ev._y)/(ev._x - tool.x0));
					endRadians += ((ev._x >= tool.x0) ? 90 : -90 ) * Math.PI / 180;

					ctx.save();
					ctx.beginPath();
					ctx.translate(ev._x,ev._y);
					ctx.rotate(endRadians);
					ctx.moveTo(0,0);
					ctx.lineTo(5,10);
					ctx.lineTo(-5,10);
					ctx.closePath();
					ctx.restore();
					ctx.fill();		
					
				}
				/*
				ctx.beginPath();
				ctx.moveTo(tool.x0, tool.y0);
				ctx.lineTo(ev._x, ev._y);
				ctx.stroke();
				ctx.closePath();
*/
/*				
				var endRadians = Math.atan((ev._y - tool.y0)/(ev._x - tool.x0));
				endRadians += ((ev._x >= tool.x0) ? 90 : -90 ) * Math.PI / 180;

				ctx.save();
				ctx.beginPath();
				ctx.translate(ev._x,ev._y);
				ctx.rotate(endRadians);
				ctx.moveTo(0,0);
				ctx.lineTo(5,20);
				ctx.lineTo(-5,20);
				ctx.closePath();
				ctx.restore();
				ctx.fill();		
*/
			};

			this.mouseup = function (ev) {
				if (tool.started) {
					tool.mousemove(ev);
					var storearrowlineobject = {};
					storearrowlineobject.x0 = tool.x0;
					storearrowlineobject.y0 = tool.y0;

					if (Math.abs(ev._x - tool.x0) >= Math.abs(ev._y - tool.y0)){
							storearrowlineobject.x1 = ev._x
							storearrowlineobject.y1 = tool.y0
	
					}
					else if (Math.abs(ev._x - tool.x0) < Math.abs(ev._y - tool.y0)){
							storearrowlineobject.x1 = tool.x0
							storearrowlineobject.y1 = ev._y
					}					
					storearrowlineobject.x2 = ev._x;
					storearrowlineobject.y2 = ev._y;
					storearrowlineobject.xdiff = 5;
					storearrowlineobject.ydiff = 10;
					arrowlines.push(storearrowlineobject);
					tool.started = false;
					img_update();
				}
			};
	};		
		
	drawingtools.rect = function () {
			var tool = this;
			this.started = false;
			var x,
				y,
				w,
				h;
			this.mousedown = function (ev) {
				tool.started = true;
				tool.x0 = ev._x;
				tool.y0 = ev._y;
			};

			this.mousemove = function (ev) {
				if (!tool.started || ev._y < 31 || ev._y > 300) {
					return;
				}

				x = Math.min(ev._x,	tool.x0);
				y = Math.min(ev._y,	tool.y0);
				w = Math.abs(ev._x - tool.x0);
				h = Math.abs(ev._y - tool.y0);
				
				x = Math.round(x / 10) * 10;
				y = Math.round(y / 10) * 10;
				w = Math.round(w / 10) * 10;
				h = Math.round(h / 10) * 10;


				ctx.clearRect(0, 31, canvas.width, canvas.height);

				if (!w || !h) {
					return;
				}
				ctx.strokeRect(x, y, w, h);
			};

			this.mouseup = function (ev) {
				if (tool.started) {
					tool.mousemove(ev);
					var storerectobject = {};
					storerectobject.x = x;
					storerectobject.y = y;
					storerectobject.w = w;
					storerectobject.h = h;
					rectangles.push(storerectobject);
					tool.started = false;
					img_update();
				}
			};
	};

	drawingtools.text = function () {
			var tool = this;
			this.started = false;
			var inputstring = "Raminder",
				textwidth = 20,
				textheight = 20;
				
			this.mousedown = function (ev) {
				if (!tool.started) {
					return;
				}				
				tool.x0 = ev._x;
				tool.y0 = ev._y;
			};

			this.mousemove = function (ev) {
				tool.started = true;
				ctx.clearRect(0, 31, canvas.width, canvas.height);
				ctx.font = 'italic 20px sans-serif';
				ctx.fillText(inputstring,ev._x,ev._y);
			};

			this.mouseup = function (ev) {
				if (tool.started) {
					tool.mousemove(ev);
					tool.started = false;
					img_update();
				}
			};
	};

	
	function mouseEvent(ev){
 
		if (ev.layerX || ev.layerX == 0) { // Firefox
			ev._x = ev.layerX;
			ev._y = ev.layerY;
		} 
		var func = drawingtool[ev.type];
			if (func) {
				func(ev);
		}
		
	}

	function mouseDownEvent(ev){

		if (ev.layerX || ev.layerX == 0) { // Firefox
			ev._x = ev.layerX;
			ev._y = ev.layerY;
		} 
		
		if (ev._y < 30 ){
				if (ev._x < 30){
					 tool_selected = 'rect';
				}
				else if(ev._x < 60){
					 tool_selected = 'line';
				}
				else if(ev._x < 90){
					 tool_selected = 'arrowline';
				}
				else if(ev._x < 120){
					 tool_selected = 'text';
				}
				
				if (drawingtools[tool_selected]) {
						drawingtool = new drawingtools[tool_selected]();
						drawingtool.value = tool_selected;
				}

		}
		else{
			
			var func = drawingtool[ev.type];
				if (func) {
					func(ev);
			}
		}
		
	}
	
	function img_update () {
	
	/*
		for (var x = 0; x < 601; x += 10) {
			//ctx.save();
				ctx.setLineDash([2]);
				ctx.strokeRect(x, 30, 20, 20);
			//ctx.restore();
		}
	*/
		ctxo.drawImage(canvas, 0, 0);
		ctx.clearRect(0, 31, canvas.width, canvas.height);
		
/* Lines not working ???		
		for (var x = 0.5; x < 601; x += 10) {
			ctx.beginPath();
			ctx.moveTo(x, 0);
			ctx.lineTo(x, 381);
			ctx.closePath();
		}

		for (var y = 30.5; y < 301; y += 10) {
			ctx.moveTo(30, y);
			ctx.lineTo(500, y);
		}
*/		
		
	}

	function drawCanvas()
	{
			canvaso = document.getElementById('Canvas');
		
			if (canvaso.getContext) {
				ctxo = canvaso.getContext('2d');

				for (var x = 0.5; x < 601; x += 10) {
					ctxo.save();
					ctxo.setLineDash([1,2]);
					ctxo.beginPath();
					ctxo.moveTo(x,31);
					ctxo.lineTo(x,300);
					ctxo.stroke();
				}

				for (var y = 31.5; y < 301; y += 10) {
					ctxo.save();
					ctxo.setLineDash([1,2]);
					ctxo.beginPath();
					ctxo.moveTo(0,y);
					ctxo.lineTo(600,y);
					ctxo.stroke();
				}

				//ctxo.strokeRect(x, 30, 20, 20);
			//ctx.restore();
				
				
				var rectImage = new Image();   // a
				var lineImage = new Image();   // b 
				var lineArrowImage = new Image();   // c 
				var text = new Image();   // d 
				var eraser = new Image();   // e

				var container = canvaso.parentNode;
				
				canvas = document.createElement('canvas');
				if (!canvas) {
					alert('Error: I cannot create a new <canvas> element!');
					return;
				}

				canvas.id = 'imageTemp';
				canvas.width = canvaso.width;
				canvas.height = canvaso.height;
				container.appendChild(canvas);

				ctx = canvas.getContext('2d');		
				
				// Load images
				rectImage.src = "images/rect.png";
				rectImage.onload = function() {
				ctx.drawImage(rectImage, 0, 0, 30, 30);
				};
				
		
				lineImage.src = "images/line.png";
				lineImage.onload = function() {
					ctx.drawImage(lineImage, 30, 0, 30, 30);
				};
	
				lineArrowImage.src = "images/linearrow.png";
				lineArrowImage.onload = function() {
					ctx.drawImage(lineArrowImage, 60, 0, 30, 30);
				};

				text.src = "images/text.png";
				text.onload = function() {
					ctx.drawImage(text, 90, 0, 30, 30);
				};

				eraser.src = "images/erase.png";
				eraser.onload = function() {
					ctx.drawImage(eraser, 120, 0, 30, 30);
				}
	
				//ctx.beginPath();
				//ctx.moveTo(0, 31);
				//ctx.lineTo(600, 31);
				//ctx.stroke();
			}
	

		    if (drawingtools[tool_selected]) {
				drawingtool = new drawingtools[tool_selected]();
				drawingtool.value = tool_selected;
			}
			
			canvas.addEventListener("mousedown", mouseDownEvent, true);
			canvas.addEventListener("mousemove", mouseEvent, false);
			canvas.addEventListener("mouseup", mouseEvent);
			canvas.addEventListener("mouseout", mouseEvent, false);

	}



	
	return {
		drawCanvas: drawCanvas
	};

}());

window.addEventListener('load', drawingCanvas.drawCanvas);
