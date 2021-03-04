function postFunction(e) {
  e.preventDefault();
  let { name, age, description } = e.target;

  let formData = {
    name: name.value,
    age: age.value,
    description: description.value,
  };

  let configObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accepts: "application/json",
    },
    body: JSON.stringify(formData),
  };

  fetch(url, configObject)
    .then((response) => response.json())
    .then((formCreatedObject) => {
      let parentContainer = document.getElementById("parent-container");
      parentContainer.prepend(buildDivElement(formCreatedObject));
    });
}

function drawForm() {
  const form = document.createElement("form");
  form.id = "form-id";
  const name = document.createElement("input");
  name.id = "name";
  name.placeholder = "name...";

  const age = document.createElement("input");
  age.id = "age";
  age.placeholder = "age...";

  const description = document.createElement("input");
  description.id = "description";
  description.placeholder = "description...";

  const btn = document.createElement("button");
  btn.textContent = "Create";

  form.append(name, age, description, btn);
  form.addEventListener("submit", (e) => postFunction(e));

  return form;
}

function buildDivElement(object) {
  let div = document.createElement("div");
  let h2 = document.createElement("h2");
  h2.textContent = object.name;
  let h4 = document.createElement("h4");
  h4.textContent = object.age;
  let p = document.createElement("p");
  p.textContent = object.description;
  div.append(h2, h4, p);
  return div;
}
