import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import BowlingGame from "./BowlingGame";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BowlingGame />
  </StrictMode>
);
