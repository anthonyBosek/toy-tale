let addToy = false; //* origional code

//! dev_ant 9/16
const toyCollection = document.querySelector("#toy-collection");
const form = document.querySelector("form.add-toy-form");

const cardCreate = (data) => {
  data.forEach(({ id, name, image, likes }) => {
    const div = document.createElement("div");
    div.classList.add("card");

    const h2 = document.createElement("h2");
    h2.textContent = name;

    const img = document.createElement("img");
    img.setAttribute("src", image);
    img.setAttribute("alt", `${name}-image`);
    img.classList.add("toy-avatar");

    const p = document.createElement("p");
    p.setAttribute("id", `toy-${id}-likes`);
    const gt = likes !== 1;
    p.textContent = `${likes} ${gt ? "Likes" : "Like"}`;

    const btn = document.createElement("button");
    btn.setAttribute("id", id);
    btn.classList.add("like-btn");
    btn.textContent = "Like ❤️";
    btn.addEventListener("click", handleLikeClick);

    div.append(h2, img, p, btn);
    toyCollection.append(div);
  });
};

const cardUpdate = ({ id, likes }) => {
  const p = document.querySelector(`#toy-${id}-likes`);
  const gt = likes !== 1;
  p.textContent = `${likes} ${gt ? "Likes" : "Like"}`;
};

const handleSubmit = (e) => {
  e.preventDefault();

  const newToy = {
    name: e.target.name.value,
    image: e.target.image.value,
    likes: 0,
  };

  postData(newToy); //! POST data w/ fetch
  form.reset();
};

const handleLikeClick = (e) => {
  getOneData(e.target.id)
    .then((data) => {
      data.likes++;
      patchData(data);
    })
    .catch((err) => console.log("Error: ", err.message));
};

const getData = () => {
  fetch("http://localhost:3000/toys")
    .then((resp) => resp.json())
    .then((data) => cardCreate(data)) //! pass data to callback fn
    .catch((err) => console.log("Error: ", err.message));
};

const getOneData = (_id) => {
  return fetch(`http://localhost:3000/toys/${_id}`)
    .then((resp) => resp.json())
    .then((data) => data)
    .catch((err) => console.log("Error: ", err.message));
};
//! async/await option
//! const getOneData = async (_id) => {
//!   try {
//!     const resp = await fetch(`http://!localhost:3000/toys/${_id}`);
//!     const data = await resp.json();
//!     return data;
//!   } catch (err) {
//!     return console.log("Error: ", err.message);
//!   }
//! };

const postData = (newToyData) => {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(newToyData),
  })
    .then((resp) => resp.json())
    .then((data) => cardCreate([data]))
    .catch((err) => console.log("Error: ", err.message));
};

const patchData = ({ id, likes }) => {
  fetch(`http://localhost:3000/toys/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ likes }),
  })
    .then((resp) => resp.json())
    .then((data) => cardUpdate(data))
    .catch((err) => console.log("Error: ", err.message));
};
//! -----

//* origional code
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  //* -----

  //! dev_ant 9/16
  getData(); //! GET data w/ fetch
  form.addEventListener("submit", handleSubmit);
  //! -----
});
//* -----
