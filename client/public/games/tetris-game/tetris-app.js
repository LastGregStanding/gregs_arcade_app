"use strict";
const gameboard = document.querySelector(".gameboard");
const scoreboard = document.querySelector(".score");
const width = 10;
const grid = [];
let score = 0;
let gameStart = false;
let gameInterval;

//#region Create Game Grid
function createGame() {
  for (let i = 0; i < 200; i++) {
    let cell = document.createElement("div");
    cell.classList.add("cell");
    grid.push(cell);
    gameboard.appendChild(cell);
  }
}
createGame();
//#endregion

//#region Random Color Tetromino Shapes
let colorChoices = [
  "rgb(59, 247, 172)",
  "rgb(0, 132, 255)",
  "rgb(0, 255, 76)",
  "rgb(177, 60, 255)",
  "rgb(255, 64, 64)",
  "rgb(0, 255, 238)",
  "rgb(234, 0, 255)",
  "rgb(225, 225, 0)",
  "rgb(227, 0, 193)",
  "rgb(0, 194, 48)",
  "rgb(179, 255, 72)",
  "rgb(255, 191, 0)",
  "rgb(238, 0, 0)",
  "rgb(238, 83, 0)",
  "rgb(50, 234, 255)",
  "rgb(214, 0, 196)",
  "rgb(231, 24, 24)",
  "rgb(234, 118, 255)",
  "rgb(87, 10, 255)",
  "rgb(10, 248, 102)",
  "rgba(10, 255, 39, 0.65)",
  "rgb(24, 105, 255)",
  "rgb(0, 82, 233)",
  "rgb(36, 24, 255)",
  "rgb(255, 128, 128)",
  "rgb(255, 204, 94)",
  "rgb(229, 255, 0)",
  "rgb(255, 92, 56)",
];
let randomNumbers = () => Math.floor(Math.random() * 28);
let currentColor = colorChoices[randomNumbers()];
//#endregion

//#region Tetromino Shapes

// New shapes
const iTetromino = [
  [2, width + 2, width * 2 + 2, width * 3 + 2],
  [width, width + 1, width + 2, width + 3],
  [1, width + 1, width * 2 + 1, width * 3 + 1],
  [width * 2, width * 2 + 1, width * 2 + 2, width * 2 + 3],
];

const oTetromino = [
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
];

const tTetromino = [
  [1, width, width + 1, width + 2],
  [1, width + 1, width + 2, width * 2 + 1],
  [width, width + 1, width + 2, width * 2 + 1],
  [1, width, width + 1, width * 2 + 1],
];

const jTetromino = [
  [0, width, width + 1, width + 2],
  [1, 2, width + 1, width * 2 + 1],
  [width, width + 1, width + 2, width * 2 + 2],
  [1, width + 1, width * 2 + 1, width * 2],
];

const lTetromino = [
  [width, width + 1, width + 2, 2],
  [1, width + 1, width * 2 + 1, width * 2 + 2],
  [width, width + 1, width + 2, width * 2],
  [0, 1, width + 1, width * 2 + 1],
];

const sTetromino = [
  [1, 2, width, width + 1],
  [1, width + 1, width + 2, width * 2 + 2],
  [width + 1, width + 2, width * 2, width * 2 + 1],
  [0, width, width + 1, width * 2 + 1],
];

const zTetromino = [
  [0, 1, width + 1, width + 2],
  [2, width + 1, width + 2, width * 2 + 1],
  [width, width + 1, width * 2 + 1, width * 2 + 2],
  [1, width, width + 1, width * 2],
];

//#endregion

const tetrominos = [
  iTetromino,
  oTetromino,
  tTetromino,
  jTetromino,
  lTetromino,
  sTetromino,
  zTetromino,
];
let shape = Math.floor(Math.random() * 7);
let rotation = 0;
let currentTetromino = tetrominos[shape][rotation];
let index = 3;

//#region Draw Shapes
function drawShape() {
  currentTetromino.forEach((cell) => grid[cell + index].classList.add("shape"));
  currentTetromino.forEach(
    (cell) => (grid[cell + index].style.backgroundColor = currentColor)
  );
}

function eraseShape() {
  currentTetromino.forEach((cell) =>
    grid[cell + index].classList.remove("shape")
  );
  currentTetromino.forEach(
    (cell) => (grid[cell + index].style.backgroundColor = "")
  );
}

drawShape();

//#endregion

function playGame() {
  eraseShape();
  index += 10;
  drawShape();
  checkRow();

  // If the Tetromino hits the bottom of the board or another shape
  if (
    currentTetromino.some(
      (cell) =>
        cell + index + width >= 200 ||
        grid[cell + index + width].classList.contains("taken")
    )
  ) {
    currentTetromino.forEach((cell) =>
      grid[cell + index].classList.add("taken")
    );
    index = 3;
    rotation = 0;
    shape = Math.floor(Math.random() * 7);
    currentTetromino = tetrominos[shape][rotation];
    currentColor = colorChoices[randomNumbers()];
    drawShape();
  }
  // Check if the tetromino has hit the top of the grid
  gameOver();
}
// Control the Tetrominos during the game
document.addEventListener("keydown", function (key) {
  if (gameStart) {
    eraseShape();
    switch (key.keyCode) {
      // A key: move left
      case 65:
        // If shape hits wall
        if (currentTetromino.some((cell) => (cell + index) % width === 0)) {
          index++;
        }
        index--;
        break;

      // D key: move right
      case 68:
        // If shape hits wall
        if (currentTetromino.some((cell) => (cell + index + 1) % width === 0)) {
          index--;
        }
        index++;
        break;

      // S key: move down faster
      case 83:
        if (
          currentTetromino.some((cell) =>
            grid[cell + index + width * 3].classList.contains("taken")
          )
        ) {
          break;
        }
        index += width;
        break;

      // Space bar: rotate shape
      case 32:
        rotation = rotation + 1 === 4 ? 0 : rotation + 1;
        currentTetromino = tetrominos[shape][rotation];
    }
    drawShape();
  }
});

// Check if row is completed
function checkRow() {
  for (let i = 0; i < grid.length; i += width) {
    let row = [];
    for (let j = i; j < i + 10; j++) {
      row.push(j);
    }
    if (row.every((cell) => grid[cell].classList.contains("taken"))) {
      row.forEach((cell) => {
        grid[cell].classList.remove("taken");
        grid[cell].classList.remove("shape");
      });
      deleteGameboardRow();
      grid.splice(i, 10);
      for (let i = 0; i < 10; i++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        grid.unshift(cell);
      }
      addGameboardRow();
      score += 10;
      scoreboard.textContent = score;
    }
  }
}

// Delete entire gameboard
function deleteGameboardRow() {
  for (let i = 0; i < 200; i++) {
    gameboard.removeChild(grid[i]);
  }
}

// Redraw entire gameboard from using the divs in the grid array
function addGameboardRow() {
  for (let i = 0; i < 200; i++) {
    gameboard.appendChild(grid[i]);
  }
}

// Hit Enter Key To Start Game
document.addEventListener("keydown", function (key) {
  if (!gameStart) {
    if (key.keyCode === 13) {
      gameStart = true;
      gameInterval = setInterval(playGame, 300);
    }
  }
});

// Prevent the space bar from moving the page down
document.addEventListener("keydown", function (event) {
  if (event.code === "Space" && event.target === document.body) {
    event.preventDefault();
  }
});

// Game over situation
function gameOver() {
  if (
    currentTetromino.some((cell) =>
      grid[index + cell].classList.contains("taken")
    )
  ) {
    clearInterval(gameInterval);
    gameStart = false;
    document.querySelector(".game-over-text").classList.remove("text-hidden");
  }
}

// Reset game
document.addEventListener("keydown", function (key) {
  // If user hits the "r" key, reset the game
  if (key.keyCode === 82) {
    document.querySelector(".game-over-text").classList.add("text-hidden");
    eraseShape();
    shape = Math.floor(Math.random() * 7);
    rotation = 0;
    currentTetromino = tetrominos[shape][rotation];
    index = 3;
    gameStart = false;
    clearInterval(gameInterval);
    score = 0;
    scoreboard.textContent = score;
    grid.length = 0;
    gameboard.textContent = "";
    createGame();
    currentColor = colorChoices[randomNumbers()];
    drawShape();
  }
});
