
// background.js cannot interact with DOM, use content.js instead


function doStuffWithDOM(element) 
{
	if(element != null)
	{
        // content of the source code here
        //alert(element);
    }
}

chrome.tabs.onUpdated.addListener(function(tabID, changeInfo, tab)
{
	if(tab.url.match(/https:\/\/(gist.)?github.com/))
	{

		var splitString = tab.url.split( '/' );
		if(splitString.length >= 5 && splitString[5].match("edit"))
		{
			// retrieving dom
			chrome.tabs.sendMessage(tab.id, { text: "report_back" }, doStuffWithDOM);
		}
	}
});


chrome.browserAction.onClicked.addListener(function() {
    var w = 600;
    var h = 300;
	
	// To draw in the middle
    var left = (screen.width / 2) - ( w / 2);
    var top = (screen.height / 2) - (h / 2); 

    chrome.windows.create({'url': 'canvas.html', 'type': 'popup', 'width': w, 'height': h, 'left': left, 'top': top} , function(window) {
    });
});

