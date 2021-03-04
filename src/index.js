function init() {
  const goodDogFilter = document.getElementById("good-dog-filter");
  goodDogFilter.addEventListener("click", (e) => filterGoodDogs(e));
  const divDogBar = document.getElementById("dog-bar");
  const DOG_URL = "http://localhost:3000/pups/";

  function getDogs(url) {
    return fetch(url)
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => console.error("ERROR", error));
  }

  function dogBar(arrayOfDogs) {
    arrayOfDogs.forEach((dog) => {
      let dogNameContainer = document.createElement("SPAN");
      dogNameContainer.addEventListener("click", (e) => bestInShow(e, dog));
      dogNameContainer.textContent = dog.name;
      divDogBar.append(dogNameContainer);
    });
  }

  function bestInShow(e, dog) {
    e.preventDefault();
    const container = document.createElement("div");
    const img = document.createElement("img");
    img.src = dog.image;

    const name = document.createElement("h2");
    name.textContent = dog.name;

    const btn = document.createElement("button");

    btn.textContent = dog.isGoodDog ? "Good Dog!" : "Bad Dog!";
    btn.addEventListener("click", (e) => reverse(e, dog));

    let parentDiv = document.getElementById("dog-info");

    const remBtn = document.createElement("button");
    remBtn.textContent = "Remove";
    remBtn.addEventListener("click", () => remove(parentDiv, container));
    container.append(img, name, btn, remBtn);
    parentDiv.appendChild(container);
  }

  function reverse(e, dog) {
    if (dog.isGoodDog) {
      dog.isGoodDog = false;
      e.target.textContent = "Bad Dog!";
      updateDog(dog);
    } else {
      dog.isGoodDog = true;
      e.target.textContent = "Good Dog!";
      updateDog(dog);
    }
    return dog;
  }
  function remove(parent, child) {
    parent.removeChild(child);
  }

  function updateDog(dog) {
    let id = dog.id;

    const data = {
      isGoodDog: dog.isGoodDog,
    };

    const configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(`${DOG_URL}${id}`, configObj)
      .then((response) => response.json())
      .then((data) => console.log(data.name))
      .catch((error) => console.error("ERROR", error));
  }

  function filterGoodDogs(e) {
    let btn = e.target;
    if (btn.textContent === "Filter good dogs: OFF") {
      btn.textContent = "Filter good dogs: ON";
      getDogs(DOG_URL).then((data) => {
        let goodDogs = data.filter((dog) => dog.isGoodDog === true);
        divDogBar.innerHTML = "";
        dogBar(goodDogs);
      });
    } else {
      btn.textContent = "Filter good dogs: OFF";
      getDogs(DOG_URL).then((data) => dogBar(data));
    }
  }

  getDogs(DOG_URL).then((data) => dogBar(data));
}
init();

