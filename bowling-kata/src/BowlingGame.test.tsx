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
        beforeEach(() => {
            userEvent.setup()

            render(<BowlingGame />)

            for (let gutters = 0; gutters < 20; gutters++)
                userEvent.click(screen.getByTestId("gutter"))
        })

        it("has zero for each roll", async () => {
            await waitFor(() => {
                for (let frame = 1; frame < 11; frame++) {
                    expectRollToBe(frame, 1, "0")
                    expectRollToBe(frame, 2, "0")
                }
            })
        })

        it("has score of zero", async () => {
            await waitFor(() => {
                for (let frame = 1; frame < 11; frame++)
                    expectScoreToBe(frame, "0")

                expect(screen.getByTestId("total-score").innerText).toEqual("0")
            })
        })
    })

    describe("when all 1s are rolled", () => {
        beforeEach(() => {
            userEvent.setup()

            render(<BowlingGame />)

            for (let rolls = 0; rolls < 20; rolls++)
                userEvent.click(screen.getByTestId("1-pin"))
        })

        it("has 1 pin for each roll", async () => {
            await waitFor(() => {
                for (let frame = 1; frame < 11; frame++) {
                    expectRollToBe(frame, 1, "1")
                    expectRollToBe(frame, 2, "1")
                }
            })
        })

        it("has score of 20", async () => {
            await waitFor(() => {
                for (let frame = 1; frame < 11; frame++)
                    expectScoreToBe(frame, "2")

                expect(screen.getByTestId("total-score").innerText).toEqual("20")
            })
        })
    })

    function expectRollToBe(frame: number, roll: number, expectedPins: string) {
        const rollId = `frame${frame}-roll${roll}`
        expect(screen.getByTestId(rollId).innerText, rollId).toEqual(expectedPins)
    }

    function expectScoreToBe(frame: number, score: string) {
        const frame_id = `frame${frame}-score`
        expect(screen.getByTestId(frame_id).innerText, frame_id).toEqual(score)
    }
})