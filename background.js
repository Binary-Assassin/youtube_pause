chrome.tabs.onActivated.addListener(({ tabId }) => {
  chrome.tabs.get(tabId, (tab) => {
    if (tab.url && tab.url.includes("youtube.com/watch")) {
      chrome.tabs.sendMessage(tabId, { action: "resume" });
    }
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.url && tab.url.includes("youtube.com/watch") && changeInfo.status === "complete") {
    chrome.tabs.sendMessage(tabId, { action: "resume" });
  }
});

chrome.tabs.onRemoved.addListener((tabId) => {
  chrome.tabs.sendMessage(tabId, { action: "pause" });
});

chrome.tabs.onHighlighted.addListener(({ tabIds }) => {
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      if (!tabIds.includes(tab.id) && tab.url.includes("youtube.com/watch")) {
        chrome.tabs.sendMessage(tab.id, { action: "pause" });
      }
    });
  });
});
