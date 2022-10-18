const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const fillBtn = document.getElementById("jsFill");
const saveBtn = document.getElementById("jsSave");
const eraserBtn = document.getElementById("jsEraser");
const clearBtn = document.getElementById("jsClear");

// variable
const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;
let painting = false;
let filling = false;
let eraser = false;

// 캔버스 사이즈 지정
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// 브러쉬 색상 및 사이즈 초기화
ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = 6.5;
ctx.lineCap = "round"; // 부드러운 라인
ctx.lineJoin = "round";

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
  if (eraser) {
    if (painting) {
      ctx.beginPath();
      clearArc(ctx, x, y, 20);
    }
  } else {
    if (!painting) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  }
}

/**
 * Eraser 원형으로 부드럽게 하기 위한 Function
 * @param {context} ctx
 * @param {x좌표} x
 * @param {y좌표} y
 * @param {반지름} radius
 */
function clearArc(ctx, x, y, radius) {
  ctx.save();
  ctx.globalCompositeOperation = "destination-out";
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
  ctx.fill();
  ctx.restore();
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  Array.from(colors).forEach((color) => color.classList.remove("choice"));
  event.target.classList.add("choice");
  // 브러쉬 색상, fill 색상 override
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const size = event.target.value;
  // 브러쉬 사이즈 override
  ctx.lineWidth = size;
}

function handleFillClick() {
  if (filling === true) {
    filling = false;
    fillBtn.innerText = "Fill";
  } else {
    if (eraser) {
      eraser = false;
      eraserBtn.style = "border: 2px solid rgba(0, 0, 0, 0.2);";
    }
    filling = true;
    fillBtn.innerText = "Paint";
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

function handleEraserClick() {
  if (eraser === true) {
    eraser = false;
    eraserBtn.style = "border: 2px solid rgba(0, 0, 0, 0.2);";
  } else {
    filling = false;
    eraser = true;
    eraserBtn.style = "border: 2px solid black;";
  }
}

function handleClearClick() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
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

if (fillBtn) {
  fillBtn.addEventListener("click", handleFillClick);
}

if (eraserBtn) {
  eraserBtn.addEventListener("click", handleEraserClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}

if (clearBtn) {
  clearBtn.addEventListener("click", handleClearClick);
}

// ---------------- End Event Listening ---------------------
