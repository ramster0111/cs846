 function drawCanvas(){
	var canvas = document.getElementById('Canvas');
	
	if (canvas.getContext) {
		var ctx = canvas.getContext('2d');
/*
		ctx.fillRect(25,25,100,100);
		ctx.clearRect(45,45,60,60);
		ctx.strokeRect(50,50,50,50);
*/

		var rectImage = new Image();   // a
		var lineImage = new Image();   // b 
		var lineArrowImage = new Image();   // c 
		var text = new Image();   // d 
		var eraser = new Image();   // e 
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

 }

 window.addEventListener('load', drawCanvas);
