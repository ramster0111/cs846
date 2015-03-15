
// content.js is the only script which can interact and manipulate with DOM


// function LoadPage(href)
// {
//     var xmlhttp = new XMLHttpRequest();
//     xmlhttp.open("GET", href, false);
//     xmlhttp.send();
//     return xmlhttp.responseText;
// }



// Listen for messages
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) 
{
    if(msg.text && (msg.text == "insert_text")) 
    {
        var dataString = "";
        for (i = 0; i < msg.data.length; i++)
        {
            dataString += msg.data[i] + " - ";
        }
        //alert("content.js" + dataString);

        $("#blob_contents").caret();
        alert("content.js" + dataString);
        
        //alert(msg.data);
        //alert("insert_text 2");
        //sendResponse(document.getElementById("blob_contents").value);
    }

    //ParseTextToVector("hello dude");

    // If the received message has the expected format...
    //if (msg.text && (msg.text == "report_back")) 
    //{
    //	// http://stackoverflow.com/questions/19758028/chrome-extension-get-dom-content
    //    sendResponse(document.getElementById("blob_contents").value);
    //}
});