document.querySelectorAll<HTMLElement>('.social-link').forEach(item => {
  item.addEventListener('mouseenter', () => {
    const randX: number = Math.random() > 0.5 ? -1 : 1;
    const randY: number = Math.random() > 0.5 ? -1 : 1;
    const distance: number = 30;
    item.style.transform = `translate(${randX * distance}px, ${randY * distance}px)`;
  });

  item.addEventListener('mouseleave', (): void => {
    item.style.transform = `translate(0px, 0px)`;
  });
});