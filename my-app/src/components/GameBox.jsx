// src/components/GameBox.jsx
import React, { useState, useEffect } from "react";
import { useGame } from "../hooks/useGame";
import "../assets/GameBox.css"; // Import the CSS file

const GameBox = () => {
  const [timeElapsed, setTimeElapsed] = useState("0h 0m 0s");
  const [startTime, setStartTime] = useState(null); // Track when the game starts
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState("");

  const {
    currentMode,
    code,
    attempts,
    unlockedModes,
    resetGame,
    processGuess,
  } = useGame();

  // Timer logic
  useEffect(() => {
    let interval;
    if (startTime) {
      interval = setInterval(() => {
        const now = new Date().getTime();
        const elapsed = now - startTime;
        const hours = Math.floor(elapsed / (1000 * 60 * 60));
        const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((elapsed % (1000 * 60)) / 1000);
        setTimeElapsed(`${hours}h ${minutes}m ${seconds}s`);
      }, 1000);
    }
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [startTime]);

  const handleHowItWorksClick = () => {
    setTooltipVisible(!tooltipVisible);
  };

  const handleInfoIconClick = () => {
    setInfoModalVisible(!infoModalVisible);
  };

  const updateInfoModal = () => {
    let characters = "";
    if (currentMode === "easy") {
      characters = "1234567890";
    } else if (currentMode === "intermediate") {
      characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    } else if (currentMode === "hard") {
      characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()";
    }
    return `Set of characters: ${characters}`;
  };

  const handleGuess = () => {
    if (guess.length === 4) {
      if (!startTime) setStartTime(new Date().getTime()); // Start the timer on first guess
      const result = processGuess(guess);
      setFeedback(
        (prev) => `${prev}\nAttempt ${attempts}: ${guess} ${result.feedback}`
      );
      if (result.isWin) {
        setFeedback((prev) => `${prev}\n🎉 You've cracked the code!`);
        setStartTime(null); // Stop the timer when the game is won
      }
      setGuess("");
    } else {
      setFeedback((prev) => `${prev}\nEnter exactly 4 characters.`);
    }
  };

  return (
    <div className="container">
      <div id="timer">Time Elapsed: {timeElapsed}</div>
      <div className="game-box">
        <div className="difficulty-navbar">
          <div
            id="easyButton"
            className="difficulty-button"
            onClick={() => {
              resetGame("easy");
              setStartTime(null); // Reset the timer when changing difficulty
              setTimeElapsed("0h 0m 0s");
            }}
          >
            Easy
          </div>
          <div
            id="intermediateButton"
            className="difficulty-button"
            onClick={() => {
              resetGame("intermediate");
              setStartTime(null); // Reset the timer when changing difficulty
              setTimeElapsed("0h 0m 0s");
            }}
            disabled={!unlockedModes.includes("intermediate")}
          >
            Intermediate {!unlockedModes.includes("intermediate") && "🔒"}
          </div>
          <div
            id="hardButton"
            className="difficulty-button"
            onClick={() => {
              resetGame("hard");
              setStartTime(null); // Reset the timer when changing difficulty
              setTimeElapsed("0h 0m 0s");
            }}
            disabled={!unlockedModes.includes("hard")}
          >
            Hard {!unlockedModes.includes("hard") && "🔒"}
          </div>
        </div>
        <div className="game-title">DECODE</div>
        <div className="game-subtitle">
          Guess 4 characters
          <div
            className="info-icon"
            id="infoIcon"
            onClick={handleInfoIconClick}
          >
            <img src="/assets/info-icon.png" alt="Info" className="info-icon" />
            {infoModalVisible && (
              <div className="info-modal" id="infoModal">
                {updateInfoModal()}
              </div>
            )}
          </div>
        </div>
        <div className="input-container">
          <input
            className="guess-input"
            id="guessInput"
            type="text"
            maxLength="4"
            placeholder="Enter 4 characters"
            autoComplete="off"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
          />
          <button onClick={handleGuess}>Submit</button>
        </div>
        <div className="feedback-box" id="feedbackBox">
          {feedback}
        </div>
        <div
          className="how-it-works"
          id="howItWorks"
          onClick={handleHowItWorksClick}
        >
          How to Play
        </div>
        {tooltipVisible && (
          <div className="tooltip" id="tooltip">
            <strong>How to Play:</strong>
            <p>You are trying to guess a 4-character code. After each guess:</p>
            <ul>
              <li>
                <span style={{ color: "green" }}>🟩</span> Correct character in
                the correct position.
              </li>
              <li>
                <span style={{ color: "orange" }}>🟨</span> Correct character
                but in the wrong position.
              </li>
              <li>
                <span style={{ color: "black" }}>⬛</span> Character not in the
                code.
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameBox;
