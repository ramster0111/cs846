
// content.js is the only script which can interact and manipulate with DOM

function loadPage(href)
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
    	var canvasPanelURL = chrome.extension.getURL("canvas.html");
    	//var canvasPanel = loadPage(canvasPanelURL);
    	//var canvasPanel = document.open("canvasPanelURL");

    	//alert(canvasPanel.innerHTML);

    	//jQuery("#dialog").load(canvasPanel).dialog({modal:true}); 

    	//alert(canvasPanel);
    	//document.body.appendChild(canvasPanel);
    	//jQuery("#dialog").dialog();

    	
    	var layerNode = document.createElement('div');
		layerNode.setAttribute('id','dialog');
		layerNode.setAttribute('title','Basic dialog');
		var pNode = document.createElement('p');
		console.log("pNode created"); 
		pNode.innerHTML = "something nom nom nom";
		layerNode.appendChild(pNode);
		document.body.appendChild(layerNode);

		jQuery("#dialog").dialog();
		

		/*
		jQuery("#dialog").dialog({
		autoOpen: true, 
		draggable: true,
		resizable: true,
		height: 'auto',
		width: 500,
		zIndex:3999,
		modal: false,
		open: function(event, ui) {
			$(event.target).parent().css('position','fixed');
			$(event.target).parent().css('top', '5px');
			$(event.target).parent().css('left', '10px');
  		}});
		*/

    	var faElements = document.getElementsByClassName("file-actions");
    	var faDiv = faElements[0];

    	var buttonElem = document.getElementById("insert_diagram_button");
    	if(buttonElem == null)
    	{
    		faDiv.innerHTML += "<a id='insert_diagram_button' href='#'>Insert a diagram</a>";
    	}



    	// send a response to background.js (is this appropriate?)
    	// http://stackoverflow.com/questions/19758028/chrome-extension-get-dom-content
        sendResponse(document.getElementById("blob_contents").value);
    }
});