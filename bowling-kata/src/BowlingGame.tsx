import { useState } from "react";

function BowingGame() {
  const [score, setScore] = useState<Array<number>>(Array.from({ length: 10 }));
  const [currentFrame, setCurrentFrame] = useState<number>(0);
  const [isFirstRollOfFrame, setIsFirstRollOfFrame] = useState(true);

  const handleGutter = () => {
    return handleRoll(0);
  };

  const handleRoll = (numPins: number) => {
    return () => {
      const updatedFrames = score.map((roll, index) => {
        if (index == currentFrame) {
          if (isFirstRollOfFrame) {
            const scoreSoFar = index === 0 ? 0 : score[index - 1];
            return scoreSoFar + numPins;
          } else {
            return roll + numPins;
          }
        }

        return roll;
      });

      if (isFirstRollOfFrame) {
        setIsFirstRollOfFrame(false);
      } else {
        setIsFirstRollOfFrame(true);
        setCurrentFrame((prev) => prev + 1);
      }

      setScore(updatedFrames);
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

      <button onClick={handleRoll(2)} data-testid="roll-2">
        2 pin
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
