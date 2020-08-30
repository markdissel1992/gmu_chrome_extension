$(document).ready(function() {
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        if (request.action === 'goToPage') {
            var url = request.url;
            chrome.tabs.create({url}, tab => {
                chrome.tabs.executeScript(tab.id, { file: 'singlePageScript.js' })
            });
        }
        if (request.action === 'parseData') {
            chrome.tabs.query({active:true,currentWindow:true},function(tabs){
                chrome.tabs.remove(tabs[0].id);
            });
            setTimeout(function(){
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    console.log(request.data);
                    chrome.tabs.sendMessage(tabs[0].id, {message: "getCurrentPageData", data: request.data});
                });
            }, 5000);

        }
        return true;
    });
})
