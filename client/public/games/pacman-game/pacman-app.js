"use strict";

// #region Gameboard code

const grid = document.querySelector(".grid");
let boardLength = 28;
let gameboardCells = [];
let pelletCount = 281;

// Gameboard drawing design
const layout = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0,
  1, 1, 1, 1, 0, 1, 1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1,
  1, 0, 1, 1, 1, 1, 3, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1,
  1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1,
  1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 0, 1, 1, 0, 1, 1, 1, 4, 4, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 0, 1, 1, 0, 1, 2, 2, 4, 4, 2, 2, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 4, 4, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 2, 2, 4, 4, 2, 2, 1, 0, 1, 1, 0, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 2, 2, 2, 2, 2, 2, 1, 0, 1, 1, 0,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
  1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0,
  1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1,
  1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0,
  1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1,
  1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0,
  0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1,
];

// Draw gameboard
const createBoard = function () {
  for (let i = 0; i < layout.length; i++) {
    let cell = document.createElement("div");
    cell.classList.add("cell");

    if (layout[i] === 0) {
      cell.classList.add("pellet");
    } else if (layout[i] === 1) {
      cell.classList.add("wall");
    } else if (layout[i] === 2) {
      cell.classList.add("home");
    } else if (layout[i] === 3) {
      cell.classList.add("power-pellet");
    } else if (layout[i] === 4) {
      cell.classList.add("ghost-home-entrance");
    } else if (layout[i] === 5) {
      cell.classList.add("pacman-start-position");
    }

    grid.appendChild(cell);
    gameboardCells.push(cell);
  }
};

createBoard();

// Erase gameboard
const eraseBoard = function () {
  gameboardCells.length = 0;
  grid.innerHTML = "";
};

// #endregion

// #region Pacman code
let pacmanDirection = "left";
let pacmanMouthOpen = false;
const pacmanStartPosition = 489;
let pacmanPosition = pacmanStartPosition;
let pacmanLives = 3;

// Draw pacman
function drawPacman() {
  gameboardCells[pacmanPosition].classList.add("pacman");

  gameboardCells[
    pacmanPosition
  ].style.backgroundImage = `url(pics/pacman/pacman-${
    pacmanMouthOpen ? "open" : "close"
  }-${pacmanDirection}.png)`;

  pacmanMouthOpen = !pacmanMouthOpen;
}

drawPacman();

// Erase pacman
function erasePacman() {
  gameboardCells[pacmanPosition].classList.remove("pacman");
  gameboardCells[pacmanPosition].style.backgroundImage = "none";
}

// Pacman movement and eating behavior
document.addEventListener("keydown", function (e) {
  if (gameOn) {
    erasePacman();

    // Set pacman direction
    let moveDirection = 0;
    switch (e.keyCode) {
      // Move left (A key)
      case 65:
        moveDirection -= 1;
        pacmanDirection = "left";
        break;
      // Move right (D key)
      case 68:
        moveDirection += 1;
        pacmanDirection = "right";
        break;
      // Move up (W key)
      case 87:
        moveDirection -= boardLength;
        pacmanDirection = "up";
        break;
      // Move down (S key)
      case 83:
        moveDirection += boardLength;
        pacmanDirection = "down";
        break;
    }

    pacmanPosition += moveDirection;

    // If pacman enters the left tunnel
    if (pacmanPosition === 363) {
      pacmanPosition = 392;
      pacmanPosition--;
    }

    // If pacman enters the right tunnel
    if (pacmanPosition === 392) {
      pacmanPosition = 363;
      pacmanPosition++;
    }

    // If pacman hits a wall
    if (
      gameboardCells[pacmanPosition].classList.contains("wall") ||
      gameboardCells[pacmanPosition].classList.contains("ghost-home-entrance")
    ) {
      pacmanPosition -= moveDirection;
    }

    drawPacman();

    // Eat pellet
    if (gameboardCells[pacmanPosition].classList.contains("pellet")) {
      currentScore++;
      score.textContent = currentScore;
      gameboardCells[pacmanPosition].classList.remove("pellet");
      pelletCount--;
    }

    // Eat power pellet
    if (gameboardCells[pacmanPosition].classList.contains("power-pellet")) {
      currentScore += 10;
      score.textContent = currentScore;
      scareGhost();
      setTimeout(undoScare, ghostScaredDuration);
      gameboardCells[pacmanPosition].classList.remove("power-pellet");
      pelletCount--;
    }

    // If all the pellets have been eaten
    if (pelletCount === 0) {
      levelComplete = true;
      resetGameOrNextLevel();
    }
  }
});

const resetPacman = function () {
  pacmanPosition = pacmanStartPosition;
  pacmanMouthOpen = false;
  pacmanDirection = "left";
  drawPacman();
};

//Pacman encounters ghost
const ghostEncounter = function () {
  ghosts.forEach((ghost) => {
    if (
      gameboardCells[ghost.currentIndex].classList.contains("pacman") &&
      gameboardCells[pacmanPosition].classList.contains("ghost")
    ) {
      // Scared Ghost Eaten
      if (ghost.scared) {
        eraseGhost();
        currentScore += 100;
        score.textContent = currentScore;
        ghost.currentIndex = ghost.startIndex;
        ghost.scared = false;
        ghost.outsideHome = false;
        drawPacman();
        drawGhost();
      } else {
        stopGameplay();
        gameOn = false;

        // If pacman is out of lives
        if (pacmanLives === 0) {
          console.log("Game over!");
        }
        // Pacman loses a life and resets position
        else {
          eraseGhost();
          erasePacman();
          document
            .querySelector(`.life-${pacmanLives}`)
            .classList.add("hidden-img");
          pacmanLives--;
          resetPacman();
          ghosts.forEach((ghost) => {
            ghost.currentIndex = ghost.startIndex;
            ghost.directionFacing = "up";
            ghost.outsideHome = false;
            ghost.scared = false;
          });
          drawGhost();
        }
      }
    }
  });
};

// #endregion

// #region Ghost code

// Starting ghost speed
let ghostSpeed = 200;
// Starting ghost scared duartion
let ghostScaredDuration = 10000;

// Ghost class
class Ghost {
  constructor(color, currentIndex, directionFacing) {
    this.color = color;
    this.currentIndex = currentIndex;
    this.speed = ghostSpeed;
    this.directionFacing = directionFacing;
    this.startIndex = currentIndex;
    this.timerId = NaN;
    this.scared = false;
    this.outsideHome = false;
  }
}

// Create the different ghosts in the game
const ghosts = [
  new Ghost("red", 377, "up"),
  new Ghost("pink", 378, "up"),
  new Ghost("orange", 405, "up"),
  new Ghost("blue", 406, "up"),
];

// Draw the ghost
let drawGhost = function () {
  ghosts.forEach((ghost) => {
    gameboardCells[ghost.currentIndex].classList.add("ghost");
    // If the ghost are scared, add the scared-ghost class
    if (ghost.scared) {
      gameboardCells[ghost.currentIndex].classList.add("scared-ghost");
      // gameboardCells[
      //   ghost.currentIndex
      // ].style.backgroundImage = `url(pics/ghosts/scared-ghost/scared-ghost-${ghost.directionFacing}.png)`;
      gameboardCells[
        ghost.currentIndex
      ].style.backgroundImage = `url(pics/ghosts/scared-ghost.png)`;
    }
    // If the ghost are not scared, provide their normal ghost picture
    else {
      gameboardCells[
        ghost.currentIndex
      ].style.backgroundImage = `url(pics/ghosts/${ghost.color}-ghost/${ghost.color}-${ghost.directionFacing}.png)`;
    }
  });
};

drawGhost();

// Erase the ghost
let eraseGhost = function () {
  ghosts.forEach((ghost) => {
    gameboardCells[ghost.currentIndex].style.backgroundImage = "none";
    gameboardCells[ghost.currentIndex].classList.remove("ghost");
    gameboardCells[ghost.currentIndex].classList.remove("scared-ghost");
  });
};

// Ghost movement
const moveGhost = function () {
  ghosts.forEach((ghost) => {
    const directions = [1, -1, boardLength, -boardLength];
    let generateNumber = () => Math.floor(Math.random() * directions.length);
    let number;

    // If the ghost is still in the home, force it to move upwards
    ghost.outsideHome === false ? (number = 3) : (number = generateNumber());

    let direction = directions[number];

    ghost.timerId = setInterval(function () {
      if (
        gameboardCells[ghost.currentIndex + direction].classList.contains(
          "wall"
        ) ||
        gameboardCells[ghost.currentIndex + direction].classList.contains(
          "ghost"
        ) ||
        gameboardCells[ghost.currentIndex + direction].classList.contains(
          "home"
        ) ||
        (ghost.outsideHome &&
          gameboardCells[ghost.currentIndex + direction].classList.contains(
            "ghost-home-entrance"
          ))
      ) {
        ghost.outsideHome === false
          ? (number = 3)
          : (number = generateNumber());
        direction = directions[number];
      } else {
        eraseGhost();
        ghost.currentIndex += direction;

        // Establish it is outside home so that it does not go back inside home
        if (ghost.currentIndex === 293 || ghost.currentIndex === 294) {
          ghost.outsideHome = true;
        }
      }

      if (direction === 1) {
        ghost.directionFacing = "right";
      } else if (direction === -1) {
        ghost.directionFacing = "left";
      } else if (direction === boardLength) {
        ghost.directionFacing = "down";
      } else if (direction === -boardLength) {
        ghost.directionFacing = "up";
      }

      drawGhost();
      ghostEncounter();
    }, ghost.speed);
  });
};

// Ghost is scared
const scareGhost = function () {
  ghosts.forEach((ghost) => {
    ghost.scared = true;
  });
};

// Ghost is no longer scared
const undoScare = function () {
  ghosts.forEach((ghost) => {
    ghost.scared = false;
  });
};

// #endregion

// #region General game functionality

const score = document.querySelector(".score");
let currentScore = 0;
let gameOn = false;
let level = 1;
let levelComplete = false;

// Start the game by hitting the "enter" key
document.addEventListener("keydown", function (e) {
  if (!gameOn && pacmanPosition === pacmanStartPosition) {
    if (e.keyCode === 13) {
      e.preventDefault();
      gameOn = true;
      moveGhost();
    }
  }
});

// Game over (when pacman runs into non-scared ghost)
const stopGameplay = function () {
  gameOn = false;
  // Stop the ghost
  ghosts.forEach((ghost) => {
    clearInterval(ghost.timerId);
  });
};

// Reset the game or advance to next level
const resetGameOrNextLevel = function () {
  // Do the following for both a game reset and level advancement
  stopGameplay();
  eraseBoard();
  createBoard();
  pelletCount = 281;
  gameOn = false;
  resetPacman();

  // If the level was complete
  if (levelComplete) {
    level < 8 ? level++ : null;
    document.querySelector(`.img-${level}`).classList.remove("hidden-img");
    ghostSpeed > 100 ? (ghostSpeed = 200 - level * 10) : null;
    ghostScaredDuration > 1000
      ? (ghostScaredDuration = 10000 - level * 1000)
      : null;
    levelComplete = false;
  }

  // If the game is over
  else {
    pacmanLives = 3;
    level = 1;
    currentScore = 0;
    ghostSpeed = 200;
    ghostScaredDuration = 10000;
    // Hide the level imgs
    for (let i = 8; i > 1; i--) {
      document.querySelector(`.img-${i}`).classList.add("hidden-img");
      if (i <= 4) {
        document.querySelector(`.life-${i - 1}`).classList.remove("hidden-img");
      }
    }
  }

  // Reset the ghost and update their speed and scare duration (if necessary)
  ghosts.forEach((ghost) => {
    ghost.currentIndex = ghost.startIndex;
    ghost.directionFacing = "up";
    ghost.outsideHome = false;
    ghost.scared = false;
    ghost.speed = ghostSpeed;
  });
  drawGhost();
  score.textContent = currentScore;
};

// Reset the game
document.addEventListener("keydown", function (key) {
  // Press the "r" key to reset the game
  if (key.keyCode === 82) {
    resetGameOrNextLevel();
  }
});

// #endregion
