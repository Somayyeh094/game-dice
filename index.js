const player1 = document.querySelector(".player-1");
const player2 = document.querySelector(".player-2");
const imgDice = document.querySelector(".img-dice");
let currentSum, totalScore, i, playing;

function initialization() {
  currentSum = 0;
  totalScore = [0, 0];
  i = 1;
  playing = true;
  document.querySelector(".winner-1").classList.add("hidden");
  document.querySelector(".winner-2").classList.add("hidden");
  document.querySelector(".current-scores-1").style.top = "15vh";
  document.querySelector(".current-scores-2").style.top = "15vh";
  document.querySelector(".player-1").classList.remove("player-winner");
  document.querySelector(".player-2").classList.remove("player-winner");
  document.getElementById("totalScore-1").textContent = 0;
  document.getElementById("totalScore-2").textContent = 0;
  player1.classList.add("player--active");
  player2.classList.remove("player--active");
}
initialization();

function currentScoring(number) {
  currentSum += number;
  document.getElementById(`currentScore-${i}`).textContent = currentSum;
}
function switchPlayer() {
  currentSum = 0;
  document.getElementById(`currentScore-${i}`).textContent = currentSum;
  i = i === 1 ? 2 : 1;
  player1.classList.toggle("player--active");
  player2.classList.toggle("player--active");
}
// Button Roll Dice
document.getElementById("rollDice").addEventListener("click", function () {
  if (playing) {
    const diceNumber = Math.trunc(Math.random() * 6) + 1;

    imgDice.src = `./images/dice-${diceNumber}.svg`;
    imgDice.classList.remove("hidden");
    if (diceNumber !== 1) {
      currentScoring(diceNumber);
    } else {
      switchPlayer();
    }
  }
});

//Button Hold Scores

document.getElementById("holdScore").addEventListener("click", function () {
  if (playing) {
    totalScore[i - 1] += currentSum;
    document.getElementById(`totalScore-${i}`).textContent = totalScore[i - 1];

    if (totalScore[i - 1] >= 10) {
      document.querySelector(`.player-${i}`).classList.add("player-winner");
      imgDice.classList.add("hidden");
      currentSum = 0;
      document.getElementById(`currentScore-${i}`).textContent = currentSum;
      document.querySelector(`.winner-${i}`).classList.remove("hidden");
      document.querySelector(`.current-scores-${i}`).style.top = "1.5vh";
      playing = false;
    } else {
      switchPlayer();
    }
  }
});

document.getElementById("newGame").addEventListener("click", initialization);
