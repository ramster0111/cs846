
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

// not done yet
function ParseVectorToUnicode(dataInput)
{
	//alert(dataInput.rectangles.length + " - " + dataInput.lines.length + " - " + dataInput.arrowlines.length);
	var debugString = "";
	var rectangles 	= dataInput.rectangles;
	var lines 		= dataInput.lines;
	var arrowlines 	= dataInput.arrowlines;

	var returnString = "/* |";

	var textWidth = oriWidth / gridSize;
	var textHeight = oriHeight / gridSize;
	for(a = 0; a < textHeight; a++)
	{
		for(b = 0; b < textWidth; b++)
		{
			returnString += "-";
		}
		returnString += " | ";
	}
	returnString += "*/"



	// parse rectangles
	for(i = 0; i < rectangles.length; i++)
	{		
		var rect = rectangles[i];
		var xStart = rect.x;
		var yStart = rect.y;
		//debugString += rect.x + " - " + rect.y + " - " + rect.w + " - " + rect.h + "\n"; 
	}

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

	return returnString;
	//alert(debugString);
}