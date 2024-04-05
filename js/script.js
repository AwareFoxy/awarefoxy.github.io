document.getElementById('toggle-theme').addEventListener('click', function() {
    document.body.classList.toggle("dark-theme");
    let theme = "light";
    if (document.body.classList.contains("dark-theme")) {
        theme = "dark";
    }
    setCookie("theme", theme, 30);
});

function setCookie(cookieName, cookieValue, expiryDays) {
    var date = new Date();
    date.setTime(date.getTime() + (expiryDays*24*60*60*1000));
    var expires = "expires="+ date.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}

function getCookie(cookieName) {
    var name = cookieName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieArray = decodedCookie.split(';');
    for(var i = 0; i <cookieArray.length; i++) {
        var c = cookieArray[i].trim();
        if (c.indexOf(name) == 0) {
            return c.substring(name.length);
        }
    }
    return "";
}

document.getElementById('discord-copy-trigger').addEventListener('mouseover', function() {
    var tooltip = document.getElementById('discord-id');
    tooltip.addEventListener('click', function() {
        var dummy = document.createElement("input");
        document.body.appendChild(dummy);
        dummy.value = tooltip.getAttribute('data-tooltip-text');
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
        tooltip.textContent = 'Скопировано!';
    });
});

window.onload = function() {
    if (getCookie("theme") === "dark") {
        document.body.classList.add("dark-theme");
    }
};