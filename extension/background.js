
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
    var w = 500;
    var h = 250;
	
	// To draw in the middle
    var left = (screen.width / 2) - ( w / 4);
    var top = (screen.height / 2) - (h / 4); 

    chrome.windows.create({'url': 'canvas.html', 'type': 'popup', 'left': left, 'top': top, 'width': w, 'height': h,} , function(window) {
    });
});

