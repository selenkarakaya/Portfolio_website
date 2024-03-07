class CalorieTracker {
  constructor() {
    this._calorieLimit = Storage.getCalorieLimit();
    this._totalCalories = Storage.getTotalCalories(0);
    this._meals = Storage.getMeals();
    this._workouts = Storage.getWorkouts();

    this._displayCaloriesLimit();
    // this._displayCaloriesTotal();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    this._displayCaloriesProgress();

    document.getElementById("limit").value = this._calorieLimit;
  }

  // Public Methods/API //

  addMeal(meal) {
    this._meals.push(meal);
    this._totalCalories += meal.calories;
    Storage.updateTotalCalories(this._totalCalories);
    Storage.saveMeal(meal);
    this._displayNewMeal(meal);
    this._render();
  }

  addWorkout(workout) {
    this._workouts.push(workout);
    this._totalCalories -= workout.calories;
    Storage.updateTotalCalories(this._totalCalories);
    Storage.saveWorkout(workout);
    this._displayNewWorkout(workout);
    this._render();
  }

  removeMeal(id) {
    const index = this._meals.findIndex((meal) => meal.id === id);

    if (index !== -1) {
      const meal = this._meals[index];
      this._totalCalories -= meal.calories;
      Storage.updateTotalCalories(this._totalCalories);
      this._meals.splice(index, 1);
      Storage.removeMeal(id);
      this._render();
    }
  }

  removeWorkout(id) {
    const index = this._workouts.findIndex((workout) => workout.id === id);

    if (index !== -1) {
      const workout = this._workouts[index];
      this._totalCalories += workout.calories;
      Storage.updateTotalCalories(this._totalCalories);
      this._workouts.splice(index, 1);
      Storage.removeWorkout(id);
      this._render();
    }
  }

  reset() {
    this._totalCalories = 0;
    this._meals = [];
    this._workouts = [];
    Storage.clearAll();
    this._render();
  }

  setLimit(calorieLimit) {
    this._calorieLimit = calorieLimit;
    Storage.setCalorieLimit(calorieLimit);
    this._displayCaloriesLimit();
    this._render();
  }

  loadItems() {
    this._meals.forEach((meal) => this._displayNewMeal(meal));
    this._workouts.forEach((workout) => this._displayNewWorkout(workout));
  }

  // Private Methods //

  // _displayCaloriesTotal() {
  //   const totalCaloriesEl = document.getElementById("calories-total");
  //   totalCaloriesEl.innerHTML = this._totalCalories;
  // }

  _displayCaloriesLimit() {
    const calorieLimitEl = document.getElementById("calories-limit");
    calorieLimitEl.innerHTML = this._calorieLimit;
  }

  _displayCaloriesConsumed() {
    const caloriesConsumedEl = document.getElementById("calories-consumed");

    const consumed = this._meals.reduce(
      (total, meal) => total + meal.calories,
      0
    );

    caloriesConsumedEl.innerHTML = consumed;
  }

  _displayCaloriesBurned() {
    const caloriesBurnedEl = document.getElementById("calories-burned");

    const burned = this._workouts.reduce(
      (total, workout) => total + workout.calories,
      0
    );

    caloriesBurnedEl.innerHTML = burned;
  }

  _displayCaloriesRemaining() {
    const caloriesRemainingEl = document.getElementById("calories-remaining");
    const progressEl = document.getElementById("calorie-progress");

    const remaining = this._calorieLimit - this._totalCalories;

    caloriesRemainingEl.innerHTML = remaining;

    if (remaining < 0) {
      caloriesRemainingEl.parentElement.parentElement.classList.remove(
        "bg-light"
      );
      caloriesRemainingEl.parentElement.parentElement.classList.add(
        "bg-danger"
      );
      progressEl.classList.remove("bg-success");
      progressEl.classList.add("bg-danger");
    } else if (remaining == 0) {
      caloriesRemainingEl.parentElement.parentElement.classList.remove(
        "bg-light"
      );
      caloriesRemainingEl.parentElement.parentElement.classList.add(
        "bg-success"
      );
    } else {
      caloriesRemainingEl.parentElement.parentElement.classList.remove(
        "bg-danger"
      );
      caloriesRemainingEl.parentElement.parentElement.classList.add("bg-light");
      // progressEl.classList.remove("bg-danger");
      // progressEl.classList.add("bg-success");
    }
  }

  _displayCaloriesProgress() {
    const progressEl = document.getElementById("calorie-progress");
    const percentage = (this._totalCalories / this._calorieLimit) * 100;
    const width = Math.min(percentage, 100);
    const maxWidth = Math.max(percentage);
    progressEl.style.width = `${width}%`;
    // console.log(maxWidth);
    if (maxWidth < 95) {
      progressEl.classList.add("progress-bar");
    } else if (95 < maxWidth < 101) {
      progressEl.classList.remove("progress-bar");
      progressEl.classList.add("bg-success");
    }
  }

  _displayNewMeal(meal) {
    const mealsEl = document.getElementById("meal-items");
    const mealEl = document.createElement("div");
    mealEl.classList.add("item", "my-2");
    mealEl.setAttribute("data-id", meal.id);
    mealEl.innerHTML = `
    <div class="card-body">
    <div class="d-flex align-items-center justify-content-between">
      <h4 class="mx-1">${meal.name}</h4>
      <div
        class="btnCalories text-center rounded-2 px-2 px-sm-3 fs-4"
      >
        ${meal.calories}
      </div>
      <button class="delete btn btn-sm mx-2">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
  </div>
    `;

    mealsEl.appendChild(mealEl);
    mealsEl.style.border = "1px solid #b7c9f2";
  }

  _displayNewWorkout(workout) {
    const workoutsEl = document.getElementById("workout-items");
    const workoutEl = document.createElement("div");
    workoutEl.classList.add("item", "my-2");
    workoutEl.setAttribute("data-id", workout.id);
    workoutEl.innerHTML = `
    <div class="card-body">
    <div class="d-flex align-items-center justify-content-between">
      <h4 class="mx-1">${workout.name}</h4>
      <div
        class=" bg-secondary text-white text-center rounded-2 px-2 px-sm-3 fs-4"
      >
        ${workout.calories}
      </div>
      <button class="delete btn btn-sm mx-2">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
  </div>
    `;

    workoutsEl.appendChild(workoutEl);
    workoutsEl.style.border = "1px solid #b7c9f2";
  }

  _render() {
    // this._displayCaloriesTotal();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    this._displayCaloriesProgress();
  }
}

class Meal {
  constructor(name, calories) {
    const firstLetter = name.charAt(0);
    const firstLetterCap = firstLetter.toUpperCase();
    const remainingLetters = name.slice(1);
    const capitalizedWord = firstLetterCap + remainingLetters;
    // console.log(capitalizedWord);
    this.id = Math.random().toString(16).slice(2);
    this.name = capitalizedWord;
    this.calories = calories;
  }
}

class Workout {
  constructor(name, calories) {
    const firstLetter = name.charAt(0);
    const firstLetterCap = firstLetter.toUpperCase();
    const remainingLetters = name.slice(1);
    const capitalizedWord = firstLetterCap + remainingLetters;
    // console.log(capitalizedWord);
    this.id = Math.random().toString(16).slice(2);
    this.name = capitalizedWord;
    this.calories = calories;
  }
}

class Storage {
  static getCalorieLimit(defaultLimit = 2000) {
    let calorieLimit;
    if (localStorage.getItem("calorieLimit") === null) {
      calorieLimit = defaultLimit;
    } else {
      calorieLimit = +localStorage.getItem("calorieLimit");
    }
    return calorieLimit;
  }

  static setCalorieLimit(calorieLimit) {
    localStorage.setItem("calorieLimit", calorieLimit);
  }

  static getTotalCalories(defaultCalories = 0) {
    let totalCalories;
    if (localStorage.getItem("totalCalories") === null) {
      totalCalories = defaultCalories;
    } else {
      totalCalories = +localStorage.getItem("totalCalories");
    }
    return totalCalories;
  }

  static updateTotalCalories(calories) {
    localStorage.setItem("totalCalories", calories);
  }

  static getMeals() {
    let meals;
    if (localStorage.getItem("meals") === null) {
      meals = [];
    } else {
      meals = JSON.parse(localStorage.getItem("meals"));
    }
    return meals;
  }

  static saveMeal(meal) {
    const meals = Storage.getMeals();
    meals.push(meal);
    localStorage.setItem("meals", JSON.stringify(meals));
  }

  static removeMeal(id) {
    const meals = Storage.getMeals();
    meals.forEach((meal, index) => {
      if (meal.id === id) {
        meals.splice(index, 1);
      }
    });

    localStorage.setItem("meals", JSON.stringify(meals));
  }

  static getWorkouts() {
    let workouts;
    if (localStorage.getItem("workouts") === null) {
      workouts = [];
    } else {
      workouts = JSON.parse(localStorage.getItem("workouts"));
    }
    return workouts;
  }

  static saveWorkout(workout) {
    const workouts = Storage.getWorkouts();
    workouts.push(workout);
    localStorage.setItem("workouts", JSON.stringify(workouts));
  }

  static removeWorkout(id) {
    const workouts = Storage.getWorkouts();
    workouts.forEach((workout, index) => {
      if (workout.id === id) {
        workouts.splice(index, 1);
      }
    });

    localStorage.setItem("workouts", JSON.stringify(workouts));
  }

  static clearAll() {
    localStorage.removeItem("totalCalories");
    localStorage.removeItem("meals");
    localStorage.removeItem("workouts");

    // If you want to clear the limit
    // localStorage.clear();
  }
}

class App {
  constructor() {
    this._tracker = new CalorieTracker();
    this._loadEventListeners();
    this._tracker.loadItems();
  }

  _loadEventListeners() {
    document
      .getElementById("meal-form")
      .addEventListener("submit", this._newItem.bind(this, "meal"));
    document
      .getElementById("addApi")
      .addEventListener("click", this._newItem.bind(this, "api"));

    document
      .getElementById("workout-form")
      .addEventListener("submit", this._newItem.bind(this, "workout"));

    document
      .getElementById("meal-items")
      .addEventListener("click", this._removeItem.bind(this, "meal"));

    document
      .getElementById("workout-items")
      .addEventListener("click", this._removeItem.bind(this, "workout"));

    document
      .getElementById("filter-meals")
      .addEventListener("keyup", this._filterItems.bind(this, "meal"));

    document
      .getElementById("filter-workouts")
      .addEventListener("keyup", this._filterItems.bind(this, "workout"));

    document
      .getElementById("reset")
      .addEventListener("click", this._reset.bind(this));

    document
      .getElementById("limit-form")
      .addEventListener("submit", this._setLimit.bind(this));
  }

  _newItem(type, e) {
    e.preventDefault();

    const name = document.getElementById(`${type}-name`);
    const calories = document.getElementById(`${type}-calories`);
    const name2 = document.getElementById("api-name");
    const calories2 = document.getElementById("lineTotal");

    // Validate inputs
    if (type === "meal" || type === "workout") {
      if (name.value === "" || calories.value === "") {
        const html = `Please fill in all fields`;
        document.getElementById("msg3").innerHTML = html;
        document.getElementById("msg3").classList.add("alert", "alert-warning");
        setTimeout(() => {
          document.getElementById("msg3").innerHTML = "";
          document
            .getElementById("msg3")
            .classList.remove("alert", "alert-warning");
        }, 1000);

        name.value = "";
        calories.value = "";
        return;
      }
    }

    if (type === "meal") {
      const meal = new Meal(name.value, +calories.value);
      this._tracker.addMeal(meal);
    }
    if (type === "api") {
      const meal = new Meal(name2.textContent, +calories2.value);
      this._tracker.addMeal(meal);
    }
    if (type === "workout") {
      const workout = new Workout(name.value, +calories.value);
      this._tracker.addWorkout(workout);
    }
    document.getElementById("tbody").innerHTML = "";

    name.value = "";
    calories.value = "";
    if (type === "meal" || type === "workout") {
      const collapseItem = document.getElementById(`collapse-${type}`);
      const bsCollapse = new bootstrap.Collapse(collapseItem, {
        toggle: true,
      });
    }
  }

  _removeItem(type, e) {
    if (
      e.target.classList.contains("delete") ||
      e.target.classList.contains("fa-xmark")
    ) {
      const id = e.target.closest(".item").getAttribute("data-id");

      type === "meal"
        ? this._tracker.removeMeal(id)
        : this._tracker.removeWorkout(id);

      e.target.closest(".item").remove();
      location.reload();
    }
  }

  _filterItems(type, e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll(`#${type}-items .card`).forEach((item) => {
      const name = item.firstElementChild.firstElementChild.textContent;

      if (name.toLowerCase().indexOf(text) !== -1) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  }

  _reset() {
    this._tracker.reset();
    document.getElementById("meal-items").innerHTML = "";
    document.getElementById("workout-items").innerHTML = "";
    document.getElementById("filter-meals").value = "";
    document.getElementById("filter-meals").value = "";
  }

  _setLimit(e) {
    e.preventDefault();

    const limit = document.getElementById("limit");

    if (limit.value === "") {
      alert("Please add a limit");
      return;
    }

    this._tracker.setLimit(+limit.value);
    limit.value = "";

    const modalEl = document.getElementById("limit-modal");
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();
  }
}

const app = new App();

document.getElementById("bmr").addEventListener("click", setBmr);

function setBmr(e) {
  e.preventDefault();

  let gender = document.getElementById("gender");
  const age = document.getElementById("age");
  const height = document.getElementById("height");
  const weight = document.getElementById("weight");
  const walking = document.getElementById("walking");
  const cardio = document.getElementById("cardio");

  let bmr =
    10 * +weight.value +
    6.25 * +height.value -
    5 * +age.value +
    (gender.value === "male" ? 5 : -161);
  bmr += (+walking.value * 60 * ((0.03 * +weight.value * 1) / 0.45)) / 7;
  bmr += (+cardio.value * 60 * ((0.07 * +weight.value * 1) / 0.45)) / 7;

  const bmi = (
    +weight.value /
    ((+height.value * +height.value) / 10000)
  ).toFixed(2);

  const bmiText = document.createElement("p");
  bmiText.innerHTML = `${bmi}`;
  document.querySelector(".bmi").appendChild(bmiText);

  const bmrText = document.createElement("p");
  bmrText.innerHTML = `${Math.round(bmr)} cal/day`;
  document.querySelector(".bmr").appendChild(bmrText);

  let rate = Number(220 - age.value);
  let lowRate = Math.round(rate * 0.6);
  let highRate = Math.round(rate * 0.7);

  const rateText = document.createElement("p");
  rateText.innerHTML = ` Minimum heart rate: ${lowRate} 
  Maximum heart rate: ${highRate}`;
  document.querySelector(".rate").appendChild(rateText);

  if (
    gender.value === "" ||
    age.value === "" ||
    height.value === "" ||
    weight.value === "" ||
    walking.value === "" ||
    cardio.value === ""
  ) {
    let html = `Please add a value `;
    document.querySelector("#msg").innerHTML = html;
    document.querySelector("#msg").classList.add("msg");
    setTimeout(function () {
      document.querySelector("#msg").innerHTML = "";
    }, 2000);
    return;
  }

  var targetGainWeight = Math.round(bmr + 300);
  var targetMaintain = Math.round(bmr);
  var targetLoseWeight = Math.round(bmr - 500);

  $("#calc-target-gain span").html(targetGainWeight + " calories");
  $("#calc-target-maintain span").html(targetMaintain + " calories");
  $("#calc-target-lose span").html(targetLoseWeight + " calories");

  gender.value = "";
  age.value = "";
  height.value = "";
  weight.value = "";
  walking.value = "";
  cardio.value = "";
  let html = `Let's see your result `;
  document.querySelector("#msg").innerHTML = html;
  document.querySelector("#msg").classList.add("msg");
  setTimeout(function () {
    document.querySelector("#msg").innerHTML = "";
  }, 2000);
}

document.querySelector(".addButton").addEventListener("click", msg);
function msg() {
  const html = `If you know your meals of calorie, you can add manually`;
  document.getElementById("msg1").innerHTML = html;
  const html2 = `If you don't know your meals/food of calorie, you can search them`;
  document.getElementById("msg2").innerHTML = html2;
  setTimeout(() => {
    document.getElementById("msg1").innerHTML = "";
    document.getElementById("msg2").innerHTML = "";
  }, 5000);
}

// gain/loss kapattim: acmak istersen this._displayCaloriesTotal(); yorum satirinda cikarmayi unutma//
// kod suan calisiyor eger calismazsa this._displayCaloriesTotal(); / calories-total kisimlarini konrol et
