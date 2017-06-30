chrome.storage.sync.get(['status'], function (items) {
    if (items.status == 'Disabled') {
        chrome.browserAction.setIcon({ path: "icon_disabled.png" });
    } else {
        chrome.browserAction.setIcon({ path: "icon.png" });
    }
});