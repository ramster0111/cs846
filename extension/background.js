

function doStuffWithDOM(element) 
{
	// seems doesn't work, but https isn't the issue
	alert("element: " + element);
}

chrome.tabs.onUpdated.addListener(function(tabID, changeInfo, tab)
{
	if(tab.url.match(/https:\/\/(gist.)?github.com/))
	{

		var splitString = tab.url.split( '/' );
		if(splitString.length >= 5 && splitString[5].match("edit"))
		{
			// a user is editing afile on github
			alert("editing something...");
		}
	}

	// retrieving dom
	chrome.tabs.sendMessage(tab.id, { text: "report_back" }, doStuffWithDOM);
});