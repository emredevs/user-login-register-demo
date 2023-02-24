let errorMessage = document.querySelector("#error");
let emailDOM = document.querySelector("#email");
let passwordDOM = document.querySelector("#userPassword");
let save = document.querySelector("#save");
let userArray = JSON.parse(localStorage.getItem("users") || "[]");
let login = document.querySelector("#login");
let emailLogin = document.querySelector("#emailLogin");
let passwordLogin = document.querySelector("#userPasswordLogin");
let usersList = document.querySelector("#list");
const alertContent = (
  info,
  message
) => `<div class="alert alert-${info}" role="alert">
${message}
</div>`;
let userEmail, userPassword;
function form(event) {
  event.preventDefault();
  if (!emailDOM.value || !passwordDOM.value) {
    errorMessage.innerHTML = alertContent("danger", "boş bırakma");
    return;
  }
  userEmail = emailDOM.value;
  userPassword = passwordDOM.value;

  const available = userArray.find((users) => userEmail == users.userEmail);
  if (available != undefined) {
    errorMessage.innerHTML = alertContent("danger", "varolan kullanıcı");
    return;
  }
  userArray.push({ userEmail, userPassword });
  localStorage.setItem("users", JSON.stringify(userArray));
  console.log(userArray);
  errorMessage.innerHTML = alertContent("success", "kayıt başarılı");
  emailDOM.value = "";
  passwordDOM.value = "";
}
save.addEventListener("click", form);

function formLogin(e) {
  e.preventDefault();
  // console.log(userArray);
  if (!emailLogin.value || !passwordLogin.value) {
    errorMessage.innerHTML = alertContent("danger", "boş bırakma");
    return;
  }
  const isLogin = userArray.find(
    (user) =>
      emailLogin.value == user.userEmail &&
      passwordLogin.value == user.userPassword
  );
  // console.log(isLogin);
  if (isLogin != undefined) {
    errorMessage.innerHTML = alertContent("success", "giriş başarılı");
  } else errorMessage.innerHTML = alertContent("danger", "yanliş giris");
}
login.addEventListener("click", formLogin);

userArray.forEach((list) => {
  let newUser = document.createElement("li");
  newUser.innerHTML =
    "user email=" + list.userEmail + "/ password=" + list.userPassword;
  usersList.prepend(newUser);
});
