const CookieManager = {
    setCookie: (cookieName, cookieValue, expiryDays) => {
        const date = new Date();
        date.setTime(date.getTime() + (expiryDays * 24 * 60 * 60 * 1000));
        document.cookie = `${cookieName}=${cookieValue}; expires=${date.toUTCString()}; path=/`;
    },

    getCookie: (cookieName) => {
        const name = `${cookieName}=`;
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i].trim();
            if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
        }
        return "";
    }
};

const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
};

const switchTheme = () => {
    const currentTheme = CookieManager.getCookie('theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    CookieManager.setCookie('theme', newTheme, 365);
};

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = CookieManager.getCookie('theme') || 'light';
    applyTheme(savedTheme);

    const themeToggleButton = document.getElementById('themeToggleButton');
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', switchTheme);
    }

    const discordCopyTrigger = document.getElementById('discord-copy-trigger');
    if (discordCopyTrigger) {
        discordCopyTrigger.addEventListener('click', () => {
            const text = document.getElementById('discord-id').dataset.tooltipText;
            const dummy = document.createElement('input');
            document.body.appendChild(dummy);
            dummy.value = text;
            dummy.select();
            document.execCommand('copy');
            document.body.removeChild(dummy);
            alert(`Скопировано: ${text}`);
        });
    }
});