import { useState, useCallback } from "react";

function BowlingGame() {
  const [frame, setFrame] = useState<number[]>(Array.from({ length: 2 }));
  const [currentRoll, setCurrentRoll] = useState<number>(0);

  const addRoll = useCallback(
    (numPins: number) => {
      return () => {
        const updatedFrame = frame.map((roll, rollIndex) => {
          if (rollIndex == currentRoll) return numPins;
          else return roll;
        });

        setFrame(updatedFrame);
        setCurrentRoll((r) => r + 1);
      };
    },
    [frame, currentRoll]
  );
  return (
    <div>
      <div data-testid="frame-1-roll-1">{frame[0] ?? ""}</div>
      <div data-testid="frame-1-roll-2">{frame[1] ?? ""}</div>
      <div data-testid="frame-1-total">
        {currentRoll > 1 && frame[0] + frame[1]}
      </div>
      <button data-testid="gutter" onClick={addRoll(0)}>
        gutter
      </button>
      <button data-testid="1-pin" onClick={addRoll(1)}>
        1
      </button>
      <button data-testid="2-pin" onClick={addRoll(2)}>
        2
      </button>
      <button data-testid="3-pin" onClick={addRoll(3)}>
        3
      </button>
      <button data-testid="4-pin" onClick={addRoll(4)}>
        4
      </button>
    </div>
  );
}

export default BowlingGame;
