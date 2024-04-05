document.getElementById('toggle-theme').addEventListener('click', function() {
    document.body.classList.toggle("dark-theme");
    let theme = document.body.classList.contains("dark-theme") ? "dark" : "light";
    setCookie("theme", theme, 30);
});

function setCookie(cookieName, cookieValue, expiryDays) {
    var date = new Date();
    date.setTime(date.getTime() + (expiryDays*24*60*60*1000));
    document.cookie = `${cookieName}=${cookieValue}; expires=${date.toUTCString()}; path=/`;
}

function getCookie(cookieName) {
    var name = cookieName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

document.getElementById('discord-copy-trigger').addEventListener('click', function() {
    var text = document.getElementById('discord-id').dataset.tooltipText;
    var dummy = document.createElement('input'), textToCopy = text;
    document.body.appendChild(dummy);
    dummy.value = textToCopy;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
    alert("Скопировано: " + textToCopy);
});

window.addEventListener('load', function() {
    var theme = getCookie("theme");
    if(theme) {
        if(theme === "dark") document.body.classList.add("dark-theme");
        else document.body.classList.remove("dark-theme");
    }
});