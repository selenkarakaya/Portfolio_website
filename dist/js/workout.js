// Add click event to add button

document.querySelector("#btnSearch").addEventListener("click", () => {
  let activity = document.querySelector("#txtSearch").value;
  if (activity === "") {
    alert("Please add a workout.");
  } else {
    document.querySelector("#loading").style.display = "block";
    getWorkout(activity);
  }
});
// Add click event when enter press
document
  .getElementById("txtSearch")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("btnSearch").click();
    }
  });

// GET API
function getWorkout(activity) {
  $.ajax({
    method: "GET",
    url: "https://api.api-ninjas.com/v1/caloriesburned?activity=" + activity,
    headers: { "X-Api-Key": "K/EWGzuNKY0CNdL9ZpLnqg==aGC2P1EOqR0WIwwS" },
    contentType: "application/json",
    success: function (result) {
      if (result.length == 0) {
        document.querySelector("#loading").style.display = "none";
        const html = `
              <div class="alert alert-success mt-2" role="alert">
              <h1> <i class="fa-solid fa-bolt"></i> 0 results found for ${activity}<h1>
              <hr>
              <p>We're sorry, your search for "${activity}" did not match any documents. 
              Here are some tips to help improve your search:</p>
              <ul>
              <li>Make sure you've spelled the search term correctly.</li>
              <li>Don't search for measurements or serving sizes.</li>
              <li>Try using different words that mean the same thing.</li>
              </ul>
              </div>`;
        setTimeout(function () {
          document.querySelector("#errors").innerHTML = "";
        }, 5000);
        document.querySelector("#errors").innerHTML = html;
        document.querySelector("#txtSearch").value = "";
      } else {
        document.querySelector("#loading").style.display = "none";
        for (let data of result) {
          //   console.log(data);
          let div = document.createElement("div");
          div.classList.add("div", "d-flex", "flex-column");
          div.innerHTML = `
            <div class="btn-group-vertical" role="group" aria-label="Vertical button group" >
                <button type="button" class="btn">${data.name}</button>
            </div>`;
          document.getElementById("all").appendChild(div);
          workout(data);
        }
      }
    },
    error: function ajaxError(jqXHR) {
      console.error("Error: ", jqXHR.responseText);
    },
  });
}
// Select workout button and add click event on it
function workout(data) {
  const Buttons = document.querySelectorAll(".div");
  for (let button of Buttons) {
    button.addEventListener("click", (e) => {
      if (e.target.textContent === data.name) {
        renderWorkout(data);
      }
    });
  }
}

// Add selected workout inside table
function renderWorkout(data) {
  document.querySelector("#all").innerHTML = "";
  document.querySelector("#loading").style.display = "none";
  const mealsEl = document.getElementById("tbody");
  const mealEl = document.createElement("tr");
  mealEl.innerHTML = `
      <td>${data.name}</td>
                        <td >${data.duration_minutes}</td>
                        <td class ="size">${data.total_calories}</td> 
                        <td><input id='lineHours' onblur='lineTotal(this);'  name='hours[]'></td>
                        <td class="kalori"><input  id='lineTotal' onblur='lineTotal(this);'  name='lineTotal[]'></td>  
                        <td><button class="btnDelete" type='button' id='remove_button' onclick='removeItem(this);'> <i class="fa-regular fa-trash-can"></i> </button></td>`;
  mealsEl.appendChild(mealEl);
  document.querySelector("#txtSearch").value = "";
}

// Calculate total calories for all workouts
function calculateDueAmount() {
  document.querySelector(".totalW").style.opacity = 1;
  var tblRows = document.getElementById("tbody").getElementsByTagName("tr");
  let total = 0;
  for (var i = 0; i < tblRows.length; i++) {
    // console.log(tblRows[i]);
    let lineTotal = tblRows[i]
      .getElementsByTagName("td")[4]
      .getElementsByTagName("input")[0].value;
    // console.log(lineTotal);
    total += Number(lineTotal);
  }
  let result = (document.getElementById("total").innerText = total.toFixed(2));
  console.log(result);
}
// Remove item and
function removeItem(e) {
  let rowToDelete = e.parentElement.parentElement;
  let rowNumber = rowToDelete.getElementsByTagName("td")[0].innerText;
  document.getElementById("tbody").deleteRow(rowNumber - 1);
  let tblRows = document.getElementById("tbody").getElementsByTagName("tr");
  calculateDueAmount(); // calculate due amount since row got deleted.
}

// Calculate total calories for each workouts
function lineTotal(e) {
  let mainRow = e.parentElement.parentElement;
  let calories = mainRow.getElementsByTagName("td")[2].textContent;
  let lnHrs = mainRow
    .getElementsByTagName("td")[3]
    .getElementsByTagName("input")[0].value;
  let total = mainRow
    .getElementsByTagName("td")[4]
    .getElementsByTagName("input")[0];
  // console.log(total);
  let myResult = (Number(calories) / 60) * Number(lnHrs);
  total.value = myResult.toFixed(2);
  // console.log(total.value);
  calculateDueAmount();
}

// if you want to see total calorie after click the button
// first addEventListernet, second: delete calculateDueAmount(); from function lineTotal(elem)
// document.querySelector("#btn").addEventListener("click", calculateDueAmount);
