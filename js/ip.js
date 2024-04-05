document.addEventListener("DOMContentLoaded", () => {
    fetch('https://api.ipify.org?format=json')
        .then((response) => response.json())
        .then((data) => document.querySelector('#ip').innerText = data.ip)
        .catch(() => document.querySelector('#ip').innerText = 'Ошибка загрузки');
});