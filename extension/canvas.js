
// function InsertDiagram()
// {
// 	console.log("insert diagram 2");
// }


// $(function()
// {
//     console.log("insert diagram 1");
//     $('#insertdiagram').click(function(){InsertDiagram();});
// });

// http://stackoverflow.com/questions/2659999/html5-canvas-hand-cursor-problems
document.addEventListener('mousedown', handleMouseDown, false);
function handleMouseDown(evt) {
  evt.preventDefault();
  evt.stopPropagation();
  evt.target.style.cursor = 'crosshair';
}

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
		strings = [],
		textentered,
		textsize,
		ctxo;

function InsertDiagram(e) 
{
	// prepare data
	var transferData = {};
	transferData.rectangles = rectangles;
	transferData.lines = lines;
	transferData.arrowlines = arrowlines;
	transferData.strings = strings;

	//alert(strings.length);

	//alert("insert diagram");
	// send data
    chrome.runtime.sendMessage({directive: "insertdiagram", data: transferData}, function(response)
    {
        //window.close();
    });
}

function CancelDiagram(e) 
{

    chrome.runtime.sendMessage({directive: "canceldiagram"}, function(response) 
    {
        //window.close();
    });
}

document.addEventListener('DOMContentLoaded', function () 
{
    document.getElementById('insertdiagram').addEventListener('click', InsertDiagram);
    document.getElementById('canceldiagram').addEventListener('click', CancelDiagram);
})



var drawingCanvas = (function () {

	drawingtools.erase = function () {
			var tool = this;
			this.started = false;

			this.isOnLine = function isOnLine(initial_x, initial_y, endx, endy, pointx, pointy) {
				var slope = (endy-initial_y)/(endx-initial_x);
				var y = slope * pointx + initial_y;

				if( endx - initial_x == 0){
					if ( pointy > initial_y && pointy <  endy && pointx == initial_x)
						return true;
					if ( pointy < initial_y && pointy >  endy && pointx == initial_x)
						return true;
				}
				
				if((y <= pointy+.2 && y >= pointy-.2) && (pointx >= initial_x && pointx <= endx)) {
					return true;
				}				
				return false;
			}

			this.mousedown = function (ev) {
				img_update();
				tool.x0 = ev._x;
				tool.y0 = ev._y;
				tool.x0 = Math.round(tool.x0 / 10) * 10;
				tool.y0 = Math.round(tool.y0 / 10) * 10;
				// first search rectangles
				for (var j in rectangles) {
					var l1 = tool.isOnLine(rectangles[j].x, rectangles[j].y, rectangles[j].x + rectangles[j].w, rectangles[j].y , tool.x0, tool.y0);
					var l2 = tool.isOnLine(rectangles[j].x, rectangles[j].y, rectangles[j].x, rectangles[j].y + rectangles[j].h, tool.x0, tool.y0);
					var l3 = tool.isOnLine(rectangles[j].x, rectangles[j].y + rectangles[j].h, rectangles[j].x + rectangles[j].w, rectangles[j].y + rectangles[j].h, tool.x0, tool.y0);
					var l4 = tool.isOnLine(rectangles[j].x + rectangles[j].w, rectangles[j].y, rectangles[j].x + rectangles[j].w, rectangles[j].y + rectangles[j].h, tool.x0, tool.y0);

					if( l1 || l2 || l3 || l4){
						var index = rectangles.indexOf(rectangles[j]);
						rectangles.splice(index, 1);
						this.started = false;
						ctx.clearRect(0, 31, canvas.width, canvas.height);
						return;
					}
				}
				
				for (var j in lines) {
					var l1;
					var l2;
					
					if (lines[j].x0 < lines[j].x2){
						l1 = tool.isOnLine(lines[j].x0, lines[j].y0, lines[j].x1, lines[j].y1, tool.x0, tool.y0);
						l2 = tool.isOnLine(lines[j].x1, lines[j].y1, lines[j].x2, lines[j].y2, tool.x0, tool.y0);
					}
					else{
						l1 = tool.isOnLine(lines[j].x2, lines[j].y2, lines[j].x1, lines[j].y1, tool.x0, tool.y0);
						l2 = tool.isOnLine(lines[j].x1, lines[j].y1, lines[j].x0, lines[j].y0, tool.x0, tool.y0);						
					}
					
					if( l1 || l2){
						var index = lines.indexOf(lines[j]);
						lines.splice(index, 1);
						ctx.clearRect(0, 31, canvas.width, canvas.height);
						return;
					}
					
				}

				for (var j in arrowlines) {
					var l1;
					var l2;
					
					if (arrowlines[j].x0 < arrowlines[j].x2){
						l1 = tool.isOnLine(arrowlines[j].x0, arrowlines[j].y0, arrowlines[j].x1, arrowlines[j].y1, tool.x0, tool.y0);
						l2 = tool.isOnLine(arrowlines[j].x1, arrowlines[j].y1, arrowlines[j].x2, arrowlines[j].y2, tool.x0, tool.y0);
					}
					else{
						l1 = tool.isOnLine(arrowlines[j].x2, arrowlines[j].y2, arrowlines[j].x1, arrowlines[j].y1, tool.x0, tool.y0);
						l2 = tool.isOnLine(arrowlines[j].x1, arrowlines[j].y1, arrowlines[j].x0, arrowlines[j].y0, tool.x0, tool.y0);						
					}
					
					if( l1 || l2){
						var index = arrowlines.indexOf(arrowlines[j]);
						arrowlines.splice(index, 1);
						ctx.clearRect(0, 31, canvas.width, canvas.height);
						return;
					}
				}	

				for (var j in strings) {
					var l1 = tool.isOnLine(strings[j].x, strings[j].y, strings[j].x + strings[j].text.length * 10, strings[j].y, tool.x0, tool.y0);
					var l2 = tool.isOnLine(strings[j].x, strings[j].y - 10, strings[j].x + strings[j].text.length * 10, strings[j].y - 10, tool.x0, tool.y0);
					if( l1 || l2){
						var index = strings.indexOf(strings[j]);
						strings.splice(index, 1);
						ctx.clearRect(0, 31, canvas.width, canvas.height);
						return;
					}
				}	

				
			};

			this.mousemove = function (ev) {
				tool.started = true;
				//img_update();
				return;
			};

			this.mouseup = function (ev) {
				if (tool.started) {
					tool.started = false;
					img_update();
				}
			};
			
	};


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
				img_update();

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
				img_update();
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
					
					var endRadians;
					
					if (tool.y0 == ev._y)
					{
						endRadians = Math.atan((ev._y - tool.y0)/(ev._x - tool.x0));
						endRadians += ((ev._x >= tool.x0) ? 90 : -90 ) * Math.PI / 180;					
					}
					else
					{				
						endRadians = Math.atan((ev._y - tool.y0)/(ev._x - ev._x));
						endRadians += ((ev._x >= ev._x) ? 90 : -90 ) * Math.PI / 180;
					}
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
					var endRadians;
					
					if (tool.x0 == ev._x)
					{
						endRadians = Math.atan((ev._y - tool.y0)/(ev._x - tool.x0));
						endRadians += ((ev._x >= tool.x0) ? 90 : -90 ) * Math.PI / 180;					
					}
					else
					{				
						endRadians = Math.atan((ev._y - ev._y)/(ev._x - tool.x0));
						endRadians += ((ev._x >= tool.x0) ? 90 : -90 ) * Math.PI / 180;
					}
					

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
				img_update();
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
				img_update();
			};

			this.mouseup = function (ev) {
				if (tool.started) {
					tool.mousemove(ev);
					var storerectobject = {};
					storerectobject.x = x;
					storerectobject.y = y;
					storerectobject.w = w;
					storerectobject.h = h;
					if ( w!=0 && h!=0)
						rectangles.push(storerectobject);
					tool.started = false;
					img_update();
				}
			};
	};

	drawingtools.text = function () {
			var tool = this;
			this.started = false;
			var inputstring = "",
				textwidth = 20,
				textheight = 20;
				
			this.mousedown = function (ev) {
					if (tool.started) {
						tool.started = false;
						if(textentered != ""){
							var storestringobject = {};
							storestringobject.text = textentered;
							storestringobject.x = tool.x0;
							storestringobject.y = tool.y0;
							strings.push(storestringobject);
							textentered = "";
						}
					}
					img_update();
			};

			this.mousemove = function (ev) {
				if (ev._y < 31 || ev._y > 300) {
					return;
				}				
				inputstring = textentered;
				tool.started = true;
				tool.x0 = ev._x;
				tool.y0 = ev._y;
				tool.x0 = Math.round(tool.x0 / 10) * 10;
				tool.y0 = Math.round(tool.y0 / 10) * 10;				
				ctx.clearRect(0, 31, canvas.width, canvas.height);				
				ctx.font = 'normal 12px Arial';
				for( i = 0; i< inputstring.length; i++){
					if(inputstring[i] == 'i')
						ctx.fillText(inputstring[i], tool.x0 + i * 10 + 5, tool.y0);
					else
						ctx.fillText(inputstring[i], tool.x0 + i * 10, tool.y0);
				}
				img_update();
			};

			this.mouseup = function (ev) {
				img_update();
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
					textentered = prompt("Enter text", "");
					//ctx.font = 'normal 20px Arial';
					//ctx.fillText("Text Entered: ",150,22);
					//ctx.fillText(textentered,270,22);
					textsize = textentered.length;
					img_update();
				}
				else if(ev._x < 150){
					 tool_selected = 'erase';
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
	
		ctxo.clearRect(0, 31, canvas.width, canvas.height);

		for (var x = 0.5; x < 601; x += 10) {
				ctxo.save();
				ctxo.setLineDash([1,2]);
				ctxo.beginPath();
				ctxo.moveTo(x,31);
				ctxo.lineTo(x,300);
				ctxo.stroke();
				ctxo.restore();
		}

		for (var y = 31.5; y < 301; y += 10) {
				ctxo.save();
				ctxo.setLineDash([1,2]);
				ctxo.beginPath();
				ctxo.moveTo(0,y);
				ctxo.lineTo(600,y);
				ctxo.stroke();
				ctxo.restore();
		}

		for (var j in rectangles) {
			ctx.strokeRect(rectangles[j].x, rectangles[j].y, rectangles[j].w, rectangles[j].h);		
		}	
		
		for (var j in lines) {		
					ctx.beginPath();
					ctx.moveTo(lines[j].x0, lines[j].y0);
					ctx.lineTo(lines[j].x1, lines[j].y1);
					ctx.stroke();
					ctx.closePath();
					
					ctx.beginPath();
					ctx.moveTo(lines[j].x1, lines[j].y1);
					ctx.lineTo(lines[j].x2, lines[j].y2);
					ctx.stroke();
					ctx.closePath();
		}

		for (var j in arrowlines) {		
					ctx.beginPath();
					ctx.moveTo(arrowlines[j].x0, arrowlines[j].y0);
					ctx.lineTo(arrowlines[j].x1, arrowlines[j].y1);
					ctx.stroke();
					ctx.closePath();
					
					ctx.beginPath();
					ctx.moveTo(arrowlines[j].x1, arrowlines[j].y1);
					ctx.lineTo(arrowlines[j].x2, arrowlines[j].y2);
					ctx.stroke();
					ctx.closePath();
					
					var endRadians;
					
					if (arrowlines[j].y0 == arrowlines[j].y2)
					{
						endRadians = Math.atan((arrowlines[j].y2- arrowlines[j].y0)/(arrowlines[j].x2 - arrowlines[j].x0));
						endRadians += ((arrowlines[j].x2 >= arrowlines[j].x0) ? 90 : -90 ) * Math.PI / 180;					
					}
					else if(arrowlines[j].x0 == arrowlines[j].x2)
					{				
						endRadians = Math.atan((arrowlines[j].y2- arrowlines[j].y0)/(arrowlines[j].x2 - arrowlines[j].x0));
						endRadians += ((arrowlines[j].x2 >= arrowlines[j].x0) ? 90 : -90 ) * Math.PI / 180;
					}
					else{
						endRadians = Math.atan((arrowlines[j].y2- arrowlines[j].y1)/(arrowlines[j].x2 - arrowlines[j].x1));
						endRadians += ((arrowlines[j].x2 >= arrowlines[j].x1) ? 90 : -90 ) * Math.PI / 180;
					}
					
					ctx.save();
					ctx.beginPath();
					ctx.translate(arrowlines[j].x2, arrowlines[j].y2);
					ctx.rotate(endRadians);
					ctx.moveTo(0,0);
					ctx.lineTo(5,10);
					ctx.lineTo(-5,10);
					ctx.closePath();
					ctx.restore();
					ctx.fill();				
		}
		
		ctx.clearRect(150, 0, 400 , 30);
		
		if(textentered){
			ctx.font = 'normal 12px Arial';
			ctx.fillText("Text Entered: ",150,22);
			ctx.fillText(textentered,270,22);
		}
		
		ctx.font = 'normal 12px Arial';
		for(j in strings){
			for( i = 0; i< strings[j].text.length; i++){
				if(strings[j].text[i] == 'i')
					ctx.fillText(strings[j].text[i], strings[j].x + i * 10 + 5, strings[j].y);
				else
					ctx.fillText(strings[j].text[i], strings[j].x + i * 10, strings[j].y);
			}
		}
		
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
				ctx.strokeStyle = '#000000';
				// "rgba(255, 255, 255, 0.5)"
				//ctx.strokeStyle = "rgba(0, 0, 0, 0)";
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
			img_update();
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
