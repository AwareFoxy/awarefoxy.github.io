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

window.onload = function() {
    if (getCookie("theme") === "dark") {
        document.body.classList.add("dark-theme");
    }
};

particlesJS('particles-js', {
    particles: {
        number: {
            value: 150,
        },
        color: {
            value: "#ffffff"
        },
        shape: {
            type: "circle"
        },
        opacity: {
            value: 0.5,
        },
        size: {
            value: 3,
            random: true
        },
        line_linked: {
            enable: true,
            distance: 150
        },
        move: {
            enable: true,
            speed: 6
        }
    },
    interactivity: {
        events: {
            onhover: {
                enable: true,
                mode: "repulse"
            },
            onclick: {
                enable: true,
                mode: "push"
            }
        }
    },
    retina_detect: true
});