//check log in

document.getElementById("login").addEventListener("click", loginUser);
function loginUser() {
  const loginEmail = document.querySelector("#email").value;
  const loginPass = document.querySelector("#password").value;
  if (localStorage.getItem("MyUsersList")) {
    const allStoredUsers = JSON.parse(localStorage.getItem("MyUsersList"));
    const matchedUser = allStoredUsers.filter((user) => {
      return loginEmail === user.title && loginPass === user.password;
    });
    if (matchedUser.length) {
      console.log(matchedUser[0].name);
      let html = `Login successful`;
      document.querySelector("#msg").innerHTML = html;
      document.querySelector("#msg").classList.add("msg");
      setTimeout(function () {
        document.querySelector("#msg").innerHTML = "";
        document.querySelector("#msg").classList.remove("msg");
      }, 2000);
    } else {
      let html = `Wrong credentials`;
      document.querySelector("#msg").innerHTML = html;
      document.querySelector("#msg").classList.add("msg");
      setTimeout(function () {
        document.querySelector("#msg").innerHTML = "";
        document.querySelector("#msg").classList.remove("msg");
      }, 2000);
    }
  }
}
