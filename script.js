const guessInput = document.getElementById("guessInput");
const feedbackBox = document.getElementById("feedbackBox");

// Game Variables
const code = generateCode(4); // Generate a random 4-character code
let attempts = 0;

// Event Listener for Enter Key
guessInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const guess = guessInput.value.trim();
    if (guess.length === 4) {
      processGuess(guess);
      guessInput.value = ""; // Clear input field
    } else {
      feedbackBox.innerText += "\nEnter exactly 4 characters.";
    }
  }
});

// Function to Generate Random Code
function generateCode(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}

// Function to Process the Player's Guess
function processGuess(guess) {
  attempts++;
  let feedback = "";
  const codeArray = code.split("");
  const guessArray = guess.split("");

  // Create feedback using emojis
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

  // Append feedback to the feedback box
  feedbackBox.innerText += `\nAttempt ${attempts}: ${guess} ${feedback}`;

  // Check for win condition
  if (guess === code) {
    feedbackBox.innerText += "\n🎉 You cracked the code!";
    guessInput.disabled = true; // Disable input after winning

    // Trigger animation and message
    showWinningAnimation();
  }
}
function showWinningAnimation() {
  // Show big congratulatory message
  const overlay = document.createElement("div");
  overlay.id = "win-overlay";
  overlay.innerHTML = `
        <div class="win-message">🎉 You cracked the code! 🎉</div>
    `;
  document.body.appendChild(overlay);

  // Add falling emojis
  for (let i = 0; i < 50; i++) {
    const emoji = document.createElement("div");
    emoji.className = "falling-emoji";
    emoji.innerText = "🎉";
    emoji.style.left = Math.random() * 100 + "vw";
    emoji.style.animationDuration = Math.random() * 2 + 3 + "s"; // Random speed
    document.body.appendChild(emoji);

    // Remove emoji after animation
    emoji.addEventListener("animationend", () => {
      emoji.remove();
    });
  }
}
