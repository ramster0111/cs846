
// content.js is the only script which can interact and manipulate with DOM


function LoadPage(href)
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", href, false);
    xmlhttp.send();
    return xmlhttp.responseText;
}


// Listen for messages
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) 
{
    // If the received message has the expected format...
    if (msg.text && (msg.text == "report_back")) 
    {
    	//var canvasPanelURL = chrome.extension.getURL("canvas.html");
    	//var canvasPanel = LoadPage(canvasPanelURL);

    	//var faElements = document.getElementsByClassName("file-actions");
    	//var faDiv = faElements[0];

    	//var buttonElem = document.getElementById("insert_diagram_button");
    	//if(buttonElem == null)
    	//{
    	//	faDiv.innerHTML += "<a id='insert_diagram_button' href='#' >Diagram</a>";
    		/*
			document.addEventListener('DOMContentLoaded', function () 
			{
				document.querySelector('#insert_diagram_button').addEventListener('click', clickHandler);
				main();
			});
			*/
    	//}



    	// send a response to background.js (is this appropriate?)
    	// http://stackoverflow.com/questions/19758028/chrome-extension-get-dom-content
        sendResponse(document.getElementById("blob_contents").value);
    }
});