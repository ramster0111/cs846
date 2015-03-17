
// background.js cannot interact with DOM, use content.js instead


var currentTabID = -1;

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) 
{
    switch (request.directive) 
    {
    case "insertdiagram":
        //if(request.data)
        //{
        //    alert("background.js diagram is delivered, data is OK, tab ID is " + currentTabID);
        //}
        chrome.tabs.sendMessage(currentTabID, { text: "insert_text", data: request.data}, function(response) {
            //console.log(response.farewell);
        });
        break;
    case "canceldiagram":
        // do nothing
        break;
        
    }
    sendResponse({});
});

chrome.tabs.onUpdated.addListener(function(tabID, changeInfo, tab)
{
    if(tabID)
    {
        currentTabID = tabID;
    }

    var splitString = tab.url.split( '/' );
	if(tab.url.match(/https:\/\/(gist.)?github.com/) && splitString.length >= 5 && splitString[5].match("edit"))
	{
        chrome.browserAction.enable(tabID);
        chrome.browserAction.setIcon({path: "images/icon16.png"});
	}
    else
    {
        //console.log("3");
        chrome.browserAction.disable(tabID);
        chrome.browserAction.setIcon({path: "images/icon16disable.png"});
    }
});

// chrome.browserAction.onClicked.addListener(function (tab) {
//     alert("icon clicked");
// });


chrome.browserAction.onClicked.addListener(function() 
{  
    // chrome.tabs.sendMessage(currentTabID, { text: "clicked"}, function(response) {
    //         console.log(response.farewell);
    //     });

    /*
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
    */
});

