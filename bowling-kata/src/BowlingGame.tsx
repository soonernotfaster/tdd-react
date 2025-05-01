import { useState } from "react";

function BowingGame() {
  const [frames, setFrames] = useState<Array<number>>(
    Array.from({ length: 10 })
  );
  const [currentFrame, setCurrentFrame] = useState<number>(0);
  const [isFirstRollOfFrame, setIsFirstRollOfFrame] = useState(true);

  const handleGutter = () => {
    return handleRoll(0);
  };

  const handleRoll = (numPins: number) => {
    return () => {
      const updatedFrames = frames.map((frame, index) => {
        if (index == currentFrame) {
          if (isFirstRollOfFrame) {
            const scoreSoFar = index === 0 ? 0 : frames[index - 1];
            return scoreSoFar + numPins;
          } else {
            return frame + numPins;
          }
        }

        return frame;
      });

      if (isFirstRollOfFrame) {
        setIsFirstRollOfFrame(false);
      } else {
        setIsFirstRollOfFrame(true);
        setCurrentFrame((prev) => prev + 1);
      }

      setFrames(updatedFrames);
    };
  };

  return (
    <div>
      <button onClick={handleGutter()} data-testid="gutter">
        Gutter
      </button>
      {Array.from({ length: 10 }).map((_, index) => (
        <button
          onClick={handleRoll(index + 1)}
          data-testid={`roll-${index + 1}`}
        >
          {`${index + 1} pin`}
        </button>
      ))}
      <h2>Score:</h2>
      {frames.map((s, i) => {
        return (
          <p key={i} data-testid={`frame${i + 1}-score`}>
            {s}
          </p>
        );
      })}

      <p data-testid="total-score">
        {frames.reduce((sum, rollScore) => sum + (rollScore ?? 0), 0)}
      </p>
    </div>
  );
}

export default BowingGame;
