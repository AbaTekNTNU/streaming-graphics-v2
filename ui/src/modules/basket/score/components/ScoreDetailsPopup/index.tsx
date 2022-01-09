import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store/store";
import { teamsConfig } from "../../../teamsConfig";
import styles from "./ScoreDetailsPopup.module.css";

const happendLastSec = (timestamp: number): boolean => {
  return new Date().getTime() - timestamp < 1000;
};

const ScoreDetailsPopup: React.FC = () => {
  const [doShowLastScore, setDoShowLastScore] = useState<boolean>(false);

  const score = useSelector((state: RootState) => state.score);
  const lastScore = score.lastScore;
  const showLastScore = score.showLastScore;

  const teamName =
    lastScore.team === "H" ? teamsConfig.home.name : teamsConfig.away.name;

  const lastScoreShouldBeDispatched =
    lastScore.name !== "" &&
    lastScore.points !== 0 &&
    lastScore.timestampRecieved !== null &&
    happendLastSec(lastScore.timestampRecieved);

  useEffect(() => {
    if (showLastScore && lastScoreShouldBeDispatched) {
      setDoShowLastScore(true);
      setTimeout(() => {
        setDoShowLastScore(false);
      }, lastScore.duration);
    }
  }, [lastScore]);

  return (
    <>
      {showLastScore && doShowLastScore && (
        <div>
          <div className={styles.wrapper}>
            <div>
              <div className={styles.text}>
                <h3 className={styles.nameText}>{lastScore.name}</h3>
              </div>
              <div className={styles.text}>
                <h4 className={styles.pointsText}>{lastScore.points} poeng</h4>
              </div>
              <div className={styles.text}>
                <span>{teamName}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ScoreDetailsPopup;
