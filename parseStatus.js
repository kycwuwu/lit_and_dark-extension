'use strict';

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

var mastodon = document.getElementById("mastodon");
console.log("[L&D] MASTODON:", mastodon);

if (mastodon) {
      console.log("[L&D] this page loaded");
      var feedMessages = mastodon.getElementsByTagName('article') || [];
      console.log("feed:", feedMessages);
      var requestList = parseMessages(feedMessages);
      console.log(requestList);

      // TODO: Make API call with requestList in JSON body

      // TODO: Take response and then toggle visibility of messages with bad content
} else {
    console.log("[L&D] no mastodon found");
}