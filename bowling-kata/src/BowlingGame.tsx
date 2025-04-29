import { useState } from "react"

function frameTotal(rolls: number[]): string {
    if (rolls.length === 0)
        return ""
    else
        return `${(rolls[0] || 0) + (rolls[1] || 0)}`
}

function BowlingGame() {
    const [currentFrame, setCurrentFrame] = useState<number>(0)

    const [rolls, setRolls] = useState<number[][]>(Array.from({ length: 10 }).fill([]) as number[][])

    return <div>
        {rolls.map((frameRolls, index) => {

            return (
                <div key={index}>
                    <div data-testid={`frame${index + 1}-score`}>
                        {frameTotal(frameRolls)}
                    </div>
                    <div data-testid={`frame${index + 1}-roll${1}`}>{frameRolls[0]}</div>
                    <div data-testid={`frame${index + 1}-roll${2}`}>{frameRolls[1]}</div>
                </div>
            )
        })}


        <div data-testid="total-score">{rolls.length === 10 && 0}</div>
        <div>
            <button data-testid="gutter" onClick={() => {
                let frameFinished = false
                const updatedRolls = rolls.map((frameRolls, frameIndex) => {
                    if (frameIndex === currentFrame) {
                        if (frameRolls.length === 1)
                            frameFinished = true
                        return [...frameRolls, 0]
                    }
                    return frameRolls
                })
                setRolls(updatedRolls)
                if (frameFinished)
                    setCurrentFrame(currentFrame + 1)
            }}>Gutter Ball</button>
        </div>
    </div>
}

export default BowlingGame