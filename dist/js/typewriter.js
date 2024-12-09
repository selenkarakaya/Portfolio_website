class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = "";
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    // Current index of word
    const current = this.wordIndex % this.words.length;
    // Get full text of current word
    const fullTxt = this.words[current];

    // Check if deleting
    if (this.isDeleting) {
      // Remove char
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      // Add char
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    // Initial Type Speed
    let typeSpeed = 300;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    // If word is complete
    if (!this.isDeleting && this.txt === fullTxt) {
      // Make pause at end
      typeSpeed = this.wait;
      // Set delete to true
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      // Move to next word
      this.wordIndex++;
      // Pause before start typing
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// Init On DOM Load
document.addEventListener("DOMContentLoaded", init);

// Init App
function init() {
  const txtElement = document.querySelector(".txt-type");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-wait");
  // Init TypeWriter
  new TypeWriter(txtElement, words, wait);
}

// set index and transition delay
let index = 0;
let transitionDelay = 2000;

// get div containing the slides
let slideContainer = document.querySelector(".slideshow");
// get the slides
let slides = slideContainer.querySelectorAll(".slide");

// set transition delay for slides
for (let slide of slides) {
  slide.style.transition = `all ${transitionDelay / 1000}s linear`;
}

// show the first slide
showSlide(index);

// show a specific slide
function showSlide(slideNumber) {
  slides.forEach((slide, i) => {
    slide.style.display = i == slideNumber ? "block" : "none";
  });
  // next index
  index++;
  // go back to 0 if at the end of slides
  if (index >= slides.length) {
    index = 0;
  }
}

// transition to next slide every x seconds
setInterval(() => showSlide(index), transitionDelay);
