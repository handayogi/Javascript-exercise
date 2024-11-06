let menu = document.querySelector('#menu-icon');
let navList = document.querySelector('.nav-list');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navList.classList.toggle('open');
};

const sr = ScrollReveal ({
    distance: '100px',
    duration: 2000,
    delay: 300,
    reset: true
});

sr.reveal('.hero-text', {delay: 200, origin: 'top'});
sr.reveal('.hero-img', {delay: 250, origin: 'top'});
sr.reveal('.sosmed', {delay: 400, origin: 'left'});