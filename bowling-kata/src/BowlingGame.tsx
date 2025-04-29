import { useState } from "react";

function frameTotal(rolls: number[]): string {
  if (rolls.length === 0) return "";
  else return `${(rolls[0] || 0) + (rolls[1] || 0)}`;
}

function totalScore(frames: number[][]): string {
  if (frames.length < 10) return "";
  const total = frames.reduce(
    (prev, curr) => prev + ((curr[0] || 0) + (curr[1] || 0)),
    0
  );
  return `${total}`;
}

function BowlingGame() {
  const [currentFrame, setCurrentFrame] = useState<number>(0);

  const [rolls, setRolls] = useState<number[][]>(() =>
    Array.from({ length: 10 }, () => [])
  );

  const handleRoll = (numPins: number) => {
    return () => {
      let frameFinished = false;
      const updatedRolls = rolls.map((frameRolls, frameIndex) => {
        if (frameIndex === currentFrame) {
          if (frameRolls.length === 1) frameFinished = true;
          return [...frameRolls, numPins];
        }
        return frameRolls;
      });
      setRolls(updatedRolls);
      if (frameFinished) setCurrentFrame(currentFrame + 1);
    };
  };
  return (
    <div>
      {rolls.map((frameRolls, index) => {
        return (
          <div key={index}>
            <div data-testid={`frame${index + 1}-score`}>
              {frameTotal(frameRolls)}
            </div>
            <div data-testid={`frame${index + 1}-roll${1}`}>
              {frameRolls[0]}
            </div>
            <div data-testid={`frame${index + 1}-roll${2}`}>
              {frameRolls[1]}
            </div>
          </div>
        );
      })}

      <div data-testid="total-score">
        {currentFrame > 9 && totalScore(rolls)}
      </div>
      <div>
        <button data-testid="gutter" onClick={handleRoll(0)}>
          Gutter Ball
        </button>
        <button data-testid="1-pin" onClick={handleRoll(1)}>
          1 pin
        </button>
        <button data-testid="2-pin" onClick={handleRoll(2)}>
          2 pin
        </button>
        <button data-testid="3-pin" onClick={handleRoll(3)}>
          3 pin
        </button>
        <button data-testid="4-pin" onClick={handleRoll(4)}>
          4 pin
        </button>
        <button data-testid="5-pin" onClick={handleRoll(5)}>
          5 pin
        </button>
      </div>
    </div>
  );
}

export default BowlingGame;
