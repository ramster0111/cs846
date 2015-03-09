// Listen for messages
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) 
{
    // If the received message has the expected format...
    if (msg.text && (msg.text == "report_back")) 
    {
    	// http://stackoverflow.com/questions/19758028/chrome-extension-get-dom-content
        //sendResponse(document.getElementById("id"));
        sendResponse(document.all[0].outerHTML);
    }
});