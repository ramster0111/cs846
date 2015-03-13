var drawingCanvas = (function () {

	"use strict";
	var canvas,
		ctx,
		mouse_x_coor,
		mouse_y_coor,
		started = false,
		drawingtool,
		drawingtools = {},
		tool_selected = 'rect',
		tool_default = 'text',
		canvaso,
		ctxo;
		
	drawingtools.line = function () {
			var tool = this;
			this.started = false;

			this.mousedown = function (ev) {
				tool.started = true;
				tool.x0 = ev._x;
				tool.y0 = ev._y;
			};

			this.mousemove = function (ev) {
				if (!tool.started) {
					return;
				}
		
				ctx.clearRect(0, 31, canvas.width, canvas.height);
				ctx.beginPath();
				ctx.moveTo(tool.x0, tool.y0);
				ctx.lineTo(ev._x, ev._y);
				ctx.stroke();
				ctx.closePath();
			};

			this.mouseup = function (ev) {
				if (tool.started) {
					tool.mousemove(ev);
					tool.started = false;
					img_update();
				}
			};
	};

	drawingtools.arrowline = function () {
			var tool = this;
			this.started = false;

			this.mousedown = function (ev) {
				tool.started = true;
				tool.x0 = ev._x;
				tool.y0 = ev._y;
			};

			this.mousemove = function (ev) {
				if (!tool.started) {
					return;
				}
		
				ctx.clearRect(0, 31, canvas.width, canvas.height);
				ctx.beginPath();
				ctx.moveTo(tool.x0, tool.y0);
				ctx.lineTo(ev._x, ev._y);
				ctx.stroke();
				ctx.closePath();
				
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

			};

			this.mouseup = function (ev) {
				if (tool.started) {
					tool.mousemove(ev);
					tool.started = false;
					img_update();
				}
			};
	};		
		
	drawingtools.rect = function () {
			var tool = this;
			this.started = false;

			this.mousedown = function (ev) {
				tool.started = true;
				tool.x0 = ev._x;
				tool.y0 = ev._y;
			};

			this.mousemove = function (ev) {
				if (!tool.started) {
					return;
				}

				var x = Math.min(ev._x,	tool.x0),
				y = Math.min(ev._y,	tool.y0),
				w = Math.abs(ev._x - tool.x0),
				h = Math.abs(ev._y - tool.y0);

				ctx.clearRect(0, 31, canvas.width, canvas.height);

				if (!w || !h) {
					return;
				}

				ctx.strokeRect(x, y, w, h);
			};

			this.mouseup = function (ev) {
				if (tool.started) {
					tool.mousemove(ev);
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

	function img_update () {
		ctxo.drawImage(canvas, 0, 0);
		ctx.clearRect(0, 31, canvas.width, canvas.height);
	}

	function drawCanvas()
	{
			canvaso = document.getElementById('Canvas');
		
			if (canvaso.getContext) {
				ctxo = canvaso.getContext('2d');

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
	
				ctx.beginPath();
				ctx.moveTo(0, 31);
				ctx.lineTo(600, 31);
				ctx.stroke();
			}
	

		    if (drawingtools[tool_default]) {
				drawingtool = new drawingtools[tool_default]();
				drawingtool.value = tool_default;
			}
			
			canvas.addEventListener("mousedown", mouseEvent, true);
			canvas.addEventListener("mousemove", mouseEvent, false);
			canvas.addEventListener("mouseup", mouseEvent);
			canvas.addEventListener("mouseout", mouseEvent, false);

	}



	
	return {
		drawCanvas: drawCanvas
	};

}());

window.addEventListener('load', drawingCanvas.drawCanvas);
