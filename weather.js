const weather = document.querySelector(".js-weather");

const COORDS = "coords";
const API_KEY = "b2033bdf2864fadaa208da216da6227f";

function saveCoords(coords) {
  localStorage.setItem(COORDS, JSON.stringify(coords));
}

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temperature = json.main.temp;
      const place = json.name;
      weather.innerText = `${place} @ ${temperature}`;
      console.log(json.weather);
    });
}

function handleSucces(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordObj = {
    latitude,
    longitude,
  };
  saveCoords(coordObj);
  getWeather();
}

function handleError() {
  console.log("Cant access geo location");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleSucces, handleError);
}

function init() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

init();
