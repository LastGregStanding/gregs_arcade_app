"use strict";

const rollBtn = document.querySelector(".roll_btn");
const keepBtns = document.querySelectorAll(".keep");
const playerTurn = document.querySelector(".turn");
const upperBtns = document.querySelector(".upper_btns");
const lowerBtns = document.querySelector(".lower_btns");
const zeroBtns = document.querySelector(".zero_btns");
const resetBtn = document.querySelector(".reset_btn");
let turn = 2;
let dice = [];
let rollCount = 0;
let roundScore;
// Random number 1-6
const randomNumber = () => Math.floor(Math.random() * 6 + 1);

//#region Rolling dice functionality and hovering
const rollDice = function () {
  const turnOver = document.querySelector(".turn_over");
  // Reset keep buttons for next player
  if (rollCount === 0) {
    if (turn === 1) {
      turn = 2;
    } else {
      turn = 1;
    }
    keepBtns.forEach((btn) => {
      btn.classList.remove("pressed");
      btn.style.backgroundColor = "green";
    });
    playerTurn.textContent = `Player ${turn}'s Turn`;
  }

  for (let i = 1; i < 6; i++) {
    let number = randomNumber();
    let keepBtn = document.querySelector(`#keep_${i}`);

    // Don't roll if keep button is pressed
    if (keepBtn.classList.contains("pressed")) {
      continue;
    }

    dice[i] = number;
    //Change dice image
    let diceImage = document.getElementById(`dice_${i}`);
    diceImage.src = `dice/dice-${dice[i]}.png`;
  }

  rollCount++;
  turnOver.textContent = `Roll ${rollCount}`;

  // Black out keep buttons for end of turn
  if (rollCount === 3) {
    rollCount = 0;
  }
};

rollBtn.addEventListener("click", function () {
  rollDice();
  rollBtn.classList.remove("hover");
});

rollBtn.addEventListener("mouseover", function () {
  rollBtn.classList.add("hover");
});
rollBtn.addEventListener("mouseout", function () {
  rollBtn.classList.remove("hover");
});
//#endregion

// Keep button
keepBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    if (btn.classList.contains("pressed")) {
      btn.classList.remove("hover");
      btn.style.backgroundColor = "green";
      btn.classList.remove("pressed");
    } else if (!btn.classList.contains("pressed")) {
      btn.classList.remove("hover");
      btn.style.backgroundColor = "blue";
      btn.classList.add("pressed");
    }
  });

  btn.addEventListener("mouseover", function () {
    btn.classList.add("hover");
  });
  btn.addEventListener("mouseout", function () {
    if (!btn.classList.contains("pressed")) {
      btn.style.backgroundColor = "green";
    }
    btn.classList.remove("hover");
  });
});

let addNumbers = function (dice) {
  let number = 0;
  for (let i = 0; i < dice.length; i++) {
    number += dice[i];
  }
  return number;
};
let addNumbers2 = function (dice) {
  let number = 0;
  for (let i = 1; i < dice.length; i++) {
    number += dice[i];
  }
  return number;
};

//#region Player 1 Score section
const upper1 = document.querySelector(".upper_section_1");
const upper1Arr = [];
for (let i = 0; i < 30; i++) {
  let cell = document.createElement("div");
  cell.classList.add("cell");
  upper1.appendChild(cell);
  upper1Arr.push(cell);
}

//#region Player 1 Upper Scoreboard
upper1Arr[0].textContent = "Upper Section";
upper1Arr[1].textContent = "How To Score";
upper1Arr[2].textContent = "Game Score";
upper1Arr[3].textContent = "Aces";
upper1Arr[4].textContent = "Add Aces";
upper1Arr[5].textContent = "";
upper1Arr[6].textContent = "Twos";
upper1Arr[7].textContent = "Add Twos";
upper1Arr[8].textContent = "";
upper1Arr[9].textContent = "Threes";
upper1Arr[10].textContent = "Add Threes";
upper1Arr[11].textContent = "";
upper1Arr[12].textContent = "Fours";
upper1Arr[13].textContent = "Add Fours";
upper1Arr[14].textContent = "";
upper1Arr[15].textContent = "Fives";
upper1Arr[16].textContent = "Add Fives";
upper1Arr[17].textContent = "";
upper1Arr[18].textContent = "Sixes";
upper1Arr[19].textContent = "Add Sixes";
upper1Arr[20].textContent = "";
upper1Arr[21].textContent = "Total Score";
upper1Arr[22].textContent = "------------->";
upper1Arr[23].textContent = 0;
upper1Arr[24].textContent = "Bonus >=63";
upper1Arr[25].textContent = "Score 35";
upper1Arr[26].textContent = 0;
upper1Arr[27].textContent = "Upper Total";
upper1Arr[28].textContent = "------------->";
upper1Arr[29].textContent = 0;

for (let i = 21; i < upper1Arr.length; i++) {
  upper1Arr[i].style.backgroundColor = "cyan";
}

upper1Arr[0].style.backgroundColor = "orange";
upper1Arr[1].style.backgroundColor = "orange";
upper1Arr[2].style.backgroundColor = "orange";

//#endregion

const lower1 = document.querySelector(".lower_section_1");
const lower1Arr = [];
for (let i = 0; i < 33; i++) {
  let cell = document.createElement("div");
  cell.classList.add("cell");
  lower1.appendChild(cell);
  lower1Arr.push(cell);
}

//#region Player 1 Lower Scoreboard
lower1Arr[0].textContent = "Lower Section";
lower1Arr[1].textContent = "How To Score";
lower1Arr[2].textContent = "Game Score";
lower1Arr[3].textContent = "3 of a kind";
lower1Arr[4].textContent = "Add All Dice";
lower1Arr[5].textContent = "";
lower1Arr[6].textContent = "4 of a kind";
lower1Arr[7].textContent = "Add All Dice";
lower1Arr[8].textContent = "";
lower1Arr[9].textContent = "Full House";
lower1Arr[10].textContent = "Score 25";
lower1Arr[11].textContent = "";
lower1Arr[12].textContent = "Sm. Straight";
lower1Arr[13].textContent = "Score 30";
lower1Arr[14].textContent = "";
lower1Arr[15].textContent = "Lg. Straight";
lower1Arr[16].textContent = "Score 40";
lower1Arr[17].textContent = "";
lower1Arr[18].textContent = "Yahtzee!";
lower1Arr[19].textContent = "Score 50";
lower1Arr[20].textContent = "";
lower1Arr[21].textContent = "Chance";
lower1Arr[22].textContent = "Add All Dice";
lower1Arr[23].textContent = "";
lower1Arr[24].textContent = "Lower Score";
lower1Arr[25].textContent = "------------->";
lower1Arr[26].textContent = 0;
lower1Arr[27].textContent = "Upper Total";
lower1Arr[28].textContent = "------------->";
lower1Arr[29].textContent = 0;
lower1Arr[30].textContent = "Grand Total";
lower1Arr[31].textContent = "------------->";
lower1Arr[32].textContent = 0;

for (let i = 24; i < lower1Arr.length; i++) {
  lower1Arr[i].style.backgroundColor = "cyan";
}

lower1Arr[0].style.backgroundColor = "orange";
lower1Arr[1].style.backgroundColor = "orange";
lower1Arr[2].style.backgroundColor = "orange";
//#endregion
//#endregion

//#region Player 2 Score section
const upper2 = document.querySelector(".upper_section_2");
const upper2Arr = [];
for (let i = 0; i < 30; i++) {
  let cell = document.createElement("div");
  cell.classList.add("cell");
  upper2.appendChild(cell);
  upper2Arr.push(cell);
}

//#region Player 2 Upper Scoreboard
upper2Arr[0].textContent = "Upper Section";
upper2Arr[1].textContent = "How To Score";
upper2Arr[2].textContent = "Game Score";
upper2Arr[3].textContent = "Aces";
upper2Arr[4].textContent = "Add Aces";
upper2Arr[5].textContent = "";
upper2Arr[6].textContent = "Twos";
upper2Arr[7].textContent = "Add Twos";
upper2Arr[8].textContent = "";
upper2Arr[9].textContent = "Threes";
upper2Arr[10].textContent = "Add Threes";
upper2Arr[11].textContent = "";
upper2Arr[12].textContent = "Fours";
upper2Arr[13].textContent = "Add Fours";
upper2Arr[14].textContent = "";
upper2Arr[15].textContent = "Fives";
upper2Arr[16].textContent = "Add Fives";
upper2Arr[17].textContent = "";
upper2Arr[18].textContent = "Sixes";
upper2Arr[19].textContent = "Add Sixes";
upper2Arr[20].textContent = "";
upper2Arr[21].textContent = "Total Score";
upper2Arr[22].textContent = "------------->";
upper2Arr[23].textContent = 0;
upper2Arr[24].textContent = "Bonus >=63";
upper2Arr[25].textContent = "Score 35";
upper2Arr[26].textContent = 0;
upper2Arr[27].textContent = "Upper Total";
upper2Arr[28].textContent = "------------->";
upper2Arr[29].textContent = 0;

for (let i = 21; i < upper2Arr.length; i++) {
  upper2Arr[i].style.backgroundColor = "cyan";
}

upper2Arr[0].style.backgroundColor = "orange";
upper2Arr[1].style.backgroundColor = "orange";
upper2Arr[2].style.backgroundColor = "orange";

//#endregion

const lower2 = document.querySelector(".lower_section_2");
const lower2Arr = [];
for (let i = 0; i < 33; i++) {
  let cell = document.createElement("div");
  cell.classList.add("cell");
  lower2.appendChild(cell);
  lower2Arr.push(cell);
}

//#region Player 2 Lower Scoreboard
lower2Arr[0].textContent = "Lower Section";
lower2Arr[1].textContent = "How To Score";
lower2Arr[2].textContent = "Game Score";
lower2Arr[3].textContent = "3 of a kind";
lower2Arr[4].textContent = "Add All Dice";
lower2Arr[5].textContent = "";
lower2Arr[6].textContent = "4 of a kind";
lower2Arr[7].textContent = "Add All Dice";
lower2Arr[8].textContent = "";
lower2Arr[9].textContent = "Full House";
lower2Arr[10].textContent = "Score 25";
lower2Arr[11].textContent = "";
lower2Arr[12].textContent = "Sm. Straight";
lower2Arr[13].textContent = "Score 30";
lower2Arr[14].textContent = "";
lower2Arr[15].textContent = "Lg. Straight";
lower2Arr[16].textContent = "Score 40";
lower2Arr[17].textContent = "";
lower2Arr[18].textContent = "Yahtzee!";
lower2Arr[19].textContent = "Score 50";
lower2Arr[20].textContent = "";
lower2Arr[21].textContent = "Chance";
lower2Arr[22].textContent = "Add All Dice";
lower2Arr[23].textContent = "";
lower2Arr[24].textContent = "Lower Score";
lower2Arr[25].textContent = "------------->";
lower2Arr[26].textContent = 0;
lower2Arr[27].textContent = "Upper Total";
lower2Arr[28].textContent = "------------->";
lower2Arr[29].textContent = 0;
lower2Arr[30].textContent = "Grand Total";
lower2Arr[31].textContent = "------------->";
lower2Arr[32].textContent = 0;

for (let i = 24; i < lower2Arr.length; i++) {
  lower2Arr[i].style.backgroundColor = "cyan";
}

lower2Arr[0].style.backgroundColor = "orange";
lower2Arr[1].style.backgroundColor = "orange";
lower2Arr[2].style.backgroundColor = "orange";
//#endregion
//#endregion

//#region Upper Buttons
let btns = [];
for (let i = 5; i < 21; i += 3) {
  let btn = document.createElement("button");
  btn.textContent = "Choose";
  btn.classList.add("choose_btn");
  upperBtns.appendChild(btn);
  switch (i) {
    case 5:
      btn.classList.add("aces");
      break;
    case 8:
      btn.classList.add("twos");
      break;
    case 11:
      btn.classList.add("threes");
      break;
    case 14:
      btn.classList.add("fours");
      break;
    case 17:
      btn.classList.add("fives");
      break;
    case 20:
      btn.classList.add("sixes");
      break;
  }
  btns.push(btn);
}

btns.forEach((btn) => {
  btn.addEventListener("mouseover", function () {
    btn.classList.add("hover");
  });
  btn.addEventListener("mouseout", function () {
    btn.classList.remove("hover");
  });

  btn.addEventListener("click", function () {
    btn.classList.remove("hover");

    // Aces
    if (btn.classList.contains("aces")) {
      let ones = dice.filter((e) => {
        if (e === 1) {
          return e;
        }
      });
      roundScore = addNumbers(ones);
      if (turn === 1) {
        if (upper1Arr[5].textContent === "") {
          upper1Arr[5].classList.add("score_number");
          upper1Arr[5].textContent = roundScore;
        }
      } else {
        if (upper2Arr[5].textContent === "") {
          upper2Arr[5].classList.add("score_number");
          upper2Arr[5].textContent = roundScore;
        }
      }
    }

    // Twos
    else if (btn.classList.contains("twos")) {
      let twos = dice.filter((e) => {
        if (e === 2) {
          return e;
        }
      });
      roundScore = addNumbers(twos);
      if (turn === 1) {
        if (upper1Arr[8].textContent === "") {
          upper1Arr[8].classList.add("score_number");
          upper1Arr[8].textContent = roundScore;
        }
      } else {
        if (upper2Arr[8].textContent === "") {
          upper2Arr[8].classList.add("score_number");
          upper2Arr[8].textContent = roundScore;
        }
      }
    }

    // Threes
    else if (btn.classList.contains("threes")) {
      let threes = dice.filter((e) => {
        if (e === 3) {
          return e;
        }
      });
      roundScore = addNumbers(threes);
      if (turn === 1) {
        if (upper1Arr[11].textContent === "") {
          upper1Arr[11].classList.add("score_number");
          upper1Arr[11].textContent = roundScore;
        }
      } else {
        if (upper2Arr[11].textContent === "") {
          upper2Arr[11].classList.add("score_number");
          upper2Arr[11].textContent = roundScore;
        }
      }
    }

    // Fours
    else if (btn.classList.contains("fours")) {
      let fours = dice.filter((e) => {
        if (e === 4) {
          return e;
        }
      });
      roundScore = addNumbers(fours);
      if (turn === 1) {
        if (upper1Arr[14].textContent === "") {
          upper1Arr[14].classList.add("score_number");
          upper1Arr[14].textContent = roundScore;
        }
      } else {
        if (upper2Arr[14].textContent === "") {
          upper2Arr[14].classList.add("score_number");
          upper2Arr[14].textContent = roundScore;
        }
      }
    }

    // Fives
    else if (btn.classList.contains("fives")) {
      let fives = dice.filter((e) => {
        if (e === 5) {
          return e;
        }
      });
      roundScore = addNumbers(fives);
      if (turn === 1) {
        if (upper1Arr[17].textContent === "") {
          upper1Arr[17].classList.add("score_number");
          upper1Arr[17].textContent = roundScore;
        }
      } else {
        if (upper2Arr[17].textContent === "") {
          upper2Arr[17].classList.add("score_number");
          upper2Arr[17].textContent = roundScore;
        }
      }
    }

    // Sixes
    else if (btn.classList.contains("sixes")) {
      let sixes = dice.filter((e) => {
        if (e === 6) {
          return e;
        }
      });
      roundScore = addNumbers(sixes);
      if (turn === 1) {
        if (upper1Arr[20].textContent === "") {
          upper1Arr[20].classList.add("score_number");
          upper1Arr[20].textContent = roundScore;
        }
      } else {
        if (upper2Arr[20].textContent === "") {
          upper2Arr[20].classList.add("score_number");
          upper2Arr[20].textContent = roundScore;
        }
      }
    }
    checkScore();
    gameOver();
  });
});
//#endregion

//#region Bottom Buttons
let btns2 = [];
for (let i = 5; i < 24; i += 3) {
  let btn = document.createElement("button");
  btn.textContent = "Choose";
  btn.classList.add("choose_btn2");
  lowerBtns.appendChild(btn);
  switch (i) {
    case 5:
      btn.classList.add("three_kind");
      break;
    case 8:
      btn.classList.add("four_kind");
      break;
    case 11:
      btn.classList.add("full_house");
      break;
    case 14:
      btn.classList.add("small_straight");
      break;
    case 17:
      btn.classList.add("large_straight");
      break;
    case 20:
      btn.classList.add("yahtzee");
      break;
    case 23:
      btn.classList.add("chance");
      break;
  }
  btns2.push(btn);
}

btns2.forEach((btn) => {
  btn.addEventListener("mouseover", function () {
    btn.classList.add("hover");
  });
  btn.addEventListener("mouseout", function () {
    btn.classList.remove("hover");
  });
  btn.addEventListener("click", function () {
    btn.classList.remove("hover");
    // 3 of a Kind
    if (btn.classList.contains("three_kind")) {
      roundScore = addNumbers2(dice);
      if (turn === 1) {
        if (lower1Arr[5].textContent === "") {
          lower1Arr[5].classList.add("score_number");
          lower1Arr[5].textContent = roundScore;
        }
      } else {
        if (lower2Arr[5].textContent === "") {
          lower2Arr[5].classList.add("score_number");
          lower2Arr[5].textContent = roundScore;
        }
      }
    }

    // 4 of a kind
    else if (btn.classList.contains("four_kind")) {
      roundScore = addNumbers2(dice);
      if (turn === 1) {
        if (lower1Arr[8].textContent === "") {
          lower1Arr[8].classList.add("score_number");
          lower1Arr[8].textContent = roundScore;
        }
      } else {
        if (lower2Arr[8].textContent === "") {
          lower2Arr[8].classList.add("score_number");
          lower2Arr[8].textContent = roundScore;
        }
      }
    }

    // Full House
    else if (btn.classList.contains("full_house")) {
      roundScore = 25;
      if (turn === 1) {
        if (lower1Arr[11].textContent === "") {
          lower1Arr[11].classList.add("score_number");
          lower1Arr[11].textContent = roundScore;
        }
      } else {
        if (lower2Arr[11].textContent === "") {
          lower2Arr[11].classList.add("score_number");
          lower2Arr[11].textContent = roundScore;
        }
      }
    }

    // Small Straight
    else if (btn.classList.contains("small_straight")) {
      roundScore = 30;
      if (turn === 1) {
        if (lower1Arr[14].textContent === "") {
          lower1Arr[14].classList.add("score_number");
          lower1Arr[14].textContent = roundScore;
        }
      } else {
        if (lower2Arr[14].textContent === "") {
          lower2Arr[14].classList.add("score_number");
          lower2Arr[14].textContent = roundScore;
        }
      }
    }

    // Large Straight
    else if (btn.classList.contains("large_straight")) {
      roundScore = 40;
      if (turn === 1) {
        if (lower1Arr[17].textContent === "") {
          lower1Arr[17].classList.add("score_number");
          lower1Arr[17].textContent = roundScore;
        }
      } else {
        if (lower2Arr[17].textContent === "") {
          lower2Arr[17].classList.add("score_number");
          lower2Arr[17].textContent = roundScore;
        }
      }
    }

    // Yahtzee
    else if (btn.classList.contains("yahtzee")) {
      roundScore = 50;
      if (turn === 1) {
        if (lower1Arr[20].textContent === "") {
          lower1Arr[20].classList.add("score_number");
          lower1Arr[20].textContent = roundScore;
        }
      } else {
        if (lower2Arr[20].textContent === "") {
          lower2Arr[20].classList.add("score_number");
          lower2Arr[20].textContent = roundScore;
        }
      }
    }

    // Chance
    else if (btn.classList.contains("chance")) {
      roundScore = addNumbers2(dice);
      if (turn === 1) {
        if (lower1Arr[23].textContent === "") {
          lower1Arr[23].classList.add("score_number");
          lower1Arr[23].textContent = roundScore;
        }
      } else {
        if (lower2Arr[23].textContent === "") {
          lower2Arr[23].classList.add("score_number");
          lower2Arr[23].textContent = roundScore;
        }
      }
    }
    checkScore();
    gameOver();
  });
});

// Buttons for zero
let btns0 = [];
for (let i = 5; i < 24; i += 3) {
  let btn = document.createElement("button");
  btn.textContent = "Zero";
  btn.classList.add("choose_btn_zero");
  zeroBtns.appendChild(btn);
  switch (i) {
    case 5:
      btn.classList.add("three_kind");
      break;
    case 8:
      btn.classList.add("four_kind");
      break;
    case 11:
      btn.classList.add("full_house");
      break;
    case 14:
      btn.classList.add("small_straight");
      break;
    case 17:
      btn.classList.add("large_straight");
      break;
    case 20:
      btn.classList.add("yahtzee");
      break;
    case 23:
      btn.classList.add("chance");
      break;
  }
  btns0.push(btn);
}

btns0.forEach((btn) => {
  btn.addEventListener("mouseover", function () {
    btn.classList.add("hover");
  });
  btn.addEventListener("mouseout", function () {
    btn.classList.remove("hover");
  });
  btn.addEventListener("click", function () {
    btn.classList.remove("hover");
    // 3 of a Kind
    if (btn.classList.contains("three_kind")) {
      roundScore = 0;
      if (turn === 1) {
        if (lower1Arr[5].textContent === "") {
          lower1Arr[5].classList.add("score_number");
          lower1Arr[5].textContent = roundScore;
        }
      } else {
        if (lower2Arr[5].textContent === "") {
          lower2Arr[5].classList.add("score_number");
          lower2Arr[5].textContent = roundScore;
        }
      }
    }

    // 4 of a kind
    else if (btn.classList.contains("four_kind")) {
      roundScore = 0;
      if (turn === 1) {
        if (lower1Arr[8].textContent === "") {
          lower1Arr[8].classList.add("score_number");
          lower1Arr[8].textContent = roundScore;
        }
      } else {
        if (lower2Arr[8].textContent === "") {
          lower2Arr[8].classList.add("score_number");
          lower2Arr[8].textContent = roundScore;
        }
      }
    }

    // Full House
    else if (btn.classList.contains("full_house")) {
      roundScore = 0;
      if (turn === 1) {
        if (lower1Arr[11].textContent === "") {
          lower1Arr[11].classList.add("score_number");
          lower1Arr[11].textContent = roundScore;
        }
      } else {
        if (lower2Arr[11].textContent === "") {
          lower2Arr[11].classList.add("score_number");
          lower2Arr[11].textContent = roundScore;
        }
      }
    }

    // Small Straight
    else if (btn.classList.contains("small_straight")) {
      roundScore = 0;
      if (turn === 1) {
        if (lower1Arr[14].textContent === "") {
          lower1Arr[14].classList.add("score_number");
          lower1Arr[14].textContent = roundScore;
        }
      } else {
        if (lower2Arr[14].textContent === "") {
          lower2Arr[14].classList.add("score_number");
          lower2Arr[14].textContent = roundScore;
        }
      }
    }

    // Large Straight
    else if (btn.classList.contains("large_straight")) {
      roundScore = 0;
      if (turn === 1) {
        if (lower1Arr[17].textContent === "") {
          lower1Arr[17].classList.add("score_number");
          lower1Arr[17].textContent = roundScore;
        }
      } else {
        if (lower2Arr[17].textContent === "") {
          lower2Arr[17].classList.add("score_number");
          lower2Arr[17].textContent = roundScore;
        }
      }
    }

    // Yahtzee
    else if (btn.classList.contains("yahtzee")) {
      roundScore = 0;
      if (turn === 1) {
        if (lower1Arr[20].textContent === "") {
          lower1Arr[20].classList.add("score_number");
          lower1Arr[20].textContent = roundScore;
        }
      } else {
        if (lower2Arr[20].textContent === "") {
          lower2Arr[20].classList.add("score_number");
          lower2Arr[20].textContent = roundScore;
        }
      }
    }

    // Chance
    else if (btn.classList.contains("chance")) {
      roundScore = 0;
      if (turn === 1) {
        if (lower1Arr[23].textContent === "") {
          lower1Arr[23].classList.add("score_number");
          lower1Arr[23].textContent = roundScore;
        }
      } else {
        if (lower2Arr[23].textContent === "") {
          lower2Arr[23].classList.add("score_number");
          lower2Arr[23].textContent = roundScore;
        }
      }
    }
    checkScore();
    gameOver();
  });
});
//#endregion

//#region Scoring
const upper2Score = [];
const upper3Score = [];
const upper4Score = [];
let player1ScoreTotal;
let player2ScoreTotal;

const checkScore = function () {
  // Player 1 upper score
  const upper1Score = [
    Number(upper1Arr[5].textContent),
    Number(upper1Arr[8].textContent),
    Number(upper1Arr[11].textContent),
    Number(upper1Arr[14].textContent),
    Number(upper1Arr[17].textContent),
    Number(upper1Arr[20].textContent),
  ];
  let totalScore = 0;
  for (let i = 0; i < upper1Score.length; i++) {
    totalScore += upper1Score[i];
  }
  upper1Arr[23].textContent = totalScore;
  if (totalScore >= 63) {
    totalScore += 35;
    upper1Arr[26].textContent = 35;
  } else {
    upper1Arr[26].textContent = 0;
  }
  upper1Arr[29].textContent = totalScore;
  lower1Arr[29].textContent = totalScore;

  // Player 2 upper score
  const upper2Score = [
    Number(upper2Arr[5].textContent),
    Number(upper2Arr[8].textContent),
    Number(upper2Arr[11].textContent),
    Number(upper2Arr[14].textContent),
    Number(upper2Arr[17].textContent),
    Number(upper2Arr[20].textContent),
  ];
  totalScore = 0;
  for (let i = 0; i < upper2Score.length; i++) {
    totalScore += upper2Score[i];
  }
  upper2Arr[23].textContent = totalScore;
  if (totalScore >= 63) {
    totalScore += 35;
    upper2Arr[26].textContent = 35;
  } else {
    upper2Arr[26].textContent = 0;
  }
  upper2Arr[29].textContent = totalScore;
  lower2Arr[29].textContent = totalScore;

  // Player 1 lower score
  const lower1Score = [
    Number(lower1Arr[5].textContent),
    Number(lower1Arr[8].textContent),
    Number(lower1Arr[11].textContent),
    Number(lower1Arr[14].textContent),
    Number(lower1Arr[17].textContent),
    Number(lower1Arr[20].textContent),
    Number(lower1Arr[23].textContent),
  ];
  totalScore = 0;
  for (let i = 0; i < lower1Score.length; i++) {
    totalScore += lower1Score[i];
  }
  lower1Arr[26].textContent = totalScore;
  lower1Arr[32].textContent = totalScore + Number(lower1Arr[29].textContent);

  // Player 2 lower score
  const lower2Score = [
    Number(lower2Arr[5].textContent),
    Number(lower2Arr[8].textContent),
    Number(lower2Arr[11].textContent),
    Number(lower2Arr[14].textContent),
    Number(lower2Arr[17].textContent),
    Number(lower2Arr[20].textContent),
    Number(lower2Arr[23].textContent),
  ];
  totalScore = 0;
  for (let i = 0; i < lower2Score.length; i++) {
    totalScore += lower2Score[i];
  }
  lower2Arr[26].textContent = totalScore;
  lower2Arr[32].textContent = totalScore + Number(lower2Arr[29].textContent);
};
//#endregion

// Game over scenario!
const gameOver = function () {
  if (
    upper1Arr.every((element) => element.textContent !== "") &&
    upper2Arr.every((element) => element.textContent !== "") &&
    lower1Arr.every((element) => element.textContent !== "") &&
    lower2Arr.every((element) => element.textContent !== "")
  ) {
    if (Number(lower1Arr[32].textContent) > Number(lower2Arr[32].textContent)) {
      lower1Arr[32].style.backgroundColor = "green";
      lower2Arr[32].style.backgroundColor = "red";
    } else if (
      Number(lower1Arr[32].textContent) < Number(lower2Arr[32].textContent)
    ) {
      lower1Arr[32].style.backgroundColor = "red";
      lower2Arr[32].style.backgroundColor = "green";
    } else {
      lower1Arr[32].style.backgroundColor = "pink";
      lower2Arr[32].style.backgroundColor = "pink";
    }
  }
};

//#region reset game button
resetBtn.addEventListener("mouseover", function () {
  resetBtn.classList.add("hover");
});
resetBtn.addEventListener("mouseout", function () {
  resetBtn.classList.remove("hover");
});

resetBtn.addEventListener("click", function () {
  resetBtn.classList.remove("hover");
  turn = 2;
  rollCount = 0;
  roundScore = 0;
  playerTurn.textContent = `Player 1's Turn`;
  const turnOver = document.querySelector(".turn_over");
  turnOver.textContent = "Roll";

  // Reset Keep Buttons
  keepBtns.forEach((btn) => {
    if (btn.classList.contains("pressed")) {
      btn.classList.remove("pressed");
    }
    btn.style.backgroundColor = "green";
  });

  // Reset Dice
  for (let i = 1; i < dice.length; i++) {
    let diceImage = document.getElementById(`dice_${i}`);
    diceImage.src = `dice/dice-1.png`;
  }

  //#region Scorecard reset
  lower1Arr[32].style.backgroundColor = "cyan";
  lower2Arr[32].style.backgroundColor = "cyan";
  upper1Arr[5].textContent = "";
  upper1Arr[8].textContent = "";
  upper1Arr[11].textContent = "";
  upper1Arr[14].textContent = "";
  upper1Arr[17].textContent = "";
  upper1Arr[20].textContent = "";
  upper1Arr[23].textContent = 0;
  upper1Arr[26].textContent = 0;
  upper1Arr[29].textContent = 0;
  lower1Arr[5].textContent = "";
  lower1Arr[8].textContent = "";
  lower1Arr[11].textContent = "";
  lower1Arr[14].textContent = "";
  lower1Arr[17].textContent = "";
  lower1Arr[20].textContent = "";
  lower1Arr[23].textContent = "";
  lower1Arr[26].textContent = 0;
  lower1Arr[29].textContent = 0;
  lower1Arr[32].textContent = 0;
  upper2Arr[5].textContent = "";
  upper2Arr[8].textContent = "";
  upper2Arr[11].textContent = "";
  upper2Arr[14].textContent = "";
  upper2Arr[17].textContent = "";
  upper2Arr[20].textContent = "";
  upper2Arr[23].textContent = 0;
  upper2Arr[26].textContent = 0;
  upper2Arr[29].textContent = 0;
  lower2Arr[5].textContent = "";
  lower2Arr[8].textContent = "";
  lower2Arr[11].textContent = "";
  lower2Arr[14].textContent = "";
  lower2Arr[17].textContent = "";
  lower2Arr[20].textContent = "";
  lower2Arr[23].textContent = "";
  lower2Arr[26].textContent = 0;
  lower2Arr[29].textContent = 0;
  lower2Arr[32].textContent = 0;
  //#endregion
});
//#endregion
