import { useState, useCallback } from "react";

function Frames(props: { frames: number[] }) {
  const { frames } = props;
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((frameIdx) => {
    const totalScore = frames
      ?.slice(0, (frameIdx + 1) * 2)
      .reduce((t, s) => t + s, 0);
    return (
      <div key={frameIdx}>
        <div data-testid={`frame-${frameIdx + 1}-roll-1`}>
          {frames[frameIdx * 2] ?? ""}
        </div>
        <div data-testid={`frame-${frameIdx + 1}-roll-2`}>
          {frames[frameIdx * 2 + 1] ?? ""}
        </div>
        <div data-testid={`frame-${frameIdx + 1}-total`}>
          {isNaN(totalScore) ? "" : totalScore}
        </div>
      </div>
    );
  });
}

function BowlingGame() {
  const [frame, setFrame] = useState<number[]>(Array.from({ length: 20 }));
  const [currentRoll, setCurrentRoll] = useState<number>(0);

  const addRoll = (numPins: number) => {
    return () => {
      const updatedFrame = frame.map((roll, rollIndex) => {
        if (rollIndex == currentRoll) return numPins;
        else return roll;
      });

      setFrame(updatedFrame);
      setCurrentRoll((r) => r + 1);
    };
  };
  //   [frame, currentRoll]
  // );
  return (
    <div>
      <Frames frames={frame} />

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
