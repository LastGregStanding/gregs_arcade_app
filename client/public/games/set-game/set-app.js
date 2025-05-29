"use strict";
const startBtn = document.querySelector(".start-btn");
const resetBtn = document.querySelector(".reset-btn");
const timer = document.querySelector(".timer");
const gameboard = document.querySelector(".gameboard");
const scoreBoard = document.querySelector(".score");
const gameCells = [];
const currentCards = [];
const usedCards = [];
const chosenCards = [];
let countdown;
let gameOver = true;
let score = 0;
let timeLeft = 90;

// Deck of cards for the game
const deck = [
  {
    id: 0,
    color: "red",
    shape: "diamond",
    number: 1,
    shading: "solid",
    img: "./set_game_photos/red/solid/diamond1.png",
  },
  {
    id: 1,
    color: "red",
    shape: "diamond",
    number: 1,
    shading: "stripe",
    img: "./set_game_photos/red/stripe/diamond1.png",
  },
  {
    id: 2,
    color: "red",
    shape: "diamond",
    number: 1,
    shading: "hollow",
    img: "./set_game_photos/red/hollow/diamond1.png",
  },
  {
    id: 3,
    color: "red",
    shape: "diamond",
    number: 2,
    shading: "solid",
    img: "./set_game_photos/red/solid/diamond2.png",
  },
  {
    id: 4,
    color: "red",
    shape: "diamond",
    number: 2,
    shading: "stripe",
    img: "./set_game_photos/red/stripe/diamond2.png",
  },
  {
    id: 5,
    color: "red",
    shape: "diamond",
    number: 2,
    shading: "hollow",
    img: "./set_game_photos/red/hollow/diamond2.png",
  },
  {
    id: 6,
    color: "red",
    shape: "diamond",
    number: 3,
    shading: "solid",
    img: "./set_game_photos/red/solid/diamond3.png",
  },
  {
    id: 7,
    color: "red",
    shape: "diamond",
    number: 3,
    shading: "stripe",
    img: "./set_game_photos/red/stripe/diamond3.png",
  },
  {
    id: 8,
    color: "red",
    shape: "diamond",
    number: 3,
    shading: "hollow",
    img: "./set_game_photos/red/hollow/diamond3.png",
  },
  {
    id: 9,
    color: "red",
    shape: "oval",
    number: 1,
    shading: "solid",
    img: "./set_game_photos/red/solid/oval1.png",
  },
  {
    id: 10,
    color: "red",
    shape: "oval",
    number: 1,
    shading: "stripe",
    img: "./set_game_photos/red/stripe/oval1.png",
  },
  {
    id: 11,
    color: "red",
    shape: "oval",
    number: 1,
    shading: "hollow",
    img: "./set_game_photos/red/hollow/oval1.png",
  },
  {
    id: 12,
    color: "red",
    shape: "oval",
    number: 2,
    shading: "solid",
    img: "./set_game_photos/red/solid/oval2.png",
  },
  {
    id: 13,
    color: "red",
    shape: "oval",
    number: 2,
    shading: "stripe",
    img: "./set_game_photos/red/stripe/oval2.png",
  },
  {
    id: 14,
    color: "red",
    shape: "oval",
    number: 2,
    shading: "hollow",
    img: "./set_game_photos/red/hollow/oval2.png",
  },
  {
    id: 15,
    color: "red",
    shape: "oval",
    number: 3,
    shading: "solid",
    img: "./set_game_photos/red/solid/oval3.png",
  },
  {
    id: 16,
    color: "red",
    shape: "oval",
    number: 3,
    shading: "stripe",
    img: "./set_game_photos/red/stripe/oval3.png",
  },
  {
    id: 17,
    color: "red",
    shape: "oval",
    number: 3,
    shading: "hollow",
    img: "./set_game_photos/red/hollow/oval3.png",
  },
  {
    id: 18,
    color: "red",
    shape: "squiggle",
    number: 1,
    shading: "solid",
    img: "./set_game_photos/red/solid/squiggle1.png",
  },
  {
    id: 19,
    color: "red",
    shape: "squiggle",
    number: 1,
    shading: "stripe",
    img: "./set_game_photos/red/stripe/squiggle1.png",
  },
  {
    id: 20,
    color: "red",
    shape: "squiggle",
    number: 1,
    shading: "hollow",
    img: "./set_game_photos/red/hollow/squiggle1.png",
  },
  {
    id: 21,
    color: "red",
    shape: "squiggle",
    number: 2,
    shading: "solid",
    img: "./set_game_photos/red/solid/squiggle2.png",
  },
  {
    id: 22,
    color: "red",
    shape: "squiggle",
    number: 2,
    shading: "stripe",
    img: "./set_game_photos/red/stripe/squiggle2.png",
  },
  {
    id: 23,
    color: "red",
    shape: "squiggle",
    number: 2,
    shading: "hollow",
    img: "./set_game_photos/red/hollow/squiggle2.png",
  },
  {
    id: 24,
    color: "red",
    shape: "squiggle",
    number: 3,
    shading: "solid",
    img: "./set_game_photos/red/solid/squiggle3.png",
  },
  {
    id: 25,
    color: "red",
    shape: "squiggle",
    number: 3,
    shading: "stripe",
    img: "./set_game_photos/red/stripe/squiggle3.png",
  },
  {
    id: 26,
    color: "red",
    shape: "squiggle",
    number: 3,
    shading: "hollow",
    img: "./set_game_photos/red/hollow/squiggle3.png",
  },
  {
    id: 27,
    color: "purple",
    shape: "diamond",
    number: 1,
    shading: "solid",
    img: "./set_game_photos/purple/solid/diamond1.png",
  },
  {
    id: 28,
    color: "purple",
    shape: "diamond",
    number: 1,
    shading: "stripe",
    img: "./set_game_photos/purple/stripe/diamond1.png",
  },
  {
    id: 29,
    color: "purple",
    shape: "diamond",
    number: 1,
    shading: "hollow",
    img: "./set_game_photos/purple/hollow/diamond1.png",
  },
  {
    id: 30,
    color: "purple",
    shape: "diamond",
    number: 2,
    shading: "solid",
    img: "./set_game_photos/purple/solid/diamond2.png",
  },
  {
    id: 31,
    color: "purple",
    shape: "diamond",
    number: 2,
    shading: "stripe",
    img: "./set_game_photos/purple/stripe/diamond2.png",
  },
  {
    id: 32,
    color: "purple",
    shape: "diamond",
    number: 2,
    shading: "hollow",
    img: "./set_game_photos/purple/hollow/diamond2.png",
  },
  {
    id: 33,
    color: "purple",
    shape: "diamond",
    number: 3,
    shading: "solid",
    img: "./set_game_photos/purple/solid/diamond3.png",
  },
  {
    id: 34,
    color: "purple",
    shape: "diamond",
    number: 3,
    shading: "stripe",
    img: "./set_game_photos/purple/stripe/diamond3.png",
  },
  {
    id: 35,
    color: "purple",
    shape: "diamond",
    number: 3,
    shading: "hollow",
    img: "./set_game_photos/purple/hollow/diamond3.png",
  },
  {
    id: 36,
    color: "purple",
    shape: "oval",
    number: 1,
    shading: "solid",
    img: "./set_game_photos/purple/solid/oval1.png",
  },
  {
    id: 37,
    color: "purple",
    shape: "oval",
    number: 1,
    shading: "stripe",
    img: "./set_game_photos/purple/stripe/oval1.png",
  },
  {
    id: 38,
    color: "purple",
    shape: "oval",
    number: 1,
    shading: "hollow",
    img: "./set_game_photos/purple/hollow/oval1.png",
  },
  {
    id: 39,
    color: "purple",
    shape: "oval",
    number: 2,
    shading: "solid",
    img: "./set_game_photos/purple/solid/oval2.png",
  },
  {
    id: 40,
    color: "purple",
    shape: "oval",
    number: 2,
    shading: "stripe",
    img: "./set_game_photos/purple/stripe/oval2.png",
  },
  {
    id: 41,
    color: "purple",
    shape: "oval",
    number: 2,
    shading: "hollow",
    img: "./set_game_photos/purple/hollow/oval2.png",
  },
  {
    id: 42,
    color: "purple",
    shape: "oval",
    number: 3,
    shading: "solid",
    img: "./set_game_photos/purple/solid/oval3.png",
  },
  {
    id: 43,
    color: "purple",
    shape: "oval",
    number: 3,
    shading: "stripe",
    img: "./set_game_photos/purple/stripe/oval3.png",
  },
  {
    id: 44,
    color: "purple",
    shape: "oval",
    number: 3,
    shading: "hollow",
    img: "./set_game_photos/purple/hollow/oval3.png",
  },
  {
    id: 45,
    color: "purple",
    shape: "squiggle",
    number: 1,
    shading: "solid",
    img: "./set_game_photos/purple/solid/squiggle1.png",
  },
  {
    id: 46,
    color: "purple",
    shape: "squiggle",
    number: 1,
    shading: "stripe",
    img: "./set_game_photos/purple/stripe/squiggle1.png",
  },
  {
    id: 47,
    color: "purple",
    shape: "squiggle",
    number: 1,
    shading: "hollow",
    img: "./set_game_photos/purple/hollow/squiggle1.png",
  },
  {
    id: 48,
    color: "purple",
    shape: "squiggle",
    number: 2,
    shading: "solid",
    img: "./set_game_photos/purple/solid/squiggle2.png",
  },
  {
    id: 49,
    color: "purple",
    shape: "squiggle",
    number: 2,
    shading: "stripe",
    img: "./set_game_photos/purple/stripe/squiggle2.png",
  },
  {
    id: 50,
    color: "purple",
    shape: "squiggle",
    number: 2,
    shading: "hollow",
    img: "./set_game_photos/purple/hollow/squiggle2.png",
  },
  {
    id: 51,
    color: "purple",
    shape: "squiggle",
    number: 3,
    shading: "solid",
    img: "./set_game_photos/purple/solid/squiggle3.png",
  },
  {
    id: 52,
    color: "purple",
    shape: "squiggle",
    number: 3,
    shading: "stripe",
    img: "./set_game_photos/purple/stripe/squiggle3.png",
  },
  {
    id: 53,
    color: "purple",
    shape: "squiggle",
    number: 3,
    shading: "hollow",
    img: "./set_game_photos/purple/hollow/squiggle3.png",
  },
  {
    id: 54,
    color: "green",
    shape: "diamond",
    number: 1,
    shading: "solid",
    img: "./set_game_photos/green/solid/diamond1.png",
  },
  {
    id: 55,
    color: "green",
    shape: "diamond",
    number: 1,
    shading: "stripe",
    img: "./set_game_photos/green/stripe/diamond1.png",
  },
  {
    id: 56,
    color: "green",
    shape: "diamond",
    number: 1,
    shading: "hollow",
    img: "./set_game_photos/green/hollow/diamond1.png",
  },
  {
    id: 57,
    color: "green",
    shape: "diamond",
    number: 2,
    shading: "solid",
    img: "./set_game_photos/green/solid/diamond2.png",
  },
  {
    id: 58,
    color: "green",
    shape: "diamond",
    number: 2,
    shading: "stripe",
    img: "./set_game_photos/green/stripe/diamond2.png",
  },
  {
    id: 59,
    color: "green",
    shape: "diamond",
    number: 2,
    shading: "hollow",
    img: "./set_game_photos/green/hollow/diamond2.png",
  },
  {
    id: 60,
    color: "green",
    shape: "diamond",
    number: 3,
    shading: "solid",
    img: "./set_game_photos/green/solid/diamond3.png",
  },
  {
    id: 61,
    color: "green",
    shape: "diamond",
    number: 3,
    shading: "stripe",
    img: "./set_game_photos/green/stripe/diamond3.png",
  },
  {
    id: 62,
    color: "green",
    shape: "diamond",
    number: 3,
    shading: "hollow",
    img: "./set_game_photos/green/hollow/diamond3.png",
  },
  {
    id: 63,
    color: "green",
    shape: "oval",
    number: 1,
    shading: "solid",
    img: "./set_game_photos/green/solid/oval1.png",
  },
  {
    id: 64,
    color: "green",
    shape: "oval",
    number: 1,
    shading: "stripe",
    img: "./set_game_photos/green/stripe/oval1.png",
  },
  {
    id: 65,
    color: "green",
    shape: "oval",
    number: 1,
    shading: "hollow",
    img: "./set_game_photos/green/hollow/oval1.png",
  },
  {
    id: 66,
    color: "green",
    shape: "oval",
    number: 2,
    shading: "solid",
    img: "./set_game_photos/green/solid/oval2.png",
  },
  {
    id: 67,
    color: "green",
    shape: "oval",
    number: 2,
    shading: "stripe",
    img: "./set_game_photos/green/stripe/oval2.png",
  },
  {
    id: 68,
    color: "green",
    shape: "oval",
    number: 2,
    shading: "hollow",
    img: "./set_game_photos/green/hollow/oval2.png",
  },
  {
    id: 69,
    color: "green",
    shape: "oval",
    number: 3,
    shading: "solid",
    img: "./set_game_photos/green/solid/oval3.png",
  },
  {
    id: 70,
    color: "green",
    shape: "oval",
    number: 3,
    shading: "stripe",
    img: "./set_game_photos/green/stripe/oval3.png",
  },
  {
    id: 71,
    color: "green",
    shape: "oval",
    number: 3,
    shading: "hollow",
    img: "./set_game_photos/green/hollow/oval3.png",
  },
  {
    id: 72,
    color: "green",
    shape: "squiggle",
    number: 1,
    shading: "solid",
    img: "./set_game_photos/green/solid/squiggle1.png",
  },
  {
    id: 73,
    color: "green",
    shape: "squiggle",
    number: 1,
    shading: "stripe",
    img: "./set_game_photos/green/stripe/squiggle1.png",
  },
  {
    id: 74,
    color: "green",
    shape: "squiggle",
    number: 1,
    shading: "hollow",
    img: "./set_game_photos/green/hollow/squiggle1.png",
  },
  {
    id: 75,
    color: "green",
    shape: "squiggle",
    number: 2,
    shading: "solid",
    img: "./set_game_photos/green/solid/squiggle2.png",
  },
  {
    id: 76,
    color: "green",
    shape: "squiggle",
    number: 2,
    shading: "stripe",
    img: "./set_game_photos/green/stripe/squiggle2.png",
  },
  {
    id: 77,
    color: "green",
    shape: "squiggle",
    number: 2,
    shading: "hollow",
    img: "./set_game_photos/green/hollow/squiggle2.png",
  },
  {
    id: 78,
    color: "green",
    shape: "squiggle",
    number: 3,
    shading: "solid",
    img: "./set_game_photos/green/solid/squiggle3.png",
  },
  {
    id: 79,
    color: "green",
    shape: "squiggle",
    number: 3,
    shading: "stripe",
    img: "./set_game_photos/green/stripe/squiggle3.png",
  },
  {
    id: 80,
    color: "green",
    shape: "squiggle",
    number: 3,
    shading: "hollow",
    img: "./set_game_photos/green/hollow/squiggle3.png",
  },
];

// Deal a card (returns a random card ID from a card that has not been used)
function dealNewCard() {
  // Function to check if the random card is already in play
  // or has been previously played
  function checkCurrentAndUsedCards(cardID) {
    // Check the current cards in play
    for (let i = 0; i < currentCards.length; i++) {
      if (currentCards[i].id === cardID) {
        return true;
      }
    }
    // Check previously played cards
    for (let i = 0; i < usedCards.length; i++) {
      if (usedCards[i].id === cardID) {
        return true;
      }
    }
    return false;
  }
  // Generate a random card ID
  let randomCardID = Math.floor(Math.random() * 80);
  // Check if the card ID has been used
  let alreadyUsedCard = checkCurrentAndUsedCards(randomCardID);
  // Keep generating a new ID until you get an unused one
  while (alreadyUsedCard) {
    randomCardID = Math.floor(Math.random() * 80);
    alreadyUsedCard = checkCurrentAndUsedCards(randomCardID);
  }
  return randomCardID;
}

// Draw 20 cards to play the game
function dealTwentyCards() {
  for (let i = 0; i < 20; i++) {
    currentCards.push(deck[dealNewCard()]);
  }
}

// Create gameboard
function createGameboard() {
  for (let i = 0; i < 20; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    // If game has not started, set the backs to default
    if (gameOver === true) {
      cell.style.backgroundImage = `url("./set_game_photos/set_card_back.png")`;
      cell.classList.add("back-of-card");
    }
    // If game has started, show the cards
    else {
      cell.style.backgroundImage = `url(${currentCards[i].img})`;
    }
    gameCells.push(cell);
    gameboard.appendChild(cell);
  }
  cardClickActions();
}

// Erase the gameboard
function removeGameboard() {
  document.querySelectorAll(".cell").forEach((div) => div.remove());
  gameCells.splice(0, gameCells.length);
}

// Analyze if your cards make a match
function analyzeMatch() {
  let colorMatch = false;
  let shapeMatch = false;
  let numberMatch = false;
  let shadingMatch = false;

  // Check colors
  if (
    chosenCards[0].color === chosenCards[1].color &&
    chosenCards[1].color === chosenCards[2].color
  ) {
    colorMatch = true;
  } else if (
    chosenCards[0].color !== chosenCards[1].color &&
    chosenCards[1].color !== chosenCards[2].color &&
    chosenCards[0].color !== chosenCards[2].color
  ) {
    colorMatch = true;
  }

  // Check shape
  if (
    chosenCards[0].shape === chosenCards[1].shape &&
    chosenCards[1].shape === chosenCards[2].shape
  ) {
    shapeMatch = true;
  } else if (
    chosenCards[0].shape !== chosenCards[1].shape &&
    chosenCards[1].shape !== chosenCards[2].shape &&
    chosenCards[0].shape !== chosenCards[2].shape
  ) {
    shapeMatch = true;
  }

  // Check numbers
  if (
    chosenCards[0].number === chosenCards[1].number &&
    chosenCards[1].number === chosenCards[2].number
  ) {
    numberMatch = true;
  } else if (
    chosenCards[0].number !== chosenCards[1].number &&
    chosenCards[1].number !== chosenCards[2].number &&
    chosenCards[0].number !== chosenCards[2].number
  ) {
    numberMatch = true;
  }

  // Check shading
  if (
    chosenCards[0].shading === chosenCards[1].shading &&
    chosenCards[1].shading === chosenCards[2].shading
  ) {
    shadingMatch = true;
  } else if (
    chosenCards[0].shading !== chosenCards[1].shading &&
    chosenCards[1].shading !== chosenCards[2].shading &&
    chosenCards[0].shading !== chosenCards[2].shading
  ) {
    shadingMatch = true;
  }

  // If all properties are true
  if (
    colorMatch === true &&
    shapeMatch === true &&
    numberMatch === true &&
    shadingMatch === true
  ) {
    return true;
  }

  // If at least one property is false
  return false;
}

// Swap cards after getting a match
function swapCards() {
  for (let i = 0; i < 3; i++) {
    // Get the index of the current card and remove it
    let indexOfCard = currentCards.indexOf(chosenCards[i]);
    // Remove current card
    currentCards.splice(indexOfCard, 1);
    // Add the chosen cards to the usedCards array
    usedCards.push(chosenCards[i].id);
    // Deal a new card and place it into the currentCards array where
    // you removed the previous card
    currentCards.splice(indexOfCard, 0, deck[dealNewCard()]);
  }
  resetChosenCards();
  // Remove all the cells from the game so that you can redraw them
  removeGameboard();
  // Redraw all the cells
  createGameboard();
}

// Reset the chosen cards
function resetChosenCards() {
  gameCells.forEach((card) => {
    card.classList.contains("selected")
      ? card.classList.remove("selected")
      : null;
  });
  // reset the chosen cards
  chosenCards.splice(0, chosenCards.length);
}

// Clicking on game cards
function cardClickActions() {
  if (gameOver === false) {
    gameCells.forEach((card) => {
      card.addEventListener("mouseenter", function () {
        card.classList.add("card-highlight");
      });
      card.addEventListener("mouseleave", function () {
        card.classList.remove("card-highlight");
      });

      card.addEventListener("click", function () {
        // Default is that a card has not been selected
        let cardNotSelected = !card.classList.contains("selected");

        // If a card has already been selected, then deselect it
        if (card.classList.contains("selected")) {
          card.classList.remove("selected");
          cardNotSelected = false;
          chosenCards.splice(currentCards[gameCells.indexOf(card)], 1);
        }

        // If a card has not been selected, then select it.
        else {
          card.classList.toggle("selected");
        }

        // If the card has not been selected
        if (cardNotSelected) {
          // Match the card with the index of the game cell
          // Put the card object inside the chosenCard array
          chosenCards.push(currentCards[gameCells.indexOf(card)]);

          // If 3 cards have been selected, check to see if it is a match
          if (chosenCards.length === 3) {
            // If you successfully got a match
            if (analyzeMatch()) {
              swapCards();
              score += 1;
              scoreBoard.textContent = score;
            } else {
              resetChosenCards();
            }
          }
        }
      });
    });
  }
}

// Game timer
function startTimer() {
  clearInterval(countdown);
  countdown = setInterval(() => {
    // If time runs out
    if (timeLeft === 0) {
      timer.style.color = "red";
      gameOver = true;
      // Redraw the game
      removeGameboard();
      createGameboard();
      clearInterval(countdown);
    }

    // If timer is not zero, subtract a second.
    else {
      timeLeft--;
    }

    // Adjust the clock interface for single digit time
    if (timeLeft <= 9) {
      timer.textContent = `0:0${timeLeft}`;
    } else if (timeLeft > 60 && timeLeft < 70) {
      timer.textContent = `1:0${timeLeft - 60}`;
    } else if (timeLeft === 60) {
      timer.textContent = "1:00";
    } else if (timeLeft < 60) {
      timer.textContent = `0:${timeLeft}`;
    } else {
      timer.textContent = `1:${timeLeft - 60}`;
    }
  }, 1000);
}

// Deal the cards and draw the game
dealTwentyCards();
createGameboard();

// Clicking the start button
startBtn.addEventListener("click", function () {
  if (gameOver) {
    removeGameboard();
    gameOver = false;
    createGameboard();
    startTimer();
  }
});

// Clicking the play again button
resetBtn.addEventListener("click", function () {
  clearInterval(countdown);
  timeLeft = 90;
  timer.textContent = `1:30`;
  timer.style.color = "white";
  currentCards.splice(0, currentCards.length);
  dealTwentyCards();
  removeGameboard();
  gameOver = true;
  createGameboard();
  score = 0;
  scoreBoard.textContent = "0";
  chosenCards.splice(0, chosenCards.length);
});

//#endregion
