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

  describe.each([
    {
      scenario: "1s",
      roll: "roll-1",
      expectedValues: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
    },
    {
      scenario: "2s",
      roll: "roll-2",
      expectedValues: [4, 8, 12, 16, 20, 24, 28, 32, 36, 40],
    },
    {
      scenario: "3s",
      roll: "roll-3",
      expectedValues: [6, 12, 18, 24, 30, 36, 42, 48, 54, 60],
    },
  ])(
    "on a single round, when just part of the pins are rolled - $scenario",
    ({ roll, expectedValues }) => {
      it("the score equals the number of rolled pins", async () => {
        userEvent.setup();

        render(<BowlingGame />);

        for (let i = 0; i < 20; i++) {
          userEvent.click(screen.getByTestId(roll));
        }

        await waitFor(() => {
          expectedValues.forEach((value, i) => {
            expect(screen.getByTestId(`frame${i + 1}-score`).innerText).toEqual(
              `${value}`
            );
          });
        });
      });
    }
  );
});
