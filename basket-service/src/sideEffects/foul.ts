import { stopClock } from "../uiEvents/clock";

const handleFoulSideEffects = () => {
  console.log("Handling foul side effects");
  stopClock();
};

export { handleFoulSideEffects };
