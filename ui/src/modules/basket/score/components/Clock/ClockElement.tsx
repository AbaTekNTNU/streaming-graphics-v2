import React from "react";
import styles from "./ClockElement.module.css";

const addHeadingZero = (num: number): string => {
  if (num < 10) {
    return `0${num}`;
  } else {
    return num.toString();
  }
};

const getUiTime = (secondsRemainging: number): string => {
  return `${addHeadingZero(
    Math.floor(secondsRemainging / 60)
  )}:${addHeadingZero(secondsRemainging % 60)}`;
};

type ClockEventProps = {
  secondsRemaining: number;
};

const ClockElement: React.FC<ClockEventProps> = ({ secondsRemaining }) => {
  return (
    <span className={styles.clockText}>{getUiTime(secondsRemaining)}</span>
  );
};

export default ClockElement;
