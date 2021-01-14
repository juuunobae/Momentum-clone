const body = document.querySelector("body");

const IMG_NUMBER = 4;

function paintImage(number) {
  const image = document.createElement("img");
  image.src = `images/${number + 1}.jpg`;
  image.classList.add("bgImage");
  body.appendChild(image);
}

function randomNumber() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function init() {
  const imageNumber = randomNumber();
  paintImage(imageNumber);
}

init();
