

chrome.tabs.onUpdated.addListener(function(tabID, changeInfo, tab)
{
	if(tab.url.match(/https:\/\/(gist.)?github.com/))
	{
		//window.alert("it's github !");
		var splitString = tab.url.split( '/' );
		//var stringToShow = "";
		//for (i = 0; i < splitString.length; i++) 
		//{
		//	stringToShow += i + " - " + splitString[i] + "\n";
		//}
		//window.alert(stringToShow);

		if(splitString.length >= 5 && splitString[5].match("edit"))
		{
			window.alert("editing !");
		}
	}
});