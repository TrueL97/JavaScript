const body = document.querySelector("body");

const IMG_NUMBER = 3;

function handleImageLoad() {
    console.log("finished loading");
}

function paintImage(imgNumber) {
    const image = new Image();
    image.src = `${imgNumber + 1}.jpg`;
    image.classList.add("bgImage");
    body.prepend(image);
    //image.addEventListener("loadend",handleImageLoad);
}

function genRandom() {
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}
//Math.floor(3.9)=3 Math.ceil(3.3)=4

function init() {
    const randomNumber = genRandom();
    paintImage(randomNumber);
}
init();
