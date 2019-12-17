'use strict';

var url = 'https://47edbf88.ngrok.io/analyze/'
//'https://6b5b79ba.ngrok.io/analyze/';
//'https://api.litndark.xyz/analyze/';

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
            //console.log(msgId, msgText);

            result.push({'id': msgId, 'content': msgText});
        }
    });

    return result;
}

function parseResponse(response) {
    console.log(response);
    if (response.ok) {
        var respText = response.body;
        console.log(respText);
        return respText;
    } else {
        return false;
        //return new Error(response.statusText);
    }
}

var mastodon = document.getElementById("mastodon");

if (mastodon) {
    console.log("[L&D] this page loaded");
    var feedMessages = mastodon.getElementsByTagName('article') || [];
    console.log("feed:", feedMessages);
    var requestList = parseMessages(feedMessages);
    //console.log(requestList);

    // TODO: Make API call with requestList in JSON body
    var urlList = requestList.map((request) => { 
        return { ...request, 'apiUrl': url + encodeURI(request.content) };
    });
    console.log('Req List with API URLS', urlList);

    //var promiseList = promiseList.map((request) => predictBullying(request));
    
    // TODO: Add visibility attribute to object based on API response
    // Reflect this visibility in DOM
    /*var promiseList = urlList.map(req => {
        return fetch(req.apiURL, {'mode': 'no-cors'})
            .then(parseResponse)
            .catch(console.log('ERROR'));
        }
    );*/
    //console.log("PROMISES:", promiseList);
    
    Promise.all(urlList.map(elem => {
        //console.log(elem);
        fetch(elem.apiUrl, {'method': 'GET',
                'headers': {
                    'Content-Type': 'application/text'
                },
            })
            .then((response) => {
                //console.log("resp", response);
                //var respText = parseResponse(elem, response);
                elem.malicious = parseResponse(response);
                console.log("elem", elem);
                //console.log("text:", respText);
                //JSONify response, augment urlList object based on ID match
                //Promise.resolve();
            })
            .catch(console.log('ERROR'));
        }
    )).then(() => {
        // Toggle visibility
        console.log('finished making requests');
    });

    /*requestList.forEach((request) => {
        predictBullying(request);
    });*/
} else {
    console.log("[L&D] no mastodon content found");
}