
// content.js is the only script which can interact and manipulate with DOM




document.onmousedown = mouseDown;

/*
var script0 = document.createElement('link');
script0.rel = "stylesheet";
script0.type = "text/css";
script0.href = "https://fonts.googleapis.com/css?family=Droid+Sans+Mono"
document.head.appendChild(script0);
*/

/*
var scriptContent1 = "document.querySelector('.ace_editor').env.editor.setOptions({ fontFamily: 'Droid Sans Mono', fontSize: '10pt' });";
var script1 = document.createElement('script');
script1.id = 'tmpScriptInit';
script1.appendChild(document.createTextNode(scriptContent1));
document.body.appendChild(script1);*/

function mouseDown(e)
{
}

/*function NavigateLeft()
{
    var scriptContent = "document.querySelector('.ace_editor').env.editor.navigateLeft(1);";
    var script = document.createElement('script');
    script.id = 'tmpScript';
    script.appendChild(document.createTextNode(scriptContent));
    document.body.appendChild(script);
    $("#tmpScript").remove();
}*/

/*function NavigateRight()
{
    var scriptContent = "document.querySelector('.ace_editor').env.editor.navigateRight(1);";
    var script = document.createElement('script');
    script.id = 'tmpScript';
    script.appendChild(document.createTextNode(scriptContent));
    document.body.appendChild(script);
    $("#tmpScript").remove();
}*/

function InsertANewline()
{
    var scriptContent = "document.querySelector('.ace_editor').env.editor.insert('\\n'); ";
    var script = document.createElement('script');
    script.id = 'tmpScript';
    script.appendChild(document.createTextNode(scriptContent));
    document.body.appendChild(script);
    $("#tmpScript").remove();

    /*
    var scriptContent = "document.querySelector('.ace_editor').env.editor.splitLine(); document.querySelector('.ace_editor').env.editor.navigateDown(1);";
    var script = document.createElement('script');
    script.id = 'tmpScript';
    script.appendChild(document.createTextNode(scriptContent));
    document.body.appendChild(script);
    $("#tmpScript").remove();
    */
}

function InsertToAceEditor(message)
{
    var scriptContent = "document.querySelector('.ace_editor').env.editor.insert('" +  message + " ')";
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
        var stringArray = ParseVectorToUnicode(msg.data);
        InsertANewline();
        InsertToAceEditor("/*");
        console.log(stringArray.length);
        for(a = 0; a < stringArray.length; a++)
        {
           InsertANewline();
           InsertToAceEditor( "* " + stringArray[a]);
        }
        InsertANewline();
        InsertToAceEditor("*/");
    }

    //ParseTextToVector("hello dude");
    // If the received message has the expected format...
    //if (msg.text && (msg.text == "report_back")) 
    //{
    //	// http://stackoverflow.com/questions/19758028/chrome-extension-get-dom-content
    //    sendResponse(document.getElementById("blob_contents").value);
    //}
});