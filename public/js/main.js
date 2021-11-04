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
