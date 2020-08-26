$(document).ready(function() {
    setTimeout(function() {
        var array = $('.font-semibold.mb-1.text-primary span').map(function(){
            return $(this).text();
        }).get();
        alert(array)
        chrome.runtime.sendMessage({identifiers: name});
    }, 5000);
});

