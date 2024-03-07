// register

document.getElementById("create").addEventListener("click", control);
function control() {
  let firstName = document.querySelector("#firstName").value;
  let lastName = document.querySelector("#lastName").value;
  let email = document.querySelector("#email").value;
  let password = document.querySelector("#password").value;
  let confirmPassword = document.querySelector("#confirmPassword").value;
  if (
    firstName != "" &&
    lastName != "" &&
    email != "" &&
    password != "" &&
    confirmPassword != "" &&
    password === confirmPassword
  ) {
    let html = `You have been registered`;
    document.querySelector("#msg").innerHTML = html;
    document.querySelector("#msg").classList.add("msg");
    setTimeout(function () {
      document.querySelector("#msg").innerHTML = "";
      document.querySelector("#msg").classList.remove("msg");
    }, 2000);
  } else if (password != confirmPassword) {
    let html = `Do not match passwords`;
    document.querySelector("#msg").innerHTML = html;
    document.querySelector("#msg").classList.add("msg");
    setTimeout(function () {
      document.querySelector("#msg").innerHTML = "";
      document.querySelector("#msg").classList.remove("msg");
    }, 2000);
  } else {
    let html = `Please fill the blank`;
    document.querySelector("#msg").innerHTML = html;
    document.querySelector("#msg").classList.add("msg");
    setTimeout(function () {
      document.querySelector("#msg").innerHTML = "";
      document.querySelector("#msg").classList.remove("msg");
    }, 2000);
  }
}

// save localStorage
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("create").addEventListener("click", addUser);
});

let users = [];
const addUser = (e) => {
  e.preventDefault(); //to stop the form submitting
  // create user object
  let user = {
    name: document.querySelector("#firstName").value,
    title: document.querySelector("#email").value,
    password: document.querySelector("#password").value,
  };

  users.push(user);
  //saving to localStorage
  localStorage.setItem("MyUsersList", JSON.stringify(users));

  //empty inputs after register and save localStorage
  document.querySelector("#firstName").value = "";
  document.querySelector("#lastName").value = "";
  document.querySelector("#email").value = "";
  document.querySelector("#password").value = "";
  document.querySelector("#confirmPassword").value = "";
};

// set time out
