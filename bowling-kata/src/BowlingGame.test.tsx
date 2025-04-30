import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import BowlingGame from "./BowlingGame";

describe(BowlingGame, () => {
  describe("when all gutter balls", () => {
    it("the total score is zero", async () => {
      userEvent.setup();

      render(<BowlingGame />);

      for (let i = 0; i < 20; i++) {
        userEvent.click(screen.getByTestId("gutter"));
      }

      await waitFor(() => {
        for (let i = 0; i < 10; i++) {
          expect(screen.getByTestId(`frame${i + 1}-score`).innerText).toEqual(
            "0"
          );
        }
      });
    });
  });

  describe("on a single round, when just part of the pins are rolled", () => {
    it("the score equals the number of rolled pins", async () => {
      const expectedValues = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20];
      userEvent.setup();

      render(<BowlingGame />);

      for (let i = 0; i < 20; i++) {
        userEvent.click(screen.getByTestId("roll-1"));
      }

      await waitFor(() => {
        expectedValues.forEach((value, i) => {
          expect(screen.getByTestId(`frame${i + 1}-score`).innerText).toEqual(
            `${value}`
          );
        });
      });
    });
  });
});
