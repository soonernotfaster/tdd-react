import { useState } from "react";

function BowingGame() {
  const [score, setScore] = useState<Array<number>>(Array.from({ length: 10 }));
  const [currentFrame, setCurrentFrame] = useState<number>(0);
  const [currentRollPerFrame, setCurrentRollPerFrame] = useState<number>(1); // 1 or 2

  const handleGutter = () => {
    return handleRoll(0);
  };

  const handleRoll = (numPins: number) => {
    return () => {
      const updatedFrames = score.map((roll, index) => {
        if (index == currentFrame) {
          const scoreSoFar = score.reduce((acc, fs) => acc + (fs ?? 0), 0);
          console.log("scoreSoFar", scoreSoFar);

          if (currentRollPerFrame === 1) return scoreSoFar + numPins;

          return roll + numPins;
        }
        return roll;
      });
      console.log("score", score);

      setScore(updatedFrames);

      if (currentRollPerFrame == 2) {
        setCurrentFrame((prev) => prev + 1);
        setCurrentRollPerFrame(1);
      } else {
        setCurrentRollPerFrame(2);
      }
    };
  };

  return (
    <div>
      <button onClick={handleGutter()} data-testid="gutter">
        Gutter
      </button>
      <button onClick={handleRoll(1)} data-testid="roll-1">
        1 pin
      </button>
      <h2>Score:</h2>
      {score.map((s, i) => {
        return (
          <p key={i} data-testid={`frame${i + 1}-score`}>
            {s}
          </p>
        );
      })}

      <p data-testid="total-score">
        {score.reduce((sum, rollScore) => sum + (rollScore ?? 0), 0)}
      </p>
    </div>
  );
}

export default BowingGame;
