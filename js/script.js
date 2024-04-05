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
    for(var i = 0; i < cookieArray.length; i++) {
        var c = cookieArray[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

document.getElementById('discord-copy-trigger').addEventListener('click', function() {
    var tooltipTextElement = document.getElementById('discord-id');
    var tooltipText = tooltipTextElement.getAttribute('data-tooltip-text');
    var dummy = document.createElement("input");
    document.body.appendChild(dummy);
    dummy.value = tooltipText;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    tooltipTextElement.textContent = 'Скопировано!';
    setTimeout(function() {
        tooltipTextElement.textContent = 'Копировать id';
    }, 2000);
});

window.matchMedia('(prefers-color-scheme: dark)').addListener(function(e) {
    if(e.matches) {
        document.body.classList.add("dark-theme");
        setCookie("theme", "dark", 30);
    } else {
        document.body.classList.remove("dark-theme");
        setCookie("theme", "light", 30);
    }
});

window.onload = function() {
    var userThemePreference = getCookie("theme");
    if(userThemePreference) {
        if(userThemePreference === "dark") {
            document.body.classList.add("dark-theme");
        } else if(userThemePreference === "light") {
            document.body.classList.remove("dark-theme");
        }
    } else if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add("dark-theme");
    }
};