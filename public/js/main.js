// Handle show side menu
const toggleSideBar = document.getElementsByClassName('side-menu-toggle')[0];
const menuMobile = document.getElementsByClassName('mobile-nav')[0];
const blackDrop = document.getElementsByClassName('black-drop')[0];

toggleSideBar.addEventListener('click', function () {
    menuMobile.classList.toggle('open');
    blackDrop.classList.toggle('open');
});

blackDrop.addEventListener('click', function () {
    menuMobile.classList.toggle('open');
    blackDrop.classList.toggle('open');
});

// handle show form
const formStartWrapper = document.getElementsByClassName('form-start__wrapper')[0];
const formStart = document.getElementsByClassName('form-start')[0];

formStartWrapper.addEventListener('click', function () {
    console.log(this);
    formStartWrapper.classList.toggle('show-form');
});

formStart.addEventListener('click', function (e) {
    e.stopPropagation();
});
