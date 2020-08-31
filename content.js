$(document).ready(function() {
    var currentPage = "";
    var pages;
    var count = 0;
    chrome.runtime.onMessage.addListener(
        function(request) {
            initInfo();
            if(request.message === "start" ) {
                pages = getPages('.font-semibold.mb-1.text-primary span');
                var i = 0;
                $.each(pages, function(key){
                    setTimeout(function(){
                        count += 1;
                        getNextPage('span:contains('+key+')');
                        incrementCount();
                        currentPage = key;
                    },i);
                    i += 12500;
                });
            }
            if(request.message === "getCurrentPageData") {
                pages[currentPage] = request.data;
            }
            return true;
        }

    )

    function getNextPage(page) {
        var url = $(page).closest('a').attr('href');
        chrome.runtime.sendMessage({action: 'goToPage', url: 'https://' + document.domain + url})
    }

    function initInfo() {
        var sHtml = '<div class="scrape-info" id="scrape-info">';
        sHtml += '<h1>Progress:</h1><br>';
        sHtml += '<p id="count">'+count+'</p>';
        sHtml += '</div>';
        $("body").append(sHtml);
    }

    function getPages(cssSelector) {
        var pages = {};
        $(cssSelector).each(function () {
            pages[$(this).text()] = [];
        });
        return pages;
    }

    function incrementCount() {
        var newCount = parseInt($('#count').text()) + 1;
        $('#count').remove();
        $("#scrape-info").append('<p id="count">'+newCount+'</p>');
    }

});

