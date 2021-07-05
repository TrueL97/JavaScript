const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d"); //conetxt 는 canvas 안에서 픽셀을 다루는것
const colors = document.getElementsByClassName("jsColor");

canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth;
canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight;

console.log(canvas.width, canvas.height);
ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5; //2.5px
let painting = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath(); //path===line
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function onMouseDown(event) {
    painting = true;
}
function onMouseUp(event) {
    stopPainting();
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    console.log(color);
    ctx.strokeStyle = color;
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}
console.log(colors);
Array.from(colors).forEach((color) => color.addEventListener("click", handleColorClick));
