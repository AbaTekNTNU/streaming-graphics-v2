import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store/store";
import ClockElement from "./ClockElement";

const Clock: React.FC = () => {
  const lastKnownSecondsRemaining = useSelector(
    (state: RootState) => state.score.clock.secondsRemaining
  );

  const clockIsRunning = useSelector(
    (state: RootState) => state.score.clock.running
  );

  const [remainingSeconds, setRemaningSeconds] = useState<number>(600);

  useEffect(() => {
    console.log("setting based on last konwn");
    setRemaningSeconds(lastKnownSecondsRemaining);
  }, [lastKnownSecondsRemaining]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (clockIsRunning) {
        setRemaningSeconds((prev) => prev - 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [clockIsRunning]);

  return (
    <ClockElement
      secondsRemaining={remainingSeconds > 0 ? remainingSeconds : 0}
    />
  );
};

export default Clock;
