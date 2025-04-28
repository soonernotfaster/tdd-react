import { describe, it, beforeEach, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import BowlingGame from "./BowlingGame"

describe(BowlingGame, () => {
    it("has 10 empty frames", async () => {
        render(<BowlingGame />)

        for (let frame = 1; frame < 11; frame++)
            expectScoreToBe(frame, "")
        
    })

    function expectScoreToBe(frame: number, score: string) {
        expect(screen.getByTestId(`frame${frame}-score`).innerText).toEqual(score)
    }
})