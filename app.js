const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

// variable
const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;
let painting = false;
let filling = false;

// 캔버스 사이즈 지정
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// 브러쉬 색상 및 사이즈 초기화
ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

// fill 색상 초기화
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// ---------------- start function logic -------------------
function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

// 페인팅 로직
function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  // 브러쉬 색상, fill 색상 override
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const size = event.target.value;
  // 브러쉬 사이즈 override
  ctx.lineWidth = size;
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
    ctx.fillStyle = ctx.strokeStyle;
  }
}

function handleCanavasClick() {
  if (filling) ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function handleCM(event) {
  event.preventDefault();
}

function handleSaveClick() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "paintjs";
  link.click();
}

// ---------------- End function logic -------------------

// ---------------- Start Event Listening ---------------------
if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanavasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}

// ---------------- End Event Listening ---------------------
