let randomDate = null;
let streak = 0;
let lives = 3;
let dateAnswered = false;

// Default year range
let startYear = 1700;
let endYear = 2300;

const startYearInput = document.getElementById("input-start-year");
const endYearInput = document.getElementById("input-end-year");
const yearRangeDisplay = document.getElementById("year-range-display");
const actionButton = document.getElementById("generate-date");
const guessInput = document.getElementById("guess");
const resultDisplay = document.getElementById("result");
const randomDateDisplay = document.getElementById("random-date");

// Validate and update year range
startYearInput.addEventListener("input", () => {
  startYear = parseInt(startYearInput.value, 10);
  if (isNaN(startYear)) startYear = 1700; // Fallback if input is empty or invalid
  if (startYear > endYear) {
    startYear = endYear;
    startYearInput.value = startYear;
  }
  updateYearRangeDisplay();
});

endYearInput.addEventListener("input", () => {
  endYear = parseInt(endYearInput.value, 10);
  if (isNaN(endYear)) endYear = 2300; // Fallback if input is empty or invalid
  if (endYear < startYear) {
    endYear = startYear;
    endYearInput.value = endYear;
  }
  updateYearRangeDisplay();
});

// Handle button clicks
actionButton.addEventListener("click", () => {
  if (actionButton.innerText === "Generate Random Date") {
    generateRandomDate();
  } else {
    checkAnswer();
  }
});

function generateRandomDate() {
  randomDate = generateRandomDateHelper();
  randomDateDisplay.innerText = `Random Date: ${randomDate.getDate()}/${randomDate.getMonth() + 1}/${randomDate.getFullYear()}`;
  resultDisplay.innerText = "";
  guessInput.value = ""; // Clear previous guess
  dateAnswered = false;

  // Switch to "Check Answer" button
  actionButton.innerText = "Check Answer";
}

function checkAnswer() {
  if (!randomDate) {
    resultDisplay.innerText = "Please generate a date first!";
    return;
  }

  if (dateAnswered) {
    resultDisplay.innerText = "You've already answered this date! Generate a new one.";
    resultDisplay.style.color = "orange";
    return;
  }

  const guess = guessInput.value.trim().toLowerCase();
  const correctDay = randomDate.toLocaleDateString("en-US", { weekday: "long" }).toLowerCase();

  if (guess === correctDay) {
    streak++;
    document.getElementById("streak").innerText = `🔥 Streak: ${streak}`;
    resultDisplay.innerText = "Correct! 🎉";
    resultDisplay.style.color = "green";
  } else {
    lives--;
    updateLivesDisplay();
    resultDisplay.innerText = `Wrong! The correct day is ${correctDay}.`;
    resultDisplay.style.color = "red";

    if (lives === 0) {
      endGame();
    }
  }

  dateAnswered = true;

  // Switch back to "Generate Random Date" button
  actionButton.innerText = "Generate Random Date";
}

function generateRandomDateHelper() {
  const start = new Date(startYear, 0, 1);
  const end = new Date(endYear, 11, 31);
  const randomTime = start.getTime() + Math.random() * (end.getTime() - start.getTime());
  return new Date(randomTime);
}

function updateYearRangeDisplay() {
  yearRangeDisplay.innerText = `${startYear} - ${endYear}`;
}

function updateLivesDisplay() {
  const hearts = "❤️ ".repeat(lives) + "🖤 ".repeat(3 - lives);
  document.getElementById("lives").innerText = hearts.trim();
}

function endGame() {
  resultDisplay.innerText = "Game Over! 😢 Try again.";
  randomDateDisplay.innerText = "Click 'Start New Game' to set a new year range.";
  actionButton.innerText = "Generate Random Date"; // Reset button text
}

document.getElementById("reset-game").addEventListener("click", resetGame);

function resetGame() {
  streak = 0;
  lives = 3;
  randomDate = null;
  dateAnswered = false;
  document.getElementById("streak").innerText = "🔥 Streak: 0";
  updateLivesDisplay();
  randomDateDisplay.innerText = "Click 'Generate Random Date' to begin!";
  resultDisplay.innerText = "";
  guessInput.value = "";
  actionButton.innerText = "Generate Random Date"; // Reset button text
}
