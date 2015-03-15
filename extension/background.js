
// background.js cannot interact with DOM, use content.js instead


//function doStuffWithDOM(element) 
//{
//	if(element != null)
//	{
//      // content of the source code here
//      //alert(element);
//  }
//}

var currentTabID;

//function InsertDiagramToTextArea(element) 
//{
    //alert(element);
    //alert("insert_text 2");
//}

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) 
{
    switch (request.directive) 
    {
    case "insertdiagram":

        chrome.tabs.sendMessage(currentTabID, { text: "insert_text", data: request.data}, function(response) {
            console.log(response.farewell);
        });
        sendResponse({});
        break;
    case "canceldiagram":
        // do nothing
        sendResponse({});
        break;
    }
});

chrome.tabs.onUpdated.addListener(function(tabID, changeInfo, tab)
{
    var splitString = tab.url.split( '/' );
	if(tab.url.match(/https:\/\/(gist.)?github.com/) && splitString.length >= 5 && splitString[5].match("edit"))
	{
		// retrieving dom
		//chrome.tabs.sendMessage(tab.id, { text: "report_back" }, doStuffWithDOM);
        currentTabID = tabID;
        chrome.browserAction.enable(tabID);
        chrome.browserAction.setIcon({path: "images/icon16.png"});
	}
    else
    {
        console.log("3");
        chrome.browserAction.disable(tabID);
        chrome.browserAction.setIcon({path: "images/icon16disable.png"});
    }
});


chrome.browserAction.onClicked.addListener(function() 
{
    var w = 600;
    var h = 300;
	
	// To draw in the middle
    var left = (screen.width / 2) - ( w / 4);
    var top = (screen.height / 2) - (h / 4); 

    chrome.windows.create({
    	'url': 'canvas.html', 
    	'type': 'popup', 
    	'left': left, 
    	'top': top, 
    	'width': w, 
    	'height': h}, 
    	function(window) { });
});

