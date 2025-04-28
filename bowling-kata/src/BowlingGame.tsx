import { useState } from "react"

function BowlingGame() {
    const [frames, setFrames] = useState<number[]>([])
    return <div>
        <div data-testid="frame1-score">{frames.length > 0 && frames[0]}</div>
        <div data-testid="frame2-score">{frames.length > 1 && frames[1]}</div>
        <div data-testid="frame3-score">{frames.length > 2 && frames[2]}</div>
        <div data-testid="frame4-score">{frames.length > 3 && frames[3]}</div>
        <div data-testid="frame5-score">{frames.length > 4 && frames[4]}</div>
        <div data-testid="frame6-score">{frames.length > 5 && frames[5]}</div>
        <div data-testid="frame7-score">{frames.length > 6 && frames[6]}</div>
        <div data-testid="frame8-score">{frames.length > 7 && frames[7]}</div>
        <div data-testid="frame9-score">{frames.length > 8 && frames[8]}</div>
        <div data-testid="frame10-score">{frames.length > 9 && frames[9]}</div>
        <div>
            <button data-testid="gutter" onClick={() => {
                setFrames([...frames, 0])
            }}>Gutter Ball</button>
        </div>
    </div>
}

export default BowlingGame