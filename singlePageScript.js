setTimeout(function(){
    var tempData = [];

    $('.text-grey-darkest.text-2xl.font-light.mb-2').each(function () {
        tempData.push($(this).text());
    });
    var data = {'Sociaal bereik': tempData[0], 'Vrouw': tempData[1], 'Leeftijd': tempData[2]};

    data['Engagement Rate'] = $('#profile-engagement-rate > h2').text();
    tempData = [];
    var children = document.querySelectorAll(".md\\:w-2\\/3 > div:not(:first-child)");
    var div_array = [...children]; // converts NodeList to Array
    div_array.forEach(child => {
        var grandChildren = $(child).children();
        for (var i = 0, len = grandChildren.length; i < len; i++) {
            var socialData = {};
            $(grandChildren[i]).find('.stats-block').each(function() {
                socialData[$(this).find('small').text()] = $(this).find('h2').text();
            });
            data[$(grandChildren[i]).find('h4').find('a').text()] = socialData;
        }
    });
    // var data = {};
    // var priceContent = $('.ratecard');
    // var mediaAndPrice = $(priceContent).find('span');
    // data[$(mediaAndPrice[0]).text()] = $(mediaAndPrice[1]).text();
    // console.log(data);
    chrome.runtime.sendMessage({action: "parseData", data: data});
}, 5000);

