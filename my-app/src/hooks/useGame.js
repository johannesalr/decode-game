// src/hooks/useGame.js
import { useState } from "react";

export const useGame = () => {
  const [currentMode, setCurrentMode] = useState("easy");
  const [code, setCode] = useState(generateCode("easy"));
  const [attempts, setAttempts] = useState(0);
  const [unlockedModes, setUnlockedModes] = useState(["easy"]);

  // Generate a random code based on the mode
  const generateCode = (mode) => {
    let characters = "";
    if (mode === "easy") {
      characters = "0123456789";
    } else if (mode === "intermediate") {
      characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    } else if (mode === "hard") {
      characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    }
    let result = "";
    for (let i = 0; i < 4; i++) {
      result += characters[Math.floor(Math.random() * characters.length)];
    }
    return result;
  };

  // Reset the game for the selected mode
  const resetGame = (mode) => {
    setCurrentMode(mode);
    setCode(generateCode(mode));
    setAttempts(0);
  };

  // Process the user's guess
  const processGuess = (guess) => {
    setAttempts((prev) => prev + 1);
    const feedback = guess
      .split("")
      .map((char, index) => {
        if (char === code[index]) return "🟩"; // Correct character and position
        else if (code.includes(char))
          return "🟨"; // Correct character, wrong position
        else return "⬛"; // Incorrect character
      })
      .join("");

    if (guess === code) {
      unlockNextMode();
      return { feedback, isWin: true };
    } else {
      return { feedback, isWin: false };
    }
  };

  // Unlock the next mode after a win
  const unlockNextMode = () => {
    if (currentMode === "easy" && !unlockedModes.includes("intermediate")) {
      setUnlockedModes((prev) => [...prev, "intermediate"]);
    } else if (
      currentMode === "intermediate" &&
      !unlockedModes.includes("hard")
    ) {
      setUnlockedModes((prev) => [...prev, "hard"]);
    }
  };

  return {
    currentMode,
    code,
    attempts,
    unlockedModes,
    resetGame,
    processGuess,
  };
};
