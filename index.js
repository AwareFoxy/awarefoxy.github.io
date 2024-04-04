const container = document.querySelector('.container');

container.addEventListener('mousemove', (e) => {
  const { offsetX, offsetY, target } = e;
  const { clientWidth, clientHeight } = target;
  
  const xPos = ((offsetX / clientWidth) - 0.5) * 10;
  const yPos = ((offsetY / clientHeight) - 0.5) * 10;

  target.style.transform = `rotateX(${-yPos}deg) rotateY(${xPos}deg)`;
});

container.addEventListener('mouseleave', () => {
  container.style.transform = 'rotateX(0) rotateY(0)';
});
