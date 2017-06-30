document.addEventListener('DOMContentLoaded', function () {
    var statusSpan = document.getElementById('status');
    var container = document.getElementById('switchState');

    document.querySelector('#config').addEventListener('click', function () {
        window.open(chrome.extension.getURL("options.html"));
    });

    document.querySelector('#about').addEventListener('click', function () {
        window.open("https://github.com/larx83/loggly-stacktrace-formatter");
    });

    document.querySelector('#feedback').addEventListener('click', function () {
        window.open("https://github.com/larx83/loggly-stacktrace-formatter/issues");
    });

    var disableButton = document.createElement('button');
    disableButton.appendChild(document.createTextNode('Disable'));
    disableButton.onclick = function () { toggle('Disable') };

    var enableButton = document.createElement('button');
    enableButton.appendChild(document.createTextNode('Enable'));
    enableButton.onclick = function () { toggle('Enable') };

    container.appendChild(disableButton);
    container.appendChild(enableButton);


    
    chrome.storage.sync.get(['status'], function (items) {
        var status = items.status;
        //alert(status);

        if (!status) {
            chrome.storage.sync.set({ 'status': 'Enabled' }, function () { });
            setUiEnabled();
        } else {
            if (status == 'Enabled') {
                setUiEnabled();
            } else {
                setUiDisabled();
            }
        }
    });
    
    
    function toggle(n) {
        if ((n == 'Enable') && (enableButton.parentNode == container)) {
            setUiEnabled();
            chrome.storage.sync.set({ 'status': 'Enabled' }, function () {});
        }
        else if ((n == 'Disable') && (disableButton.parentNode == container)) {
            setUiDisabled();
            chrome.storage.sync.set({ 'status': 'Disabled' }, function () {});
        }     
        else {
            return;
        }
    }

    function setUiDisabled() {
        statusSpan.style.color = 'red';
        statusSpan.innerHTML = "stacktrace formatter disabled";

        container.removeChild(disableButton);
        container.appendChild(enableButton);
        
        chrome.browserAction.setIcon({ path: "icon_disabled.png" });
    }

    function setUiEnabled() {
        statusSpan.style.color = 'green';
        statusSpan.innerHTML = "stacktrace formatter enabled";

        chrome.browserAction.setIcon({ path: "icon.png" });

        container.removeChild(enableButton);
        container.appendChild(disableButton);
    }
});