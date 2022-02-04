import React, { useState } from "react";
import { useSelector } from "react-redux";
import Modal from "../../../../sharedComponents/Modal";
import { RootState } from "../../../../store";
import { correctScoreRelative } from "../../api";
import styles from "./CorrectBasketScoreButton.module.css";

type ScoreCorrectionButtonProps = {
  team: "H" | "A";
  amount: number;
};
const ScoreCorrectionButton: React.FC<ScoreCorrectionButtonProps> = ({
  team,
  amount,
}) => {
  const bffUri = useSelector((state: RootState) => state.url.value);

  const amountComponent: string = amount === 1 ? "+1" : amount.toString();
  return (
    <button
      className={styles.teamScoreCorrectionButton}
      onClick={() => correctScoreRelative(team, amount, bffUri)}
    >
      {amountComponent}
    </button>
  );
};

const CorrectBasketScoreButton: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={() => setShowModal(true)}>
        Korriger score
      </button>

      <Modal showModal={showModal} closeModal={() => setShowModal(false)}>
        <div className={styles.teamScoreCorrectionWrapper}>
          <div className={styles.teamScoreCorrectionColumn}>
            <ScoreCorrectionButton team={"H"} amount={1} />
            <span>HOME</span>
            <ScoreCorrectionButton team={"H"} amount={-1} />
          </div>
          <div></div>
          <div className={styles.teamScoreCorrectionColumn}>
            <ScoreCorrectionButton team={"A"} amount={1} />
            <span>AWAY</span>
            <ScoreCorrectionButton team={"A"} amount={-1} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CorrectBasketScoreButton;
