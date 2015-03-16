
// content.js is the only script which can interact and manipulate with DOM




document.onmousedown = mouseDown;

function mouseDown(e)
{
}

function InsertToAceEditor(message)
{
    var scriptContent = "document.querySelector('.ace_editor').env.editor.insert('" +  message+ " ')";
    var script = document.createElement('script');
    script.id = 'tmpScript';
    script.appendChild(document.createTextNode(scriptContent));
    document.body.appendChild(script);
    $("#tmpScript").remove();
}


// Listen for messages
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) 
{
    if(msg.text && (msg.text == "insert_text")) 
    {
        //InsertToAceEditor("HELLO WORLD");
        //alert(msg.data.rectangles.length + " - " + msg.data.lines.length + " - " + msg.data.arrowlines.length);
     
        //alert(msg.data);
        //alert("insert_text 2");
        //sendResponse(document.getElementById("blob_contents").value);
    }
    // else if(msg.text && (msg.text == "clicked"))
    // {
    //     alert("click'");
    // }

    //ParseTextToVector("hello dude");

    // If the received message has the expected format...
    //if (msg.text && (msg.text == "report_back")) 
    //{
    //	// http://stackoverflow.com/questions/19758028/chrome-extension-get-dom-content
    //    sendResponse(document.getElementById("blob_contents").value);
    //}
});