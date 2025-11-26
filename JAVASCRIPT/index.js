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


//slider situation 

const slider = document.getElementById("slider");
const slides = slider.children;
const totalSlides = slides.length;

let index = 0;

// Position slides side-by-side
for (let i = 0; i < totalSlides; i++) {
  slides[i].style.minWidth = "100%";
}

// Move slider to new index
function updateSlider() {
  slider.style.transform = `translateX(-${index * 100}%)`;
  slider.style.transition = "0.6s ease-in-out";
}

// Next slide
function nextSlide() {
  index++;
  if (index >= totalSlides) index = 0;
  updateSlider();
}

// Previous slide
function prevSlide() {
  index--;
  if (index < 0) index = totalSlides - 1;
  updateSlider();
}

// Auto-slide every 5 seconds
let autoSlide = setInterval(nextSlide, 5000);

// When clicking next/prev, reset timer
function resetTimer() {
  clearInterval(autoSlide);
  autoSlide = setInterval(nextSlide, 5000);
}

// Button event listeners
document.getElementById("next").addEventListener("click", () => {
  nextSlide();
  resetTimer();
});

document.getElementById("prev").addEventListener("click", () => {
  prevSlide();
  resetTimer();
});


//Touch support for slider

let startX = 0;
let isDown = false;

// For touchscreen + mouse
const sliderContainer = document.querySelector(".test-container");

// When dragging starts
sliderContainer.addEventListener("mousedown", (e) => {
  isDown = true;
  startX = e.clientX;
  sliderContainer.style.cursor = "grabbing";
});

sliderContainer.addEventListener("touchstart", (e) => {
  isDown = true;
  startX = e.touches[0].clientX;
});

// When dragging ends
function endDrag() {
  isDown = false;
  sliderContainer.style.cursor = "grab";
}
sliderContainer.addEventListener("mouseup", endDrag);
sliderContainer.addEventListener("mouseleave", endDrag);
sliderContainer.addEventListener("touchend", endDrag);

// While dragging
sliderContainer.addEventListener("mousemove", (e) => {
  if (!isDown) return;

  let move = e.clientX - startX;

  if (move > 60) {        
    prevSlide();
    resetTimer();
    isDown = false;
  } else if (move < -60) { 
    nextSlide();
    resetTimer();
    isDown = false;
  }
});

sliderContainer.addEventListener("touchmove", (e) => {
  if (!isDown) return;

  let move = e.touches[0].clientX - startX;

  if (move > 60) {
    prevSlide();
    resetTimer();
    isDown = false;
  } else if (move < -60) {
    nextSlide();
    resetTimer();
    isDown = false;
  }
});

// Slider indicators
const indicatorContainer = document.querySelector(".test-indicators");


for (let i = 0; i < totalSlides; i++) {
  const dot = document.createElement("div");
  dot.classList.add("dot");
  
  // dot click event
  dot.addEventListener("click", () => {
    index = i;
    updateSlider();
    updateDots();
    resetTimer();
  });

  indicatorContainer.appendChild(dot);
}
function updateDots() {
  const dots = document.querySelectorAll(".test-indicators .dot");
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}
updateDots();
function updateSlider() {
  slider.style.transform = `translateX(-${index * 100}%)`;
  slider.style.transition = "0.6s ease-in-out";
  updateDots();   
}
