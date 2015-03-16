
// list of characters

var vLine = "┃";
var hLine = "━";

var ulCorner = "┏";
var urCorner = "┓";

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

var oriWidth = 600;
var oriHeight = 300;
var gridSize = 10;

// not done yet
// textInput: 	input text which contains unicode art
function ParseUnicodeToVector()
{
	//var width = 60;
	//var height = 30

}

function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
}

function ParseVectorToUnicode1(dataInput)
{
	var textWidth = oriWidth / gridSize;
	var textHeight = oriHeight / gridSize;
	var stringArray = "/*\\n";

	for(a = 0; a < textHeight; a++)
	{
		for(b = 0; b < textWidth; b++)
		{
			stringArray += " ";
		}
		stringArray += "\\n";
	}
	stringArray += "*/";
	console.log(textWidth + " --- " + textHeight + " --- " + stringArray.length);
	return stringArray;
}

// not done yet
function ParseVectorToUnicode(dataInput)
{
	//alert(dataInput.rectangles.length + " - " + dataInput.lines.length + " - " + dataInput.arrowlines.length);
	var debugString = "";
	var rectangles 	= dataInput.rectangles;
	var lines 		= dataInput.lines;
	var arrowlines 	= dataInput.arrowlines;


	/*
	var testString = "BONANA";
	testString = setCharAt(testString,1,'a');
	alert(testString);*/


	var textWidth = oriWidth / gridSize;
	var textHeight = oriHeight / gridSize;
	var stringArray = [];
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

	/*
	for(a = 0; a < textHeight; a++)
	{
		for(b = 0; b < textWidth; b++)
		{
			stringArray[a] += "-";
		}
	}
	*/

	/*
	for(a = 0; a < textHeight; a++)
	{
		for(b = 0; b < textWidth; b++)
		{
			stringArray[a] = setCharAt(stringArray[a],b,'~');
		}
	}
	*/

	// parse rectangles
	/*
	for(i = 0; i < rectangles.length; i++)
	{		
		var rect = rectangles[i];
		//debugString += rect.x + " - " + rect.y + " - " + rect.w + " - " + rect.h + "\n"; 

		var x1 = rect.x / gridSize;
		var x2 = (rect.x + rect.w)  / gridSize;
		for(a = rect.y / gridSize; a < (rect.y + rect.h) / gridSize; a++)
		{
			stringArray[a] = setCharAt(stringArray[a],x1, vLine);
			stringArray[a] = setCharAt(stringArray[a],x2, vLine);
		}

		var y1 = rect.y  / gridSize;
		var y2 = (rect.y + rect.h)  / gridSize;
		for(a = rect.x / gridSize; a < (rect.x + rect.w) / gridSize; a++)
		{
			stringArray[y1] = setCharAt(stringArray[y1],x, hLine);
			stringArray[y2] = setCharAt(stringArray[y2],x, hLine);
		}

	}*/
	/*
	// parse lines
	for(i = 0; i < lines.length; i++)
	{		
		var line = lines[i];
		//debugString += line.x0 + " - " + line.y0 + " | " + line.x1 + " - " + line.y1 + " | " + line.x2 + " - " + line.y2 + "\n";
	}

	// parse arrow lines
	for(i = 0; i < arrowlines.length; i++)
	{		
		var aline = arrowlines[i];
		//debugString += aline.x0 + " - " + aline.y0 + " | " + aline.x1 + " - " + aline.y1 + " | " + aline.x2 + " - " + aline.y2 + "\n";
	}
	*/

	// for(a = 0; a < textHeight; a++)
	// {
		
	// 	stringArray[a] = " *" + stringArray[a];
	// }

	return stringArray;
	//alert(debugString);
}