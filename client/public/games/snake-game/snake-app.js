"use strict";

// Game code
const grid = [];
const gameboard = document.querySelector(".gameboard");
const scoreText = document.querySelector(".score");
let horizontalMove = 1;
let verticalMove = 0;
let score = 0;
let food;
let gameOn = false;
let snake = [{ cell: 0 }, { cell: 1 }, { cell: 2 }, { cell: 3 }];

// Draw the gameboard
function createGame() {
  for (let i = 0; i < 400; i++) {
    let cell = document.createElement("div");
    cell.classList.add("cell");
    grid.push(cell);
    gameboard.appendChild(cell);
  }
}
createGame();

// Erase the gameboard
function eraseGame() {
  // Clear the gameboard and grid array
  gameboard.innerHTML = "";
  grid.length = 0;
}

// #region Draw/Erase snake
function drawSnake() {
  snake.forEach((piece) => {
    grid[piece.cell].classList.remove("erase");
    grid[piece.cell].classList.add("snake");
  });
}
function eraseSnake() {
  snake.forEach((piece) => {
    grid[piece.cell].classList.add("erase");
  });
}
// #endregion

// Generate the food
function createFood() {
  let newFood;
  //   Generate new food and make sure it does not coincide with the snake
  do {
    newFood = Math.floor(Math.random() * 400);
  } while (snake.some((segment) => segment.cell === newFood));
  food = newFood;

  // Remove old food and place new food
  grid.forEach((cell) => cell.classList.remove("food"));
  grid[food].classList.add("food");
}
// Generate the first food of the game
createFood();

// #region Snake behavior

// Control the snake movement
document.addEventListener("keydown", function (event) {
  if (gameOn) {
    switch (event.keyCode) {
      case 65: // A key (Left)
        if (horizontalMove === 0) {
          horizontalMove = -1;
          verticalMove = 0;
        }
        break;
      case 68: // D key (Right)
        if (horizontalMove === 0) {
          horizontalMove = 1;
          verticalMove = 0;
        }
        break;
      case 87: // W key (Up)
        if (verticalMove === 0) {
          horizontalMove = 0;
          verticalMove = -1;
        }
        break;
      case 83: // S key (Down)
        if (verticalMove === 0) {
          horizontalMove = 0;
          verticalMove = 1;
        }
        break;
    }
  }
});

// Snake behavior
function moveSnake() {
  const newHeadCell = snake[0].cell + horizontalMove + verticalMove * 20; // Move in correct direction
  snake.unshift({ cell: newHeadCell }); // Add new head

  // Check if the snake ate food
  if (newHeadCell === food) {
    score++;
    scoreText.textContent = score;
    createFood();
  } else {
    snake.pop(); // Remove tail to keep length same
  }
}
//#endregion

// Draw the first snake
drawSnake();
moveSnake();

// Primary gameplay
function playGame() {
  if (gameOn) {
    setTimeout(() => {
      eraseSnake();
      moveSnake();
      checkGameOver();
      if (!gameOn) return;
      drawSnake();
      playGame();
    }, 75);
  }
}

// Check if the game is over
function checkGameOver() {
  const snakeHead = snake[0].cell;

  // Snake hits the top or bottom of gameboard
  if (snakeHead < 0 || snakeHead > 399) {
    gameOn = false;
    console.log("Game over!");
    // userScoreSubmit.textContent = score;
    // modal.showModal();
    endGame(score);
    return;
  }

  // Snake hits the side of gameboard
  if (
    (horizontalMove === -1 && snakeHead % 20 === 19) ||
    (horizontalMove === 1 && snakeHead % 20 === 0)
  ) {
    gameOn = false;
    console.log("Game over!");
    // userScoreSubmit.textContent = score;
    // modal.showModal();
    endGame(score);
    return;
  }

  //   Snake runs into itself
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].cell === snakeHead) {
      gameOn = false;
      console.log("Game over!");
      // userScoreSubmit.textContent = score;
      // modal.showModal();
      endGame(score);
      return;
    }
  }
}

function endGame(score) {
  // Send message to parent
  window.parent.postMessage(
    {
      type: "GAME_OVER",
      game: "Snake",
      score: score,
    },
    "*"
  );
}

// Start the game with the enter key
document.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    if (!gameOn) {
      event.preventDefault(); // Prevent the Enter key from hitting the reset btn.
      gameOn = true;
      playGame();
    }
  }
});

// Reset game

document.addEventListener("keydown", function (key) {
  if (key.keyCode === 82) {
    gameOn = false;
    score = 0;
    scoreText.textContent = score;
    horizontalMove = 1;
    verticalMove = 0;
    snake = [{ cell: 0 }, { cell: 1 }, { cell: 2 }, { cell: 3 }];
    eraseGame();
    createGame();
    createFood();
    drawSnake();
    moveSnake();
  }
});
