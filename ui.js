// ui.js

// Function to show the winning animation and feedback
export function showWinningAnimation() {
  const overlay = document.createElement("div");
  overlay.id = "win-overlay";
  overlay.innerHTML = `<div class="win-message">🎉 You cracked the code! 🎉</div>`;
  document.body.appendChild(overlay);

  setTimeout(() => {
    overlay.style.opacity = 0;
    setTimeout(() => {
      overlay.remove();
    }, 500);
  }, 5000);

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

// Function to update feedback box after a guess
export function updateFeedback(feedback, attempts, guess) {
  const feedbackBox = document.getElementById("feedbackBox");
  feedbackBox.innerText = `${feedback}\nAttempt ${attempts}: ${guess}`;
}

export { showWinningAnimation, updateFeedback };
