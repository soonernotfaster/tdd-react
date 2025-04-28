import { useState } from "react"

function BowlingGame() {
    const [frames, setFrames] = useState<number[]>(Array.from({ length: 10 }))
    const [currentFrame, setCurrentFrame] = useState<number>(0)

    return <div>
        {frames.map((_, index) => (
            <div key={index} data-testid={`frame${index + 1}-score`}>
            {frames.length > index && frames[index]}
            </div>
        ))}
        <div data-testid="total-score">{frames.length === 10 && 0}</div>
        <div>
            <button data-testid="gutter" onClick={() => {
                const updatedFrames = frames.map((frameScore, frameIndex) => {
                    if (frameIndex === currentFrame) {
                        return 0
                    }
                    return frameScore
                })
                setFrames(updatedFrames)
                setCurrentFrame(currentFrame + 1)
            }}>Gutter Ball</button>
        </div>
    </div>
}

export default BowlingGame