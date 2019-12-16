
/*const filters = {
  urls: [
    "https://93b9bddc.ngrok.io/*",
    "http://93b9bddc.ngrok.io/*"
  ]
};*/

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete' && tab.active) {
    console.log("pls");
    console.log(tab);
    chrome.extension.getBackgroundPage().chrome.tabs.executeScript(null, {
      file: 'parseStatus.js'
    });
    console.log("executed script");
  }
})

/*chrome.webRequest.onResponseStarted.addListener((details) => {
  console.log("is this what we really want");
  console.log("loaded", details.statusCode);
}, filters);

chrome.webRequest.onCompleted.addListener((details) => {
  console.log("COMPLETED is this what we really want");
  console.log("loaded", details.statusCode);
}, filters);*/