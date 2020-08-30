$(document).ready(function() {
    var currentPage = "";
    var pages;
    chrome.runtime.onMessage.addListener(
        function(request) {
            $('#scrape-info').remove();
            if(request.message === "start" ) {
                pages = getPages('.font-semibold.mb-1.text-primary span');
                initInfo();
                var i = 0;
                $.each(pages, function(key){
                    setTimeout(function(){
                        getNextPage('span:contains('+key+')');
                        currentPage = key;
                        initInfo();
                        updatePages(pages);
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
        sHtml += '<h1>Scrape-info</h1>';
        sHtml += '<div id="scrape-data"></div></div>';
        $("body").append(sHtml);
    }

    function getPages(cssSelector) {
        var pages = {};
        $(cssSelector).each(function () {
            pages[$(this).text()] = [];
        });
        return pages;
    }

    function updatePages(data) {
        $('#scrape-data').empty();
        var sHtml = '';
        $.each(data, function(name, values) {
            sHtml += '<div id="page"><p>'+name+'</p><br>';
            $.each(values, function(i, value) {
                sHtml += '<p>'+value+'</p><br>'
            })
            sHtml += '</div>';
        });
        $("#scrape-data").append(sHtml);
    }

});

