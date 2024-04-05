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