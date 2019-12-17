'use strict';

var url = 'https://api.litndark.xyz/analyze/';

function parseMessages(feed) {
    var result = [];

    Array.from(feed).forEach((msg) => {
        //console.log(msg);
        var msgId = msg.getAttribute('data-id');
        //console.log('id:', msgId);
        var contentWrapper = msg.getElementsByClassName('status__content__text');
        //console.log('contentWrapper', contentWrapper);

        if (Array.from(contentWrapper).length > 0) {
            var msgWrapper = contentWrapper[0].getElementsByTagName('p')[0];
            //console.log('msgWrapper:', msgWrapper);
            var msgText = msgWrapper.innerHTML;
            console.log(msgId, msgText);

            result.push({'id': msgId, 'content': msgText});
        }
    });

    return result;
}

function parseResponse(response) {
    if (response.ok) {
        return response.text();
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

async function predictBullying(request) {
    try {
        console.log(request);
        const response = await fetch(url + request.content, {
            'mode': 'no-cors',
            'headers': {
                'Access-Control-Allow-Origin': 'https://api.litndark.xyz/analyze/*'
            }
        });
        const json = await response.text();
        console.log('Success:', JSON.stringify(json));
    } catch (error) {
        console.error('Error:', error);
    }
}

var mastodon = document.getElementById("mastodon");

if (mastodon) {
    console.log("[L&D] this page loaded");
    var feedMessages = mastodon.getElementsByTagName('article') || [];
    console.log("feed:", feedMessages);
    var requestList = parseMessages(feedMessages);
    console.log(requestList);

    // TODO: Make API call with requestList in JSON body
    var urlList = requestList.map((request) => { 
        return { ...request, 'apiUrl': url + encodeURI(request.content) };
    });
    console.log('Req List with API URLS', urlList);

    //var promiseList = promiseList.map((request) => predictBullying(request));
    
    // TODO: Add visibility attribute to object based on API response
    // Reflect this visibility in DOM
    Promise.all(urlList.map(req => {
        fetch(req.apiURL, {'mode': 'no-cors'})
            .then(parseResponse)
            .catch(console.log('ERROR'));
        }
    )).then(() => {
        // Toggle visibility
        console.log('success');
    });

    /*requestList.forEach((request) => {
        predictBullying(request);
    });*/
} else {
    console.log("[L&D] no mastodon content found");
}