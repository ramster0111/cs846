
// list of characters

// var vLine = "│";
// var hLine = "─";
// var tlCorner = "┌";
// var trCorner = "┐";
// var blCorner = "└";
// var brCorner = "┘";
// var rFork = "┣";
// var lFork = "┫";
// var bFork = "┳";
// var tFork = "┻";

var vLine = "┃";
var hLine = "━";

var tlCorner = "┏";
var trCorner = "┓";

var blCorner = "┗";
var brCorner = "┛";

var rFork = "┣";
var lFork = "┫";
var bFork = "┳";

var tFork = "┻";

var intersection = "╋";

var rTriangle = "▶"; 
var lTriangle = "◀"; 
var tTriangle = "▲";
var bTriangle = "▼";

var slash = "╱";
var backslash = "╲";
var cross = "╳";

// ADD 10
var oriWidth = 610;
var oriHeight = 310;
var gridSize = 10;

// not done yet
// textInput: 	input text which contains unicode art
function ParseUnicodeToVector()
{
}

function setCharAt(str,index,chr) 
{
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
}

function DrawCorner(stringArray, arrayMap, line)
{
	var x0 = line.x0;
	var x1 = line.x1;
	var x2 = line.x2;
	var y0 = line.y0;
	var y1 = line.y1;
	var y2 = line.y2;

	// invert
	if(line.x0 > line.x2)
	{
		x2 = line.x0;
		x0 = line.x2;
		y2 = line.y0;
		y0 = line.y2;
		if(line.x1 == line.x2 && line.y1 == line.y2)
		{
			x1 = line.x0;
			y1 = line.y0;
		}
	}

	if(x1 == x2 && y1 == y2)
	{
	}
	else
	{
		var isV1 = true; // vertical = true; horizontal = false
		var isV2 = true; // vertical = true; horizontal = false

		if(x0 != x1) { isV1 = false;}
		if(x1 != x2) { isV2 = false;}

		if(isV1 && !isV2) // vertical horizontal
		{
			if(y0 < y2)
			{
				stringArray[y1 / gridSize] = setCharAt(stringArray[y1 / gridSize], x1 / gridSize, blCorner);
			}
			else
			{
				stringArray[y1 / gridSize] = setCharAt(stringArray[y1 / gridSize], x1 / gridSize, tlCorner);
			}
		}
		else if(!isV1 && isV2) // horizontal vertical 
		{
			if(y0 < y2)
			{
				stringArray[y1 / gridSize] = setCharAt(stringArray[y1 / gridSize], x1 / gridSize, trCorner);
			}
			else
			{
				stringArray[y1 / gridSize] = setCharAt(stringArray[y1 / gridSize], x1 / gridSize, brCorner);
			}
		}
	}
}

function DrawArrow(stringArray, arrayMap, aLine)
{
	var xStart = 0;
	var yStart = 0;
	var xEnd = 0;
	var yEnd = 0;
	if(aLine.x1 == aLine.x2 && aLine.y1 == aLine.y2)
	{
		xStart = aLine.x0;
		xEnd   = aLine.x1;
		yStart = aLine.y0;
		yEnd   = aLine.y1;
	}
	else
	{
		xStart = aLine.x1;
		xEnd   = aLine.x2;
		yStart = aLine.y1;
		yEnd   = aLine.y2;
	}

	if(xStart < xEnd && yStart == yEnd) 
	{
		// pointing right
		stringArray[aLine.y2 / gridSize] = setCharAt(stringArray[aLine.y2 / gridSize], aLine.x2 / gridSize, rTriangle);
	}
	else if(xStart > xEnd && yStart == yEnd)
	{
		// pointing left
		stringArray[aLine.y2 / gridSize] = setCharAt(stringArray[aLine.y2 / gridSize], aLine.x2 / gridSize, lTriangle);
	}
	else if(xStart == xEnd && yStart < yEnd)
	{
		// pointing down
		stringArray[aLine.y2 / gridSize] = setCharAt(stringArray[aLine.y2 / gridSize], aLine.x2 / gridSize, bTriangle);
	}
	else if(xStart == xEnd && yStart > yEnd)
	{
		// pointing up
		stringArray[aLine.y2 / gridSize] = setCharAt(stringArray[aLine.y2 / gridSize], aLine.x2 / gridSize, tTriangle);
	}

	arrayMap[aLine.x2 / gridSize][aLine.y2 / gridSize] = 0;
}

function DrawAStraightLine(stringArray, arrayMap, xStart, yStart, xEnd, yEnd)
{
	if(xStart > xEnd) { xEnd = [xStart, xStart = xEnd][0]; }

	if(yStart > yEnd) { yEnd = [yStart, yStart = yEnd][0]; }

	if(xStart == xEnd && yStart == yEnd)
	{
	}
	else if(xStart == xEnd && yStart != yEnd) 
	{
		// draw vertical line
		var x1 = xStart / gridSize;
		var x2 = xEnd  / gridSize;
		for(a = yStart / gridSize; a < yEnd / gridSize; a++)
		{
			stringArray[a] = setCharAt(stringArray[a],x1, vLine);
			stringArray[a] = setCharAt(stringArray[a],x2, vLine);

			arrayMap[x1][a] = 1;
			arrayMap[x2][a] = 1;
		}
	}
	else if(xStart != xEnd && yStart == yEnd)
	{
		// draw horizontal line
		var y1 = yStart / gridSize;
		var y2 = yEnd  / gridSize;
		for(a = xStart / gridSize; a < xEnd / gridSize; a++)
		{
			stringArray[y1] = setCharAt(stringArray[y1], a, hLine);
			stringArray[y2] = setCharAt(stringArray[y2], a, hLine);

			arrayMap[a][y1] = 1;
			arrayMap[a][y2] = 1;
		}
	}
}

function AddIntersections(stringArray, arrayMap, x, y)
{
	var textWidth = oriWidth / gridSize;
	var textHeight = oriHeight / gridSize;

	var selfcell  = false; 
	var tNeighbor = false;	// top
	var rNeighbor = false;	// right
	var bNeighbor = false;  // bottom
	var lNeighbor = false;  // left

	var tlNeighbor = false;
	var trNeighbor = false;
	var blNeighbor = false;
	var brNeighbor = false;

	//console.log(x + " - " + y + " - " + textWidth + " - " + textHeight );

	// self
	if(arrayMap[x][y] == 1)
		{ selfcell = true; }

	// top neighbor
	if(y - 1 >= 0 && arrayMap[x][y - 1] == 1)
		{ tNeighbor = true; }

	// right neighbor
	if(x + 1 < textWidth && arrayMap[x + 1][y] == 1)
		{ rNeighbor = true; }

	// bottom neighbor
	if(y + 1 < textHeight && arrayMap[x][y + 1] == 1)
		{ bNeighbor = true; }

	// left neighbor
	if(x - 1 >= 0 && arrayMap[x - 1][y] == 1)
		{ lNeighbor = true; }


	// topleft neighbor
	if(x - 1 >= 0 && y - 1 >= 0 && arrayMap[x - 1][y - 1] == 1)
		{ tlNeighbor = true; }

	// topright neighbor
	if(x + 1 < textWidth && y - 1 >= 0 && arrayMap[x + 1][y - 1] == 1)
		{ trNeighbor = true; }

	// bottomleft neighbor
	if(x - 1 >= 0 && y + 1 < textHeight && arrayMap[x - 1][y + 1] == 1)
		{ blNeighbor = true; }

	// bottomright neighbor
	if(x + 1 < textWidth && y + 1 < textHeight && arrayMap[x + 1][y + 1] == 1)
		{ brNeighbor = true; }

	//var repChar = "";

	//var tlCorner = "┏";
	if(selfcell && !tNeighbor && rNeighbor && bNeighbor && !lNeighbor)
		{ stringArray[y] = setCharAt(stringArray[y], x, tlCorner); }
	
	//var trCorner = "┓";
	if(selfcell && !tNeighbor && !rNeighbor && bNeighbor && lNeighbor)
		{ stringArray[y] = setCharAt(stringArray[y], x, trCorner); }

	//var blCorner = "┗";
	if(selfcell && tNeighbor && rNeighbor && !bNeighbor && !lNeighbor)
		{ stringArray[y] = setCharAt(stringArray[y], x, blCorner); }
	
	//var brCorner = "┛";
	if(selfcell && tNeighbor && !rNeighbor && !bNeighbor && lNeighbor)
		{ stringArray[y] = setCharAt(stringArray[y], x, brCorner); }

	//var rFork = "┣";	
	if(selfcell && tNeighbor && rNeighbor && bNeighbor && !lNeighbor && !brNeighbor && !trNeighbor)
		{ stringArray[y] = setCharAt(stringArray[y], x, rFork); }

	//var lFork = "┫";
	if(selfcell && tNeighbor && !rNeighbor && bNeighbor && lNeighbor && !blNeighbor && !tlNeighbor)
		{ stringArray[y] = setCharAt(stringArray[y], x, lFork); }

	//var bFork = "┳";
	if(selfcell && !tNeighbor && rNeighbor && bNeighbor && lNeighbor && !blNeighbor && !brNeighbor)
		{ stringArray[y] = setCharAt(stringArray[y], x, bFork); }

	//var tFork = "┻";
	if(selfcell && tNeighbor && rNeighbor && !bNeighbor && lNeighbor && !tlNeighbor && !trNeighbor)
		{ stringArray[y] = setCharAt(stringArray[y], x, tFork); }

	// THIS IS TOO COMPLICATED
	//var intersection = "╋";
	if(selfcell && tNeighbor && rNeighbor && bNeighbor && lNeighbor && !tlNeighbor && !trNeighbor && !blNeighbor && !brNeighbor)
		{ stringArray[y] = setCharAt(stringArray[y], x, intersection); }

	
}

// not done yet
function ParseVectorToUnicode(dataInput)
{
	var rectangles 	= dataInput.rectangles;
	var lines 		= dataInput.lines;
	var arrowlines 	= dataInput.arrowlines;

	var textWidth = oriWidth / gridSize;
	var textHeight = oriHeight / gridSize;
	var stringArray = [];

	var arrayMap = new Array(textWidth);
	for (var i = 0; i < textWidth; i++)
	{
		arrayMap[i] = new Array(textHeight);
	}
	for (a = 0; a < textHeight; a++)
	{
		for (b = 0; b < textWidth; b++)
		{
			arrayMap[b][a] = 0;
		}
	}

	console.log(textWidth + " --- " + textHeight);
	for(a = 0; a < textHeight; a++)
	{
		var lineStr = "";
		for(b = 0; b < textWidth; b++)
		{
			lineStr += " ";
		}
		stringArray.push(lineStr);
	}

	// parse rectangles	
	for(i = 0; i < rectangles.length; i++)
	{		
		var rect = rectangles[i];

		// vertical
		var x1 = rect.x / gridSize;
		var x2 = (rect.x + rect.w)  / gridSize;
		for(a = rect.y / gridSize; a < (rect.y + rect.h) / gridSize; a++)
		{
			stringArray[a] = setCharAt(stringArray[a],x1, vLine);
			stringArray[a] = setCharAt(stringArray[a],x2, vLine);

			arrayMap[x1][a] = 1;
			arrayMap[x2][a] = 1;
		}

		// horizontal
		var y1 = rect.y  / gridSize;
		var y2 = (rect.y + rect.h)  / gridSize;
		for(a = rect.x / gridSize; a < (rect.x + rect.w) / gridSize; a++)
		{
			stringArray[y1] = setCharAt(stringArray[y1], a, hLine);
			stringArray[y2] = setCharAt(stringArray[y2], a, hLine);

			arrayMap[a][y1] = 1;
			arrayMap[a][y2] = 1;
		}
		
		stringArray[y1] = setCharAt(stringArray[y1], x1, tlCorner);	// topleft		
		stringArray[y1] = setCharAt(stringArray[y1], x2, trCorner);	// topright		
		stringArray[y2] = setCharAt(stringArray[y2], x1, blCorner);	// bottomleft		
		stringArray[y2] = setCharAt(stringArray[y2], x2, brCorner);	// bottomright

		arrayMap[x1][y1] = 1;
		arrayMap[x2][y1] = 1;
		arrayMap[x1][y2] = 1;
		arrayMap[x2][y2] = 1;
	}	

	// parse lines
	for(i = 0; i < lines.length; i++)
	{		
		var line = lines[i];		
		DrawAStraightLine(stringArray, arrayMap, line.x0, line.y0, line.x1, line.y1);		// p0 --> p1
		DrawAStraightLine(stringArray, arrayMap, line.x1, line.y1, line.x2, line.y2);		// p1 --> p2
		DrawCorner(stringArray, arrayMap, line);
		console.log(line.x0 + " - " + line.y0 + " | " + line.x1 + " - " + line.y1 + " | " + line.x2 + " - " + line.y2);

	}
	
	// parse arrow lines
	console.log(" arrowlines.length " +arrowlines.length);
	for(i = 0; i < arrowlines.length; i++)
	{		
		var aline = arrowlines[i];
		DrawAStraightLine(stringArray, arrayMap, aline.x0, aline.y0, aline.x1, aline.y1);		// p0 --> p1
		DrawAStraightLine(stringArray, arrayMap, aline.x1, aline.y1, aline.x2, aline.y2);		// p1 --> p2
		DrawArrow(stringArray, arrayMap, aline);
		DrawCorner(stringArray, arrayMap, aline);
		console.log(aline.x0 + " - " + aline.y0 + " | " + aline.x1 + " - " + aline.y1 + " | " + aline.x2 + " - " + aline.y2);
	}


	// STIL BUGGY
	for (a = 0; a < textHeight; a++)
	{
		for (b = 0; b < textWidth; b++)
		{
			AddIntersections(stringArray, arrayMap, b, a);
		}
	}

	/*
	var debugString = "";
	for (a = 0; a < textHeight; a++)
	{
		for (b = 0; b < textWidth; b++)
		{
			debugString += arrayMap[b][a];
		}
		debugString += "\n";
	}
	console.log(debugString);
	*/

	return stringArray;
}