import { describe, it, expect, beforeEach, vitest } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import BowlingGame from "./BowlingGame";
import userEvent from "@testing-library/user-event";

describe("BowlingGame", () => {
  describe("initial render", () => {
    it("displays frames with no data", () => {
      userEvent.setup();
      render(<BowlingGame />);

      userEvent.click(screen.getByTestId("gutter"));

      expect(screen.getByTestId("frame-1-roll-1").innerText).toEqual("");
      expect(screen.getByTestId("frame-1-roll-2").innerText).toEqual("");
    });
  });

  describe.each([
    { pinTestId: "4-pin", rollValue: "4", frameTotal: "8" },
    { pinTestId: "3-pin", rollValue: "3", frameTotal: "6" },
    { pinTestId: "2-pin", rollValue: "2", frameTotal: "4" },
    { pinTestId: "1-pin", rollValue: "1", frameTotal: "2" },
    { pinTestId: "gutter", rollValue: "0", frameTotal: "0" },
  ])("sums rolls for $pinTestId", ({ pinTestId, rollValue, frameTotal }) => {
    beforeEach(() => {
      userEvent.setup();
      render(<BowlingGame />);
      userEvent.click(screen.getByTestId(pinTestId));
    });

    it("displays roll 1 score", async () => {
      await waitFor(() => {
        expect(screen.getByTestId("frame-1-roll-1").innerText).toEqual(
          rollValue
        );
        expect(screen.getByTestId("frame-1-roll-2").innerText).toEqual("");
      });
    });

    describe("a second roll", () => {
      beforeEach(() => {
        userEvent.click(screen.getByTestId(pinTestId));
      });

      it("displays roll 2 score", async () => {
        await waitFor(() => {
          expect(screen.getByTestId("frame-1-roll-1").innerText).toEqual(
            rollValue
          );
          expect(screen.getByTestId("frame-1-roll-2").innerText).toEqual(
            rollValue
          );
        });
      });

      it("displays frame score", async () => {
        await waitFor(() => {
          expect(screen.getByTestId("frame-1-total").innerText).toEqual(
            frameTotal
          );
        });
      });
    });
  });
});
