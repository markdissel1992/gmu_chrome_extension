setTimeout(function(){
    var data = [];
    $('.text-grey-darkest.text-2xl.font-light.mb-2').each(function () {
        data.push($(this).text());
    });
    chrome.runtime.sendMessage({action: "parseData", data: data});
}, 5000);

