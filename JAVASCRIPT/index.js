document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 1100, 
    once: false    
  });
});

const body = document.querySelector('body');
const nav = document.querySelector('nav');
const sideBar = document.querySelector('.sides-open-close');
const sideOpen = document.querySelector('.side-open');
const sideClose = document.querySelector('.side-close');

sideBar.addEventListener("click", () => {
  sideBar.classList.toggle("active");
});
sideOpen.addEventListener("click", () => {
  nav.classList.toggle("active");
});
sideClose.addEventListener("click", () => {
  nav.classList.remove("active");
});
