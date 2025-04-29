import { describe, it, beforeEach, expect, vitest } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import BowlingGame from "./BowlingGame"

describe(BowlingGame, () => {
    describe("initial render", () => {
        it("has 10 empty frames", async () => {
            render(<BowlingGame />)

            for (let frame = 1; frame < 11; frame++)
                expectFrameScoreToBe(frame, "")
        })

        it("has no rolls for any frames", () => {
            render(<BowlingGame />)

            expect(screen.queryAllByTestId("roll")).toHaveLength(0)
        })

        it("does not show score", () => {
            render(<BowlingGame />)

            expect(screen.getByTestId("total-score").innerText).toEqual("")
        })
    })

    describe.each([
        {rollButton: "gutter", rollScore: "0", frameScore: "0", totalScore: "0"},
        {rollButton: "1-pin", rollScore: "1", frameScore: "2", totalScore: "20"},
        {rollButton: "2-pin", rollScore: "2", frameScore: "4", totalScore: "40"},
        {rollButton: "3-pin", rollScore: "3", frameScore: "6", totalScore: "60"},
        {rollButton: "4-pin", rollScore: "4", frameScore: "8", totalScore: "80"},
    ])("when each roll is $rollButton", ({rollButton, rollScore, frameScore, totalScore}) => {
        beforeEach(() => {
            userEvent.setup()

            render(<BowlingGame />)

            for (let rolls = 0; rolls < 20; rolls++)
                userEvent.click(screen.getByTestId(rollButton))
        })

        it(`has ${rollButton} for each roll`, async () => {
            await waitFor(() => {
                for (let frame = 1; frame < 11; frame++) {
                    expectRollToBe(frame, 1, rollScore)
                    expectRollToBe(frame, 2, rollScore)
                }

                for (let frame = 1; frame < 11; frame++)
                    expectFrameScoreToBe(frame, frameScore)
            })
        })

        it(`has score of ${totalScore}`, async () => {
            await waitFor(() => {
                expect(screen.getByTestId("total-score").innerText).toEqual(totalScore)
            })
        })
    })

    function expectRollToBe(frame: number, roll: number, expectedPins: string) {
        const rollId = `frame${frame}-roll${roll}`
        expect(screen.getByTestId(rollId).innerText, rollId).toEqual(expectedPins)
    }

    function expectFrameScoreToBe(frame: number, score: string) {
        const frame_id = `frame${frame}-score`
        expect(screen.getByTestId(frame_id).innerText, frame_id).toEqual(score)
    }
})