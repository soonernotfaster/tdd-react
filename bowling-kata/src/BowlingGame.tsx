import { useState } from "react"

function BowlingGame() {
    const [frames, setFrames] = useState<number[]>([])
    return <div>
        {Array.from({ length: 10 }, (_, index) => (
            <div key={index} data-testid={`frame${index + 1}-score`}>
            {frames.length > index && frames[index]}
            </div>
        ))}
        <div>
            <button data-testid="gutter" onClick={() => {
                setFrames([...frames, 0])
            }}>Gutter Ball</button>
        </div>
    </div>
}

export default BowlingGame