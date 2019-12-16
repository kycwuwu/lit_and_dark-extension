// Whenever a tab is updated, trigger our checking script
chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete' && tab.active) {
    chrome.extension.getBackgroundPage().chrome.tabs.executeScript(null, {
      file: 'parseStatus.js'
    });
  }
})