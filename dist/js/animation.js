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
