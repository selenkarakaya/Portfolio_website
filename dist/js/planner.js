class MonthlyPlanner {
  constructor() {
    this._days = Storage.getDays();
    this._movies = Storage.getMovies();
    this._books = Storage.getBooks();
    this._places = Storage.getPlaces();
    this._goals = Storage.getGoals();
  }

  loadItems() {
    this._days.forEach((day) => this._displayNewDay(day));
    this._movies.forEach((movie) => this._displayNewMovie(movie));
    this._books.forEach((book) => this._displayNewBook(book));
    this._places.forEach((place) => this._displayNewPlace(place));
    this._goals.forEach((goal) => this._displayNewGoal(goal));
  }

  addDay(day) {
    this._days.push(day);
    Storage.saveDay(day);
    this._displayNewDay(day);
  }

  addMovie(movie) {
    this._movies.push(movie);
    Storage.saveMovie(movie);
    this._displayNewMovie(movie);
  }

  addBook(book) {
    this._books.push(book);
    Storage.saveBook(book);
    this._displayNewBook(book);
  }
  addPlace(place) {
    this._places.push(place);
    Storage.savePlace(place);
    this._displayNewPlace(place);
  }

  addGoal(goal) {
    this._goals.push(goal);
    Storage.saveGoal(goal);
    this._displayNewGoal(goal);
  }

  removeDay(id) {
    this._days.forEach((day, index) => {
      if (day.id === id) {
        this._days.splice(index, 1);
      }
    });

    Storage.removeDay(id); // Add this line
  }

  removeMovie(id) {
    this._movies.forEach((movie, index) => {
      if (movie.id === id) {
        this._movies.splice(index, 1);
      }
    });

    Storage.removeMovie(id); // Add this line
  }
  removeBook(id) {
    this._books.forEach((book, index) => {
      if (book.id === id) {
        this._books.splice(index, 1);
      }
    });
    Storage.removeBook(id); // Add this line
  }
  removePlace(id) {
    this._places.forEach((place, index) => {
      if (place.id === id) {
        this._places.splice(index, 1);
      }
    });
    Storage.removePlace(id); // Add this line
  }

  removeGoal(id) {
    this._goals.forEach((goal, index) => {
      if (goal.id === id) {
        this._goals.splice(index, 1);
      }
    });
    Storage.removeGoal(id); // Add this line
  }

  reset() {
    this._days = [];
    this._movies = [];
    this._books = [];
    this._placess = [];
    this._goals = [];
    Storage.clearAll();
  }

  _displayNewDay(day) {
    const daysEl = document.getElementById("day-items");
    const dayEl = document.createElement("div");
    dayEl.classList.add("card", "my-2");
    dayEl.setAttribute("data-id", day.id);
    dayEl.innerHTML = `
    <div class="card-body">
      <div class="d-flex">
        <h4 class="mx-1">${day.name}</h4>
        <button class="delete btn btn-danger btn-sm mx-2">
          <i class="fa-solid fa-xmark"></i>
        </button>
    </div>
  </div>
    `;
    daysEl.appendChild(dayEl);
  }

  _displayNewMovie(movie) {
    const moviesEl = document.getElementById("movie-items");
    const movieEl = document.createElement("div");
    movieEl.classList.add("card", "my-2");
    movieEl.setAttribute("data-id", movie.id);
    movieEl.innerHTML = `
    <div class="card-body">
      <div class="d-flex align-items-center justify-content-between">
        <h4 class="mx-1">${movie.name}</h4>

        <button class="delete btn btn-danger btn-sm mx-2">
          <i class="fa-solid fa-xmark"></i>
        </button>
    </div>
  </div>
    `;
    moviesEl.appendChild(movieEl);
  }

  _displayNewBook(book) {
    const booksEl = document.getElementById("book-items");
    const bookEl = document.createElement("div");
    bookEl.classList.add("card", "my-2");
    bookEl.setAttribute("data-id", book.id);
    bookEl.innerHTML = `
    <div class="card-body">
      <div class="d-flex align-items-center justify-content-between">
        <h4 class="mx-1">${book.name}</h4>
        <button class="delete btn btn-danger btn-sm mx-2">
          <i class="fa-solid fa-xmark"></i>
        </button>
    </div>
  </div>
    `;
    booksEl.appendChild(bookEl);
  }

  _displayNewPlace(place) {
    const placesEl = document.getElementById("place-items");
    const placeEl = document.createElement("div");
    placeEl.classList.add("card", "my-2");
    placeEl.setAttribute("data-id", place.id);
    placeEl.innerHTML = `
    <div class="card-body">
      <div class="d-flex align-items-center justify-content-between">
        <h4 class="mx-1">${place.name}</h4>
        <button class="delete btn btn-danger btn-sm mx-2">
          <i class="fa-solid fa-xmark"></i>
        </button>
    </div>
  </div>
    `;
    placesEl.appendChild(placeEl);
  }

  _displayNewGoal(goal) {
    const goalsEl = document.getElementById("goal-items");
    const goalEl = document.createElement("div");
    goalEl.classList.add("card");
    goalEl.setAttribute("data-id", goal.id);
    goalEl.innerHTML = `
    <div>
      <div class="d-flex border-bottom" id="table">
        <input  type="checkbox" id="${goal.id}" class="checkbox">
        <label for="${goal.id}"><h4 class="mx-1 check">${goal.name}</h4></label><br>
        <button class="delete btn btn-danger btn-sm mx-2">
          <i class="fa-solid fa-xmark"></i>
        </button>
    </div>
  </div>
    `;
    goalsEl.appendChild(goalEl);
  }
}

class Day {
  constructor(name) {
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
  }
}

class Movie {
  constructor(name) {
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
  }
}

class Book {
  constructor(name) {
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
  }
}
class Place {
  constructor(name) {
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
  }
}
class Goal {
  constructor(name) {
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
  }
}

class Storage {
  static getDays() {
    let days;
    if (localStorage.getItem("days") === null) {
      days = [];
    } else {
      days = JSON.parse(localStorage.getItem("days"));
    }
    return days;
  }

  static saveDay(day) {
    const days = Storage.getDays();
    days.push(day);
    localStorage.setItem("days", JSON.stringify(days));
  }

  static removeDay(id) {
    const days = Storage.getDays();
    days.forEach((day, index) => {
      if (day.id === id) {
        days.splice(index, 1);
      }
    });
    localStorage.setItem("days", JSON.stringify(days));
  }

  static getMovies() {
    let movies;
    if (localStorage.getItem("movies") === null) {
      movies = [];
    } else {
      movies = JSON.parse(localStorage.getItem("movies"));
    }
    return movies;
  }

  static saveMovie(movie) {
    const movies = Storage.getMovies();
    movies.push(movie);
    localStorage.setItem("movies", JSON.stringify(movies));
  }

  static removeMovie(id) {
    const movies = Storage.getMovies();
    movies.forEach((movie, index) => {
      if (movie.id === id) {
        movies.splice(index, 1);
      }
    });
    localStorage.setItem("movies", JSON.stringify(movies));
  }

  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }

  static saveBook(book) {
    const books = Storage.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(id) {
    const books = Storage.getBooks();
    books.forEach((book, index) => {
      if (book.id === id) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  }

  static getPlaces() {
    let places;
    if (localStorage.getItem("places") === null) {
      places = [];
    } else {
      places = JSON.parse(localStorage.getItem("places"));
    }
    return places;
  }

  static savePlace(place) {
    const places = Storage.getPlaces();
    places.push(place);
    localStorage.setItem("places", JSON.stringify(places));
  }
  static removePlace(id) {
    const places = Storage.getPlaces();
    places.forEach((place, index) => {
      if (place.id === id) {
        places.splice(index, 1);
      }
    });
    localStorage.setItem("places", JSON.stringify(places));
  }
  static getGoals() {
    let goals;
    if (localStorage.getItem("goals") === null) {
      goals = [];
    } else {
      goals = JSON.parse(localStorage.getItem("goals"));
    }
    return goals;
  }

  static saveGoal(goal) {
    const goals = Storage.getGoals();
    goals.push(goal);
    localStorage.setItem("goals", JSON.stringify(goals));
  }

  static removeGoal(id) {
    const goals = Storage.getGoals();
    goals.forEach((goal, index) => {
      if (goal.id === id) {
        goals.splice(index, 1);
      }
    });
    localStorage.setItem("goals", JSON.stringify(goals));
  }

  static clearAll() {
    localStorage.clear();
  }
}

class App {
  constructor() {
    this._tracker = new MonthlyPlanner();
    this._loadEventListeners();
    this._tracker.loadItems();
  }
  _loadEventListeners() {
    document
      .getElementById("day-form")
      .addEventListener("submit", this._newItem.bind(this, "meal"));

    document
      .getElementById("movie-form")
      .addEventListener("submit", this._newItem.bind(this, "workout"));

    document
      .getElementById("books-form")
      .addEventListener("submit", this._newItem.bind(this, "book"));

    document
      .getElementById("places-form")
      .addEventListener("submit", this._newItem.bind(this, "place"));
    document
      .getElementById("goals-form")
      .addEventListener("submit", this._newItem.bind(this, "goal"));

    document
      .getElementById("day-items")
      .addEventListener("click", this._removeItem.bind(this, "meal"));

    document
      .getElementById("movie-items")
      .addEventListener("click", this._removeItem.bind(this, "workout"));

    document
      .getElementById("book-items")
      .addEventListener("click", this._removeItem.bind(this, "book"));

    document
      .getElementById("place-items")
      .addEventListener("click", this._removeItem.bind(this, "place"));
    document
      .getElementById("goal-items")
      .addEventListener("click", this._removeItem.bind(this, "goal"));

    document
      .getElementById("reset")
      .addEventListener("click", this._reset.bind(this));
  }

  _newItem(type, e) {
    e.preventDefault();
    const name = document.getElementById(`${type}-name`);

    if (name.value === "") {
      const alert = `
      <h3> Please fill in all fields </h3>     
    `;
      setTimeout(function () {
        document.querySelector(".errors").innerHTML = "";
      }, 2000);
      document.querySelector(".errors").innerHTML = alert;
      return;
    }

    if (type === "meal") {
      const day = new Day(name.value);
      this._tracker.addDay(day);
    }
    if (type === "workout") {
      const movie = new Movie(name.value);
      this._tracker.addMovie(movie);
    }
    if (type === "book") {
      const book = new Book(name.value);
      this._tracker.addBook(book);
      console.log("book");
    }
    if (type === "place") {
      const place = new Place(name.value);
      this._tracker.addPlace(place);
      console.log("place");
    }
    if (type === "goal") {
      const goal = new Goal(name.value);
      this._tracker.addGoal(goal);
      console.log("goal");
    }

    name.value = "";

    const collapseItem = document.getElementById(`collapse-${type}`);
    const bsCollapse = new bootstrap.Collapse(collapseItem, {
      toggle: true,
    });
  }

  _removeItem(type, e) {
    if (
      e.target.classList.contains("delete") ||
      e.target.classList.contains("fa-xmark")
    ) {
      const id = e.target.closest(".card").getAttribute("data-id");
      if (type === "meal") {
        this._tracker.removeDay(id);
        const item = e.target.closest(".card");
        item.remove();
      }
      if (type === "workout") {
        this._tracker.removeMovie(id);
        const item = e.target.closest(".card");
        item.remove();
      }
      if (type === "book") {
        this._tracker.removeBook(id);
        const item = e.target.closest(".card");
        item.remove();
      }
      if (type === "place") {
        this._tracker.removePlace(id);
        const item = e.target.closest(".card");
        item.remove();
      }
      if (type === "goal") {
        this._tracker.removeGoal(id);
        const item = e.target.closest(".card");
        item.remove();
      }
    }
  }

  _reset() {
    if (confirm("Are you sure you want to reset everything?")) {
      this._tracker.reset();
      document.getElementById("day-items").innerHTML = "";
      document.getElementById("movie-items").innerHTML = "";
      document.getElementById("book-items").innerHTML = "";
      document.getElementById("place-items").innerHTML = "";
      document.getElementById("goal-items").innerHTML = "";
      location.reload();
    }
  }
}

const app = new App();

// ADD CHANGECOLOR() CLICK FUNCTION IN THE COLOR PLATTE ICON//
document.querySelector(".d").addEventListener("click", function (e) {
  console.log(e);
  e.preventDefault();
  document.getElementById("colorID").click();
  console.log(document.getElementById("colorID"));
});

document.querySelector(".m").addEventListener("click", function (e) {
  e.preventDefault();
  document.getElementById("colorID2").click();
});
document.querySelector(".b").addEventListener("click", function (e) {
  e.preventDefault();
  document.getElementById("colorID3").click();
});
document.querySelector(".p").addEventListener("click", function (e) {
  e.preventDefault();
  document.getElementById("colorID4").click();
});
document.querySelector(".g").addEventListener("click", function (e) {
  e.preventDefault();
  document.getElementById("colorID5").click();
});

// ON INPUT, GET VALUE AND SAVE IT AS "storedValue" //
// color selection for day
function changeColor() {
  var userColor = document.getElementById("colorID").value;
  localStorage.setItem(
    "storedValue",
    (document.getElementById("days").style.backgroundColor = userColor)
  );
}
if (localStorage.storedValue) {
  document.getElementById("colorID").value = localStorage.storedValue;
  document.getElementById("days").style.backgroundColor =
    localStorage.storedValue;
}

// color selection for movie
function changeColor2() {
  var userColor = document.getElementById("colorID2").value;
  localStorage.setItem(
    "storedValue2",
    (document.getElementById("movies").style.backgroundColor = userColor)
  );
}
if (localStorage.storedValue2) {
  document.getElementById("colorID2").value = localStorage.storedValue2;
  document.getElementById("movies").style.backgroundColor =
    localStorage.storedValue2;
}

// color selection for book
function changeColor3() {
  var userColor = document.getElementById("colorID3").value;
  localStorage.setItem(
    "storedValue3",
    (document.getElementById("books").style.backgroundColor = userColor)
  );
}
if (localStorage.storedValue3) {
  document.getElementById("colorID3").value = localStorage.storedValue3;
  document.getElementById("books").style.backgroundColor =
    localStorage.storedValue3;
}

// color selection for place
function changeColor4() {
  var userColor = document.getElementById("colorID4").value;
  localStorage.setItem(
    "storedValue4",
    (document.getElementById("places").style.backgroundColor = userColor)
  );
}
if (localStorage.storedValue4) {
  document.getElementById("colorID4").value = localStorage.storedValue4;
  document.getElementById("places").style.backgroundColor =
    localStorage.storedValue4;
}

// color selection for goals
function changeColor5() {
  var userColor = document.getElementById("colorID5").value;
  localStorage.setItem(
    "storedValue5",
    (document.getElementById("goals").style.backgroundColor = userColor)
  );
}
if (localStorage.storedValue5) {
  document.getElementById("colorID5").value = localStorage.storedValue5;
  document.getElementById("goals").style.backgroundColor =
    localStorage.storedValue5;
}

//  Check goal and line-through;
$(function () {
  $("#table input[type='checkbox']").change(function () {
    localStorage[$(this).attr("id")] = this.checked;
    location.reload();
  });
  $("#table input[type='checkbox']").each(function () {
    var val = localStorage[$(this).attr("id")];
    var isChecked = val !== undefined ? val == "true" : false;
    $(this).prop("checked", isChecked);
    if (val == "true") {
      $(this).parent().parent().css("text-decoration", "line-through");
    } else {
      $(this).parent().parent().css("text-decoration", "none");
    }
  });
});

// Information about color selection //
document.querySelector(".choose").addEventListener("click", color);
function color(e) {
  e.preventDefault();
  const html = `
      <h1> You can organise color of  your planner </h1>
      <a href="https://colorhunt.co/" target= "blank">Color Hunt</a>
      <a href="https://www.w3schools.com/colors/colors_picker.asp" target= "blank">Color Picker</a>
    `;
  setTimeout(function () {
    document.querySelector(".errors").innerHTML = "";
  }, 5000);
  document.querySelector(".errors").innerHTML = html;
}
