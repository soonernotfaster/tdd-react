import { useState } from "react";

function BowingGame() {
  const [score, setScore] = useState(0);

  const handleGutter = () => {
    setScore(0);
  };

  return (
    <div>
      <button onClick={handleGutter} data-testid="gutter">
        Gutter
      </button>
      <p>Score:</p>
      <div data-testid="total-score">{score}</div>
    </div>
  );
}

export default BowingGame;
