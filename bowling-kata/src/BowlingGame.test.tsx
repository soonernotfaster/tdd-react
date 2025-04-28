import { describe, it, beforeEach, expect } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
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

    describe("when all gutters rolled", () => {
        it("has score of zero", async () => {
            userEvent.setup()

            render(<BowlingGame />)

            for (let gutters = 0; gutters < 20; gutters++)
                userEvent.click(screen.getByTestId("gutter"))

            await waitFor(() => {
                for (let frame = 1; frame < 11; frame++)
                    expectScoreToBe(frame, "0")

            })
            // Total score is zero
        })
    })

    function expectScoreToBe(frame: number, score: string) {
        const frame_id = `frame${frame}-score`
        expect(screen.getByTestId(frame_id).innerText, frame_id).toEqual(score)
    }
})