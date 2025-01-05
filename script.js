let randomDate = null;
let streak = 0;
let lives = 3;
let dateAnswered = false;

// Default year range
let startYear = 2000;
let endYear = 2100;

document.getElementById("start-year").addEventListener("input", (event) => {
  startYear = parseInt(event.target.value, 10);
  document.getElementById("start-year-display").innerText = startYear;
  ensureValidYearRange();
});

document.getElementById("end-year").addEventListener("input", (event) => {
  endYear = parseInt(event.target.value, 10);
  document.getElementById("end-year-display").innerText = endYear;
  ensureValidYearRange();
});

document.getElementById("generate-date").addEventListener("click", () => {
  randomDate = generateRandomDate();
  document.getElementById("random-date").innerText = `Random Date: ${randomDate.getDate()}/${randomDate.getMonth() + 1}/${randomDate.getFullYear()}`;
  document.getElementById("result").innerText = "";
  dateAnswered = false;
});

document.getElementById("check-answer").addEventListener("click", () => {
  if (!randomDate) {
    document.getElementById("result").innerText = "Please generate a date first!";
    return;
  }

  if (dateAnswered) {
    document.getElementById("result").innerText = "You've already answered this date! Generate a new one.";
    document.getElementById("result").style.color = "orange";
    return;
  }

  const guess = document.getElementById("guess").value.trim().toLowerCase();
  const correctDay = randomDate.toLocaleDateString("en-US", { weekday: "long" }).toLowerCase();

  if (guess === correctDay) {
    streak++;
    document.getElementById("streak").innerText = `🔥 Streak: ${streak}`;
    document.getElementById("result").innerText = "Correct! 🎉";
    document.getElementById("result").style.color = "green";
  } else {
    lives--;
    updateLivesDisplay();
    document.getElementById("result").innerText = `Wrong! The correct day is ${correctDay}.`;
    document.getElementById("result").style.color = "red";

    if (lives === 0) {
      endGame();
    }
  }

  dateAnswered = true;
});

document.getElementById("reset-game").addEventListener("click", resetGame);

function generateRandomDate() {
  const start = new Date(startYear, 0, 1);
  const end = new Date(endYear, 11, 31);
  const randomTime = start.getTime() + Math.random() * (end.getTime() - start.getTime());
  return new Date(randomTime);
}

function updateLivesDisplay() {
  const hearts = "❤️ ".repeat(lives) + "🖤 ".repeat(3 - lives);
  document.getElementById("lives").innerText = hearts.trim();
}

function ensureValidYearRange() {
  if (startYear > endYear) {
    endYear = startYear;
    document.getElementById("end-year").value = startYear;
    document.getElementById("end-year-display").innerText = startYear;
  }
}

function endGame() {
  document.getElementById("result").innerText = "Game Over! 😢 Try again.";
  document.getElementById("random-date").innerText = "Click 'Start New Game' to set a new year range.";
}

function resetGame() {
  streak = 0;
  lives = 3;
  randomDate = null;
  dateAnswered = false;
  document.getElementById("streak").innerText = "🔥 Streak: 0";
  updateLivesDisplay();
  document.getElementById("random-date").innerText = "Click 'Generate Random Date' to begin!";
  document.getElementById("result").innerText = "";
}
