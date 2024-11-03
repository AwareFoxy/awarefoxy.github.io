const CookieManager = {
    setCookie: (name, value, days) => {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
    },

    getCookie: (name) => {
        const cookies = document.cookie.split(';');
        for (const cookie of cookies) {
            const [key, value] = cookie.trim().split('=');
            if (key === name) return value;
        }
        return "";
    }
};

const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    const themeToggleButton = document.getElementById('themeToggleButton');
    themeToggleButton.textContent = theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
};

const switchTheme = () => {
    const currentTheme = CookieManager.getCookie('theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    CookieManager.setCookie('theme', newTheme, 365);
};

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = CookieManager.getCookie('theme') || 'light';
    applyTheme(savedTheme);

    document.getElementById('themeToggleButton').addEventListener('click', switchTheme);

    document.getElementById('discord-copy-trigger').addEventListener('click', () => {
        const discordId = document.getElementById('discord-id').dataset.tooltipText;
        navigator.clipboard.writeText(discordId).then(() => {
            alert(`Скопировано: ${discordId}`);
        }).catch(() => {
            alert("Не удалось скопировать.");
        });
    });
});
