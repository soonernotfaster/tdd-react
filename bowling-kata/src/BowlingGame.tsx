import { useState } from "react"

function BowlingGame() {
    const [frames, setFrames] = useState<number[]>(Array.from({ length: 10 }))
    const [currentFrame, setCurrentFrame] = useState<number>(0)

    const [rolls, setRolls] = useState<number[][]>(Array.from({ length: 10 }).fill([]) as number[][])

    return <div>
        {frames.map((_, index) => {
            return (
                <div key={index}>
                    <div data-testid={`frame${index + 1}-score`}>
                        {frames.length > index && frames[index]}
                    </div>
                    <div data-testid={`frame${index + 1}-roll${1}`}>{rolls[index][0]}</div>
                    <div data-testid={`frame${index + 1}-roll${2}`}>{rolls[index][1]}</div>
                </div>
            )
        })}


        <div data-testid="total-score">{frames.length === 10 && 0}</div>
        <div>
            <button data-testid="gutter" onClick={() => {
                let frameFinished = false
                const updatedFrames = frames.map((frameScore, frameIndex) => {
                    if (frameIndex === currentFrame) {
                        return 0
                    }
                    return frameScore
                })
                const updatedRolls = rolls.map((frameRolls, frameIndex) => {
                    if (frameIndex === currentFrame) {
                        if (frameRolls.length === 1)
                            frameFinished = true
                        return [...frameRolls, 0]
                    }
                    return frameRolls
                })
                setFrames(updatedFrames)
                setRolls(updatedRolls)
                if (frameFinished)
                    setCurrentFrame(currentFrame + 1)
            }}>Gutter Ball</button>
        </div>
    </div>
}

export default BowlingGame