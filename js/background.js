"use strict"

// Open extension
chrome.action.onClicked.addListener(async (tab) => {
    await chrome.sidePanel.open({ tabId: tab.id })
    chrome.tabs.reload(tab.id);
});

// Re-init when tab is activated (user switches tabs)
chrome.tabs.onActivated.addListener(async (activeInfo) => {
    const tab = await chrome.tabs.get(activeInfo.tabId);
    chrome.runtime.sendMessage({ 
        type: "init",
        log: 'tab-switch' 
    });
});

// Re-init when tab is updated (URL change, reload)
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete") {
        chrome.runtime.sendMessage({ 
            type: "init",
            log: 'tab-update'
        });
    }
});
