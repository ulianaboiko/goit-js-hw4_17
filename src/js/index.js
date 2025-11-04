import Handlebars from "handlebars";
import photoSource from "bundle-text:../templates/photo.hbs";

const photoList = document.querySelector(".photo__list");
const loadBtn = document.querySelector(".load-btn");
const photoTempl = Handlebars.compile(photoSource);

let perPage = 15;
let page = 1;

const APIKEY = "52764649-9b4059603d87e1906a3d2898a";
const url = "https://pixabay.com/api/";

const params = new URLSearchParams({
  key: APIKEY,
  per_page: perPage,
  page: page,
  editors_choice: "true",
  q: "nature",
  orientation: "horizontal",
});

const fetchPhotos = (api, params) => {
  const url = `${api}?${params}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error(`помилка! ${response.statusText}`);
      return response.json();
    })
    .then((data) => {
      const html = photoTempl(data);
      photoList.insertAdjacentHTML("beforeend", html);
    })
    .catch((error) => console.error("Помилка завантаження", error));
};

fetchPhotos(url, params);

const handleLoadImg = () => {
  page++;
  params.set("page", page);
  fetchPhotos(url, params);
};

loadBtn.addEventListener("click", handleLoadImg);
