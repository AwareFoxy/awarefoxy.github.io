document.addEventListener("DOMContentLoaded", function(){
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => document.getElementById('ip').textContent = data.ip)
        .catch(() => document.getElementById('ip').textContent = 'Ошибка загрузки');
});