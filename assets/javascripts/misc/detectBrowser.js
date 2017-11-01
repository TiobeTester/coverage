function detectBrowser() {
    var chrome = window.navigator.userAgent.indexOf('Chrome');
    var firefox = window.navigator.userAgent.indexOf('Firefox');

    if (firefox !== -1 || chrome !== -1) {
        return false;
    } else {
        document.getElementById('detect-browser').style.display = 'block';
    }
}

detectBrowser();
