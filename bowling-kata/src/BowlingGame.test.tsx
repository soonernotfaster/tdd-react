import { describe, it, beforeEach, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import BowlingGame from "./BowlingGame"

describe(BowlingGame, () => {
    describe("initial render", () => {
        it("has 10 empty frames", async () => {
            render(<BowlingGame />)
    
            for (let frame = 1; frame < 11; frame++)
                expectScoreToBe(frame, "")  
        })

        it("has no rolls for any frames", () => {
            render(<BowlingGame />)

            expect(screen.queryAllByTestId("roll")).toHaveLength(0)
        })
    })

    function expectScoreToBe(frame: number, score: string) {
        expect(screen.getByTestId(`frame${frame}-score`).innerText).toEqual(score)
    }
})