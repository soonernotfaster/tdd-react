import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import BowlingGame from "./BowlingGame";

describe(BowlingGame, () => {
  describe("when all gutter balls", () => {
    it("the total score is zero", async () => {
      userEvent.setup();

      render(<BowlingGame />);

      userEvent.click(screen.getByTestId("gutter"));

      await waitFor(() => {
        expect(screen.getByTestId("total-score").innerText).toEqual("0");
      });
    });
  });
});
