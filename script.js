'use strict';

//Player 1
const playerA = document.querySelector('.player--0');
const playerA_score = document.querySelector('#score--0');
const playerA_currentScore = document.querySelector('#current--0');
//Player 2
const playerB = document.querySelector('.player--1');
const playerB_score = document.querySelector('#score--1');
const playerB_currentScore = document.querySelector('#current--1');
//Buttons
const btn_New = document.querySelector('.btn--new');
const btn_Roll = document.querySelector('.btn--roll');
const btn_Hold = document.querySelector('.btn--hold');
// Dice image
const dice = document.querySelector('.dice');

let scores, currentScore, activePlayer, playing;

// Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  playerA_score.textContent = 0;
  playerB_score.textContent = 0;
  playerA_currentScore.textContent = 0;
  playerB_currentScore.textContent = 0;

  dice.classList.add('hidden');
  playerA.classList.remove('player--winner');
  playerB.classList.remove('player--winner');
  playerA.classList.add('player--active');
  playerB.classList.remove('player--active');
};
init();

// Roll dice fucntion
function rollDice() {
  let diceRoll = Math.floor(Math.random() * 6);
  switch (diceRoll) {
    case 1:
      dice.src = 'dice-1.png';
      break;
    case 2:
      dice.src = 'dice-2.png';
      break;
    case 3:
      dice.src = 'dice-3.png';
      break;
    case 4:
      dice.src = 'dice-4.png';
      break;
    case 5:
      dice.src = 'dice-5.png';
      break;
    case 6:
      dice.src = 'dice-6.png';
      break;
    default:
  }
  return diceRoll;
}
// Switch player function
function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerA.classList.toggle('player--active');
  playerB.classList.toggle('player--active');
}

// Roll button
btn_Roll.addEventListener('click', function () {
  if (playing) {
    // 1. Roll the dice and diplay result
    let diceRoll = rollDice();
    dice.classList.remove('hidden');
    // 2. Check for 1
    if (diceRoll !== 1) {
      currentScore += diceRoll;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});
// Hold button
btn_Hold.addEventListener('click', function () {
  if (playing) {
    //1. Add current score to total Score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish game
      playing = false;
      dice.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});
// New button
btn_New.addEventListener('click', function () {
  init();
});
