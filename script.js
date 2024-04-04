document.querySelectorAll('.social-link').forEach(item => {
  item.addEventListener('mouseenter', () => {
    const randX = Math.random() > 0.5 ? -1 : 1;
    const randY = Math.random() > 0.5 ? -1 : 1;
    const distance = 30;
    item.style.transform = `translate(${randX * distance}px, ${randY * distance}px)`;
  });

  item.addEventListener('mouseleave', () => {
    item.style.transform = `translate(0px, 0px)`;
  });
});

document.addEventListener('DOMContentLoaded', function() {
  var discordLink = document.getElementById('discord');

  discordLink.addEventListener('click', function(e) {
    e.preventDefault(); // попа
    navigator.clipboard.writeText(discordLink.href).then(function() {
      console.log('скапиравана');
    }).catch(function(error) {
      console.error('не скапиравана патаму чта: ', error);
    });
  });
});