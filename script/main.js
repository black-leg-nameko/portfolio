const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('show');
});


document.addEventListener('click', (event) => {
    const isClickInsideMenu = mobileMenu.contains(event.target);
    const isClickOnHamburger = hamburger.contains(event.target);

    if(!isClickInsideMenu && !isClickOnHamburger) {
        mobileMenu.classList.remove("show");
    }
});
