var tcDefaults = {
    removedlines:
        "HandleNonSuccessAndDebuggerNotification" + "\n" +
        "ThrowForNonSuccess" + "\n" +
        "where exception was thrown" +  "\n"
    ,
    coloredlines: 
        "blue;at System."
};

// Saves options to chrome.storage
function save_options() {

    var removedlines = document.getElementById('removedlines').value;
    var coloredlines = document.getElementById('coloredlines').value;

    chrome.storage.sync.set({
        removedlines: removedlines,
        coloredlines: coloredlines
}, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved';
    setTimeout(function() {
      status.textContent = '';
    }, 1000);
  });
}

// Restores options from chrome.storage
function restore_options() {
  chrome.storage.sync.get(tcDefaults, function(storage) {
      document.getElementById('removedlines').value = storage.removedlines;
      document.getElementById('coloredlines').value = storage.coloredlines;
  });
}

function restore_defaults() {
  chrome.storage.sync.set(tcDefaults, function() {
    restore_options();
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Default options restored';
    setTimeout(function() {
      status.textContent = '';
    }, 1000);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  restore_options();

  document.getElementById('save').addEventListener('click', save_options);
  document.getElementById('restore').addEventListener('click', restore_defaults);


  //  var area = document.getElementById("coloredlines");
  //  area.addEventListener('input', function () {
  //      console.log(area.value);
  //}, false);

});

function validTextColour(stringToTest) {
    if (stringToTest === "") { return false; }
    if (stringToTest === "inherit") { return false; }
    if (stringToTest === "transparent") { return false; }

    var image = document.createElement("img");
    image.style.color = "rgb(0, 0, 0)";
    image.style.color = stringToTest;
    if (image.style.color !== "rgb(0, 0, 0)") { return true; }
    image.style.color = "rgb(255, 255, 255)";
    image.style.color = stringToTest;
    return image.style.color !== "rgb(255, 255, 255)";
}


