fetch("navbar.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("navbar").innerHTML = data;

    // Attach event listeners after the navbar is loaded
    const hamburgerMenu = document.getElementById("hamburgerMenu");
    const navMenu = document.getElementById("navMenu");

    hamburgerMenu.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
    document.addEventListener("click", (event) => {
      const navMenu = document.getElementById("navMenu");
      const hamburgerMenu = document.getElementById("hamburgerMenu");

      if (
        !navMenu.contains(event.target) &&
        !hamburgerMenu.contains(event.target)
      ) {
        navMenu.classList.remove("active");
      }
    });
  })

  .catch((error) => console.error("Error loading navbar:", error));

const guessInput = document.getElementById("guessInput");
const feedbackBox = document.getElementById("feedbackBox");

// Difficulty Buttons
const easyButton = document.getElementById("easyButton");
const intermediateButton = document.getElementById("intermediateButton");
const hardButton = document.getElementById("hardButton");

let isTimerStarted = false; // Flag to track if the timer has started

document.addEventListener("DOMContentLoaded", () => {
  // Initialize the game after the DOM is loaded
  updateDifficultyButtons();
});

// Game Variables
let currentMode = "easy"; // Default mode is Easy
let code = generateEasyCode(4); // Generate a random 4-character code for Easy mode
let attempts = 0;
let unlockedModes = ["easy"]; // Initially, only Easy mode is unlocked

console.log(`Generated Code for ${currentMode} mode: ${code}`);

// Initialize Difficulty Buttons
function updateDifficultyButtons() {
  // Set the button text based on the unlockedModes array
  easyButton.innerText = "Easy";
  intermediateButton.innerText = unlockedModes.includes("intermediate")
    ? "Intermediate"
    : "Intermediate 🔒";
  hardButton.innerText = unlockedModes.includes("hard") ? "Hard" : "Hard 🔒";

  // Disable locked buttons
  intermediateButton.disabled = !unlockedModes.includes("intermediate");
  hardButton.disabled = !unlockedModes.includes("hard");

  // Update styles for locked buttons
  const buttons = [intermediateButton, hardButton];
  buttons.forEach((button) => {
    if (button.disabled) {
      button.style.cursor = "not-allowed";
      button.style.opacity = 0.5;
      button.classList.add("locked"); // Add a CSS class for locked buttons
    } else {
      button.style.cursor = "pointer";
      button.style.opacity = 1;
      button.classList.remove("locked"); // Remove the CSS class for unlocked buttons
    }
  });
}

// Reset the game for the selected mode
function resetGame(mode) {
  currentMode = mode;
  attempts = 0;
  feedbackBox.innerText = "";

  // Generate the code based on the mode
  if (mode === "easy") {
    code = generateEasyCode(4);
  } else if (mode === "intermediate") {
    code = generateIntermediateCode(4);
  } else if (mode === "hard") {
    code = generateHardCode(4);
  }

  // Re-enable input field
  guessInput.disabled = false;
  guessInput.value = "";
}

// Add event listeners to difficulty buttons
easyButton.addEventListener("click", () => {
  if (currentMode !== "easy") {
    resetGame("easy");
  }
});

intermediateButton.addEventListener("click", () => {
  if (
    unlockedModes.includes("intermediate") &&
    currentMode !== "intermediate"
  ) {
    resetGame("intermediate");
  }
});

hardButton.addEventListener("click", () => {
  if (unlockedModes.includes("hard") && currentMode !== "hard") {
    resetGame("hard");
  }
});

// Allowed Characters by Mode
const allowedCharacters = {
  easy: "0123456789",
  intermediate: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  hard: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*()",
};

// Input Filtering Based on Mode
guessInput.addEventListener("input", (event) => {
  // Get the allowed characters for the current mode
  const allowed = allowedCharacters[currentMode];

  // Normalize input (convert to uppercase)
  const input = event.target.value.toUpperCase();

  // Filter out disallowed characters
  const filtered = input
    .split("")
    .filter((char) => allowed.includes(char))
    .join("");

  // Update the input field with the filtered value
  event.target.value = filtered;
});

// Ensure input is case-insensitive during validation
guessInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const guess = guessInput.value.trim().toUpperCase(); // Normalize to uppercase
    if (guess.length === 4) {
      processGuess(guess); // Use the normalized input
      guessInput.value = ""; // Clear the input field
    } else {
      feedbackBox.innerText += "\nEnter exactly 4 characters.";
    }
    handleUserGuess();
  }
});

// Function to Process the Player's Guess
function processGuess(guess) {
  attempts++;
  let feedback = "";
  const codeArray = code.split("");
  const guessArray = guess.split("");

  guessArray.forEach((char, index) => {
    if (char === codeArray[index]) {
      feedback += "🟩"; // Correct character and position
    } else if (codeArray.includes(char)) {
      feedback += "🟨"; // Correct character, wrong position
    } else {
      feedback += "⬛"; // Incorrect character
    }
  });

  feedbackBox.innerText = feedbackBox.innerText.trim();
  feedbackBox.innerText += `\nAttempt ${attempts}: ${guess} ${feedback}`;

  // Check for win condition
  if (guess === code) {
    feedbackBox.innerText += "\n🎉 You've cracked the code!";
    guessInput.disabled = true; // Disable input after winning
    unlockNextMode();
    showWinningAnimation();

    // Stop the timer if it's hard mode
    if (currentMode === "hard") {
      gameTimer.stop(); // Stop the timer and log the duration
    }
  }
}

// Unlock the next mode after a win
function unlockNextMode() {
  if (currentMode === "easy" && !unlockedModes.includes("intermediate")) {
    unlockedModes.push("intermediate");
  } else if (
    currentMode === "intermediate" &&
    !unlockedModes.includes("hard")
  ) {
    unlockedModes.push("hard");
  }
  updateDifficultyButtons();
}

// Function to Show Winning Animation
function showWinningAnimation() {
  const overlay = document.createElement("div");
  overlay.id = "win-overlay";

  // Determine the unlocked stage message
  let nextStageMessage = "";
  if (currentMode === "easy") {
    nextStageMessage = "Intermediate stage unlocked! 🚀";
  } else if (currentMode === "intermediate") {
    nextStageMessage = "Hard stage unlocked! 🌟";
  } else if (currentMode === "hard") {
    nextStageMessage = "You've completed the final stage! 🎉";
  }

  // Overlay content
  overlay.innerHTML = `
  <div class="win-message">
    🎉 You've cracked the code! 🎉
    <br />
    <div class="next-stage-message">${nextStageMessage}</div>
  </div>
      `;

  // Append the overlay to the document body
  document.body.appendChild(overlay);

  setTimeout(() => {
    overlay.style.opacity = 0;
    setTimeout(() => {
      overlay.remove();
    }, 500);
  }, 2500);

  for (let i = 0; i < 50; i++) {
    const emoji = document.createElement("div");
    emoji.className = "falling-emoji";
    emoji.innerText = "🎉";
    emoji.style.left = Math.random() * 100 + "vw";
    emoji.style.animationDuration = Math.random() * 2 + 3 + "s";
    document.body.appendChild(emoji);
    emoji.addEventListener("animationend", () => {
      emoji.remove();
    });
  }
}

// Difficulty-specific Code Generators
function generateEasyCode(length) {
  const characters = "0123456789";
  return generateRandomCode(characters, length);
}

function generateIntermediateCode(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return generateRandomCode(characters, length);
}

function generateHardCode(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*()";
  return generateRandomCode(characters, length);
}

function generateRandomCode(characters, length) {
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}
function handleUserGuess() {
  const guess = guessInput.value.trim().toUpperCase(); // Get the user's guess

  if (!isTimerStarted) {
    gameTimer.start(); // Start the timer
    isTimerStarted = true; // Ensure the timer starts only once
  }

  console.log("User guessed:", guess);
}

// Timer Functionality

const gameTimer = {
  startTime: null,

  start() {
    this.startTime = new Date().getTime();
    localStorage.setItem("gameStartTime", this.startTime);
    console.log("Timer started at:", new Date(this.startTime));
    // Start displaying the timer
    displayTimer();
  },

  stop() {
    if (!this.startTime) {
      console.error("Timer was never started.");
      return;
    }

    const endTime = new Date().getTime();
    const duration = endTime - this.startTime;
    localStorage.removeItem("gameStartTime");
    console.log("Timer stopped at:", new Date(endTime));
    console.log(`Total duration: ${Math.floor(duration / 1000)} seconds`);

    this.startTime = null;

    // Clear the timer display
    clearInterval(timerInterval);

    return duration; // Return the total duration if needed
  },
};
function displayTimer() {
  const startTime = gameTimer.startTime;
  if (!startTime) return;

  const timerElement = document.getElementById("timer");
  if (!timerElement) return;

  timerInterval = setInterval(() => {
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - startTime;

    const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);

    timerElement.textContent = `Time Elapsed: ${hours}h ${minutes}m ${seconds}s`;
  }, 1000);
}

// Initialize the game
updateDifficultyButtons();
