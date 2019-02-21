import "./main.styl";

const form = document.getElementById("form");
const button = document.getElementById("formButton");

function formSubmitting() {
  const values = {};
  const errors = [];
  const errorsText = document.getElementById("errors");
  const successText = document.getElementById("success");
  Object.keys(form).forEach(item => {
    values[form[item].name] = form[item].value;
  });

  if (!values.email) {
    errors.push("Email is required");
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.push("Invalid email address");
  }

  if (!values.name) {
    errors.push("Name is required");
  }

  if (errors.length > 0) {
    errorsText.innerHTML = errors.join(", ");
  } else {
    errorsText.innerHTML = "";
    successText.innerHTML = "Thank you!";
  }
}

function stopDefAction(e) {
  e.preventDefault();
}

form.addEventListener("click", stopDefAction, false);
button.addEventListener("click", formSubmitting, false);
