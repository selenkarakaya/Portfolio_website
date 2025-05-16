// Navigation bar display
const list = document.querySelectorAll(".list");
function activeLink() {
  list.forEach((item) => item.classList.remove("active"));
  this.classList.add("active");
}
list.forEach((item) => item.addEventListener("click", activeLink));

// header animation
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

// Loop through each video and attach an event listener for the 'ended' event
const videos = document.querySelectorAll(".video");
videos.forEach((video) => {
  video.onended = () => {
    // Restart the video from the beginning
    video.currentTime = 0;
    video.play();
  };
});

//scroll animation on about page

const boxes = document.querySelectorAll(".box");
window.addEventListener("scroll", displayBoxes);

//if you don't call function, it doesn't show it until a user scrolls
displayBoxes();

function displayBoxes() {
  // When scroll down, where do they start to come in?
  const startPoint = (window.innerHeight / 5) * 4;

  boxes.forEach((box) => {
    //  returns the position and size of the element (box) relative to the viewport
    const boxTop = box.getBoundingClientRect().top;

    if (boxTop < startPoint) {
      box.classList.add("show");
    } else {
      box.classList.remove("show");
    }
  });
}
