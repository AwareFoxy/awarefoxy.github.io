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
document.querySelectorAll('.social-link').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'scale(1.05)';
        item.style.boxShadow = '0px 8px 24px rgba(0, 0, 0, 0.5)';
    });

    item.addEventListener('mouseleave', () => {
        item.style.transform = 'scale(1)';
        item.style.boxShadow = 'none';
    });

    item.addEventListener('touchstart', () => {
        item.style.transform = 'scale(1.05)';
        item.style.boxShadow = '0px 8px 24px rgba(0, 0, 0, 0.5)';
    }, {passive: true});

    item.addEventListener('touchend', () => {
        item.style.transform = 'scale(1)';
        item.style.boxShadow = 'none';
    });
});