document.querySelectorAll('.social-link').forEach(item => {
  item.addEventListener('mouseenter', (e) => {
    const randX = Math.random() > 0.5 ? -1 : 1;
    const randY = Math.random() > 0.5 ? -1 : 1;
    const distance = 100;
    const moveX = randX * distance;
    const moveY = randY * distance;
    item.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });
});