// script.js

import {
  createPublicMatch,
  joinPublicMatch,
  handleTurn,
  createPrivateMatch,
  joinPrivateMatch,
} from "./game.js";
import { updateFeedback, showWinningAnimation } from "./ui.js";

// Create a new public match and return match info
async function startNewGame() {
  const match = await createPublicMatch();
  console.log("Public match created:", match);

  // Update UI with match details (for example, show the host code and matchId)
  document.getElementById(
    "matchDetails"
  ).innerText = `Match created. Host Code: ${match.player1Code}. Share with your opponent. Match ID: ${match.matchId}`;

  // Allow the player to share the match ID (for example via a link)
  // Example: Provide a link to the opponent
  const matchLink = `${window.location.origin}?matchId=${match.matchId}`;
  document.getElementById(
    "matchLink"
  ).innerText = `Share this link: ${matchLink}`;
  document.getElementById("matchLink").setAttribute("href", matchLink);
}

// Join a public match using matchId
async function joinGame(matchId) {
  await joinPublicMatch(matchId);

  // Update UI to show that the player has joined
  document.getElementById(
    "matchStatus"
  ).innerText = `You joined the match with ID: ${matchId}. Waiting for the game to start.`;
}

// Join a private match using the matchId and player2Code
async function joinPrivateGame(matchId, player2Code) {
  await joinPrivateMatch(matchId, player2Code);

  // Update UI to show that the player has joined the private match
  document.getElementById(
    "matchStatus"
  ).innerText = `You joined the private match with ID: ${matchId}. Waiting for the game to start.`;
}

// Handle player guesses (simplified)
function processGuess(guess, attempts) {
  let feedback = ""; // Generate feedback (🟩, 🟨, ⬛)

  // Example of generating feedback based on guess
  // This is a placeholder, you would need to compare the guess against the actual code
  if (guess === "ABCD") {
    feedback = "🟩🟩🟩🟩"; // Correct guess example
  } else {
    feedback = "⬛🟨⬛⬛"; // Incorrect guess with some correct characters in wrong places
  }

  // Call a function to update the UI with feedback and attempts
  updateFeedback(feedback, attempts, guess);

  // If the guess is correct, trigger a winning animation
  if (feedback === "🟩🟩🟩🟩") {
    showWinningAnimation();
  }
}

// Listen for player input and process guesses
document.getElementById("guessInput").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const guess = event.target.value;
    const attempts = 1; // Keep track of attempts (you can manage this dynamically)

    // Process the guess
    processGuess(guess, attempts);
  }
});

// Example of calling the functions based on user interactions
document
  .getElementById("startPublicGameBtn")
  .addEventListener("click", startNewGame);
document.getElementById("joinPublicGameBtn").addEventListener("click", () => {
  const matchId = document.getElementById("matchIdInput").value;
  joinGame(matchId);
});

// Private match creation and joining could be similar:
// For private match, generate a link to join, etc.
document
  .getElementById("startPrivateGameBtn")
  .addEventListener("click", async () => {
    const match = await createPrivateMatch();
    console.log("Private match created:", match);

    // Display match info for private match
    document.getElementById(
      "privateMatchDetails"
    ).innerText = `Private Match created. Host Code: ${match.player1Code}. Share this with your opponent. Match ID: ${match.matchId}`;
  });

// Listen for input for joining a private match with the code
document.getElementById("joinPrivateGameBtn").addEventListener("click", () => {
  const matchId = document.getElementById("privateMatchIdInput").value;
  const player2Code = document.getElementById("privatePlayer2CodeInput").value;
  joinPrivateGame(matchId, player2Code);
});
