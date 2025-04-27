import { describe, it, beforeEach, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import BowlingGame from "./BowlingGame"

describe(BowlingGame, () => {
    it("has 10 empty frames", async () => {
        render(<BowlingGame />)

        expect(screen.getByTestId("frame1-score")).toBeTruthy()
        expect(screen.getByTestId("frame2-score")).toBeTruthy()
        expect(screen.getByTestId("frame3-score")).toBeTruthy()
        expect(screen.getByTestId("frame4-score")).toBeTruthy()
        expect(screen.getByTestId("frame5-score")).toBeTruthy()
        expect(screen.getByTestId("frame6-score")).toBeTruthy()
        expect(screen.getByTestId("frame7-score")).toBeTruthy()
        expect(screen.getByTestId("frame8-score")).toBeTruthy()
        expect(screen.getByTestId("frame9-score")).toBeTruthy()
        expect(screen.getByTestId("frame10-score")).toBeTruthy()
    })
})