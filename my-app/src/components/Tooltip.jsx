// src/components/Tooltip.jsx
import React from "react";

const Tooltip = ({ visible }) => {
  if (!visible) return null;

  return (
    <div className="tooltip">
      <strong>How to Play:</strong>
      <p>You are trying to guess a 4-character code. After each guess:</p>
      <ul>
        <li>
          <span style={{ color: "green" }}>🟩</span> Correct character in the
          correct position.
        </li>
        <li>
          <span style={{ color: "orange" }}>🟨</span> Correct character but in
          the wrong position.
        </li>
        <li>
          <span style={{ color: "black" }}>⬛</span> Character not in the code.
        </li>
      </ul>
    </div>
  );
};

export default Tooltip;
