$(document).ready(function() {
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
        var names = request.identifiers;
        console.log(typeof names);
        // let csvContent = "data:text/csv;charset=utf-8,";
        // rows.forEach(function(rowArray) {
        //     let row = rowArray.join(",");
        //     csvContent += row + "\r\n";
        // });
        // var encodedUri = encodeURI(csvContent);
        // window.open(encodedUri);
        //alert(encodedUri);
    });
});