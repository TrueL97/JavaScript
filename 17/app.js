const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d"); //conetxt 는 canvas 안에서 픽셀을 다루는것
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth;
canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight;

console.log(canvas.width, canvas.height);
ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5; //2.5px
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    if (filling === false) painting = true;
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
    ctx.fillStyle = color;
}

function handeleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}
function handleModeClick() {
    if (filling === true) {
        filling = false;

        mode.innerText = "Fill"; //innerText text값만 가져옴 innerHtml element 안의 html구조를 다가져옴
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCM(event) {
    event.preventDefault(); //우클릭 텍스트 메뉴 안나오게
}

function handleCanvasClick() {
    if (filling) ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function handlesaveClick() {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "hello";
    link.click();
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM); //오른쪽 클릭
}
console.log(colors);
Array.from(colors).forEach((color) => color.addEventListener("click", handleColorClick));

if (range) {
    range.addEventListener("input", handeleRangeChange);
}

if (mode) {
    console.log(mode.innerText);
    mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
    saveBtn.addEventListener("click", handlesaveClick);
}
