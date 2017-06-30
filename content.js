chrome.extension.sendMessage({}, function (response) {

    var removedlinesArray = [
        'HandleNonSuccessAndDebuggerNotification',
        'ThrowForNonSuccess',
        'where exception was thrown'
    ];

    var coloredlinesArray = [
        "blue;at System."
    ];

    var tc = {
        settings: {
            rl: removedlinesArray,
            cl: coloredlinesArray
        }
    };

    chrome.storage.sync.get(['status'], function (items) {
        //console.log('status: ' + items.status);
        if (items.status == 'Disabled') {
            return;
        } else {
            getSettingsAndStart();
        }
    });

    function getSettingsAndStart() {
        //console.log('get settings and start');
        chrome.storage.sync.get(['removedlines', 'coloredlines'], function (items) {
            console.log('removedlines: ' + items.removedlines);
            console.log('coloredlines: ' + items.coloredlines);
            if (items.removedlines) {
                tc.settings.rl = String(items.removedlines).split('\n').filter(Boolean);
                tc.settings.cl = String(items.coloredlines).split('\n').filter(Boolean);
            }
            initializeWhenReady(document);
        });
    }

    function initializeWhenReady(document) {

        var readyStateCheckInterval = setInterval(function () {
            if (document && document.readyState === 'complete') {
                clearInterval(readyStateCheckInterval);
                initializeNow(document);
            }
        }, 10);
    }

    Array.prototype.clean = function (deleteValue) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == deleteValue) {
                this.splice(i, 1);
                i--;
            }
        }
        return this;
    };

    function initializeNow(document) {
        if (document === window.document) {

            setInterval(function () {

                var allLines = $(".newline-wrapper .newline");

            	allLines.map(function() {
            	    var domElement = this;

            	    if (!$(domElement).is(":visible")) {
	                    return;
	                }

            	    var removedLines = tc.settings.rl;
                    
	                for (var i = 0; i < removedLines.length; i++) {
	                    var line = removedLines[i];
	                        if (domElement.innerHTML.indexOf(line) !== -1) {
	                            domElement.remove();
	                        }
	                }


	                var coloredLines = tc.settings.cl;

	                for (var i = 0; i < coloredLines.length; i++) {
	                    var line = coloredLines[i];
	                    var color = line.split(';')[0];
	                    var string = line.split(';').slice(1).join(';');

	                    if (string == '') {
	                        continue;
	                    }

	                    if (domElement.innerHTML.indexOf(string) !== -1) {
	                        $(this).css('color', color);
	                    }
	                }


            		//if(this.innerHTML.indexOf(s4) !== -1){
            		//	$(this).css('color', 'rgb(228, 7, 7)');
            		//}

            	}).get();

            }, 1000);
        }


    }


});

