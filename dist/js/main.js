const slideContainer = document.querySelectorAll(".slideshow");

for (let i = 0; i < slideContainer.length; i++) {
  const slider = function () {
    const slides = slideContainer[i].querySelectorAll(".slide");
    let index = 0;
    let transitionDelay = 2000;
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
  };
  slider();
}
// header animation//
document.addEventListener("DOMContentLoaded", () => {
  const text = "Project Gallery";
  const header = document.getElementById("animated-header");
  let index = 0;
  console.log(header.textContent);

  function typeEffect() {
    if (index < text.length) {
      header.textContent += text[index];
      index++;
      setTimeout(typeEffect, 100); // Adjust typing speed (in milliseconds)
    }
  }
  typeEffect();
});

// document.addEventListener("DOMContentLoaded", function () {
//   const slides = document.querySelectorAll(".slider-slide");
//   const video = document.getElementById("video");
//   let currentIndex = 0;

//   // Show the first slide (video)
//   slides[currentIndex].classList.add("active");

//   // Function to move to the next slide
//   function nextSlide() {
//     // Remove the 'active' class from the current slide
//     slides[currentIndex].classList.remove("active");

//     // Increment the index (loop back if necessary)
//     currentIndex = (currentIndex + 1) % slides.length;

//     // Add the 'active' class to the next slide
//     slides[currentIndex].classList.add("active");
//   }

//   // Handle video end to trigger the next slide (image)
//   video.addEventListener("ended", function () {
//     nextSlide(); // Transition to the first image after video ends
//   });

//   // Once the page is loaded, wait for the video to finish before starting to show images
//   video.addEventListener("play", function () {
//     // Set a listener for when the video ends to show the next slide (image)
//     video.addEventListener("ended", function () {
//       nextSlide(); // Transition to the first image after video ends
//     });
//   });

//   // The images will transition every 5 seconds after the video ends
//   setInterval(() => {
//     if (currentIndex > 0) {
//       nextSlide();
//     }
//   }, 5000); // Adjust the interval for image transitions as needed
// });
document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".slider-slide");
  const video = document.getElementById("video");
  let currentIndex = 0;
  let totalSlides = slides.length;

  // Function to move to the next slide
  function nextSlide() {
    // Remove the 'active' class from the current slide
    slides[currentIndex].classList.remove("active");

    // Increment the index (loop back to the first slide if necessary)
    currentIndex = (currentIndex + 1) % totalSlides;

    // Add the 'active' class to the next slide
    slides[currentIndex].classList.add("active");
  }

  // Handle video end to trigger the next slide (image)
  video.addEventListener("ended", function () {
    nextSlide(); // Transition to the first image after the video ends
  });

  // Function to loop back to the video after the last image
  function resetToVideo() {
    // If we are at the last image (image3), reset to the first slide (video)
    if (currentIndex === totalSlides - 1) {
      currentIndex = 0;
      slides[currentIndex].classList.add("active");
    }
  }

  // Every 5 seconds, move to the next image slide after the video ends
  setInterval(() => {
    if (currentIndex > 0) {
      nextSlide(); // Transition to the next slide (image)
      resetToVideo(); // After the last image, loop back to the video
    }
  }, 5000); // Image transition interval

  // Initially, show the video
  slides[currentIndex].classList.add("active");
});

const videos = document.querySelectorAll(".video");

// Loop through each video and attach an event listener for the 'ended' event
videos.forEach((video) => {
  video.onended = () => {
    // Restart the video from the beginning
    video.currentTime = 0;
    video.play();
  };
});
