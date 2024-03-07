document.querySelector("#search").addEventListener("click", () => {
  let query = document.querySelector("#searchT").value;
  //   document.querySelector("#loading").style.display = "block";
  getCountry(query);
});

document
  .getElementById("searchT")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("search").click();
    }
  });

function getCountry(query) {
  $.ajax({
    method: "GET",
    url: "https://api.api-ninjas.com/v1/nutrition?query=" + query,
    headers: { "X-Api-Key": "K/EWGzuNKY0CNdL9ZpLnqg==aGC2P1EOqR0WIwwS" },
    contentType: "application/json",
    success: function (result) {
      console.log(result);
      if (result.length == 0) {
        // document.querySelector("#loading").style.display = "none";
        console.log("arda");
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
        document.querySelector("#searchT").value = "";
      } else {
        console.log(result);
        console.log("selen");
        const data = result[0];
        renderCountry(data);
        console.log(result[0].calories);
      }
    },
    error: function ajaxError(jqXHR) {
      console.error("Error: ", jqXHR.responseText);
    },
  });
}

// // tablo olarak deneme
// function renderCountry(data) {
//   //   document.querySelector("#loading").style.display = "none";
//   const mealsEl = document.getElementById("tbody");
//   const mealEl = document.createElement("tr");
//   mealEl.innerHTML = `
//     <td id= "api-name">${data.name}</td>
//                       <td id="api-calories">${data.calories}</td>
//                       <td class ="size">${data.serving_size_g}</td>
//                       <td><input id='lineHours' onblur='lineTotal(this);'  name='hours[]'></td>
//                       <td class="kalori"><input  id='lineTotal' onblur='lineTotal(this);'  name='lineTotal[]'></td>
//                       <td><button class="btnDelete"type='button' id='remove_button' onclick='removeItem(this);'> <i class="fa-regular fa-trash-can"></i> </button></td>

//     `;
//   mealsEl.appendChild(mealEl);
//   document.querySelector("#searchT").value = "";
// }

// function removeItem(elem) {
//   let rowToDelete = elem.parentElement.parentElement;
//   let rowNumber = rowToDelete.getElementsByTagName("td")[0].innerText;
//   document.getElementById("tbody").deleteRow(rowNumber - 1);
//   let tblRows = document.getElementById("tbody").getElementsByTagName("tr");
//   calculateDueAmount();
// }
// function lineTotal(elem) {
//   var mainRow = elem.parentElement.parentElement;
//   var AmtPerHour = mainRow.getElementsByTagName("td")[1].textContent;
//   var lnHrs = mainRow
//     .getElementsByTagName("td")[3]
//     .getElementsByTagName("input")[0].value;
//   var total = mainRow
//     .getElementsByTagName("td")[4]
//     .getElementsByTagName("input")[0];

//   var myResult = (Number(AmtPerHour) / 100) * Number(lnHrs);
//   total.value = myResult.toFixed(2);
// }

// tablo olarak deneme
function renderCountry(data) {
  //   document.querySelector("#loading").style.display = "none";
  const mealsEl = document.getElementById("tbody");
  const mealEl = document.createElement("tr");
  mealEl.innerHTML = `
      <td id= "api-name">${data.name}</td>
                        <td class="hidden" id="api-calories">${data.calories}</td>     
                        <td><input id='lineHours' onblur='lineTotal(this);'  name='hours[]'></td>
                        <td class="kalori"><input  id='lineTotal' onblur='lineTotal(this);'  name='lineTotal[]'></td> 
                        <td><button class="btn btn-sm"type='button' id='remove_button' onclick='removeItem(this);'> <i class="fa-regular fa-trash-can"></i> </button></td>        

              
    
      `;
  mealsEl.appendChild(mealEl);
  document.querySelector("#searchT").value = "";
}

function removeItem(elem) {
  let rowToDelete = elem.parentElement.parentElement;
  let rowNumber = rowToDelete.getElementsByTagName("td")[0].innerText;
  document.getElementById("tbody").deleteRow(rowNumber - 1);
  let tblRows = document.getElementById("tbody").getElementsByTagName("tr");
}

function lineTotal(elem) {
  var mainRow = elem.parentElement.parentElement;
  var AmtPerHour = mainRow.getElementsByTagName("td")[1].textContent;
  var lnHrs = mainRow
    .getElementsByTagName("td")[2]
    .getElementsByTagName("input")[0].value;
  var total = mainRow
    .getElementsByTagName("td")[3]
    .getElementsByTagName("input")[0];

  var myResult = (Number(AmtPerHour) / 100) * Number(lnHrs);
  //   total.value = myResult.toFixed(2);
  total.value = Math.round(myResult);
}
