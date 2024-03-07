function addRecommendation(e) {
  // Get the message of the new recommendation
  let recommendation = document.getElementById("new_recommendation");
  let name = document.getElementById("nameComment");
  // If the user has left a recommendation, display a pop-up
  if (recommendation.value != null && recommendation.value.trim() != "") {
    console.log("New recommendation added");
    showPopup(true);

    // Create a new 'recommendation' element and set it's value to the user's message
    var element = document.createElement("div");
    element.setAttribute("class", "col-sm-4");
    // element.classList.add("yorum");
    element.innerHTML = `<div class="card">
    <div class="card-body">
      <p class="card-text">
      ${recommendation.value}
      </p>
      <h5 class="card-title">${name.value}</h5>
    </div>
  </div>`;
    // Add this element to the end of the list of recommendations
    document.getElementById("new-comment").appendChild(element);

    // Reset the value of the textarea
    recommendation.value = "";
    const collapseItem = document.getElementById("collapse-form");
    const bsCollapse = new bootstrap.Collapse(collapseItem, {
      toggle: true,
    });
  }
}

function showPopup(bool) {
  if (bool) {
    document.getElementById("popup").style.visibility = "visible";
  } else {
    document.getElementById("popup").style.visibility = "hidden";
  }
}
