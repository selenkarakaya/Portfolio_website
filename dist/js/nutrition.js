document.querySelector("#btnSearch").addEventListener("click", () => {
  let query = document.querySelector("#txtSearch").value;
  document.querySelector("#loading").style.display = "block";
  getFood(query);
});

document
  .getElementById("txtSearch")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("btnSearch").click();
    }
  });

function getFood(query) {
  $.ajax({
    method: "GET",
    url: "https://api.api-ninjas.com/v1/nutrition?query=" + query,
    headers: { "X-Api-Key": "K/EWGzuNKY0CNdL9ZpLnqg==aGC2P1EOqR0WIwwS" },
    contentType: "application/json",
    success: function (result) {
      if (result.length == 0) {
        document.querySelector("#loading").style.display = "none";
        const html = `
        <div class="alert alert-success mt-2" role="alert">
        <h1> <i class="fa-solid fa-bolt"></i> 0 results found for ${query}<h1>
        <hr>
        <p>We're sorry, your search for "${query}" did not match any documents. 
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
        const data = result[0];
        renderFood(data);
        // console.log(result[0].calories);
      }
    },
    error: function ajaxError(jqXHR) {
      console.error("Error: ", jqXHR.responseText);
    },
  });
}

// tablo olarak deneme
function renderFood(data) {
  const name = data.name;
  const firstLetter = name.charAt(0);
  const firstLetterCap = firstLetter.toUpperCase();
  const remainingLetters = name.slice(1);
  const capitalizedName = firstLetterCap + remainingLetters;
  document.querySelector("#loading").style.display = "none";
  const mealsEl = document.getElementById("tbody");
  const mealEl = document.createElement("tr");
  mealEl.innerHTML = `
  <td>${capitalizedName}</td>
                    <td >${data.calories}</td>
                    <td class ="size">${data.serving_size_g}</td>
                    <td><input id='lineHours' onblur='lineTotal(this);'  name='hours[]'></td>
                    <td class="kalori"><input  id='lineTotal' onblur='lineTotal(this);'  name='lineTotal[]'></td>  
                    <td><button class="btnDelete"type='button' id='remove_button' onclick='removeItem(this);'> <i class="fa-regular fa-trash-can"></i> </button></td>        

  `;
  mealsEl.appendChild(mealEl);
  document.querySelector("#txtSearch").value = "";
}

function calculateDueAmount() {
  var tblRows = document.getElementById("tbody").getElementsByTagName("tr");
  let total = 0;
  for (var i = 0; i < tblRows.length; i++) {
    // console.log(tblRows[i]);
    let lineTotal = tblRows[i]
      .getElementsByTagName("td")[4]
      .getElementsByTagName("input")[0].value;
    total += Number(lineTotal);
  }
  document.getElementById("total").style.opacity = 1;
  document.getElementById("totalHeader").style.opacity = 1;
  let result = (document.getElementById("total").innerText = total.toFixed(2));
  console.log(result);
}

function removeItem(e) {
  let rowToDelete = e.parentElement.parentElement;
  let rowNumber = rowToDelete.getElementsByTagName("td")[0].innerText;
  document.getElementById("tbody").deleteRow(rowNumber - 1);
  let tblRows = document.getElementById("tbody").getElementsByTagName("tr");
  calculateDueAmount(); // calculate due amount since row got deleted.
}
function lineTotal(e) {
  let mainRow = e.parentElement.parentElement;
  let AmtPerHour = mainRow.getElementsByTagName("td")[1].textContent;
  let lnHrs = mainRow
    .getElementsByTagName("td")[3]
    .getElementsByTagName("input")[0].value;
  let total = mainRow
    .getElementsByTagName("td")[4]
    .getElementsByTagName("input")[0];
  let myResult = (Number(AmtPerHour) / 100) * Number(lnHrs);
  total.value = myResult.toFixed(2);

  // calculateDueAmount();
}

document.querySelector("#btn").addEventListener("click", calculateDueAmount);
