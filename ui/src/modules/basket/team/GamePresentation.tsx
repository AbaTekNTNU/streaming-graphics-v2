import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { FiriLogoGender } from "../firilogo/reducer";
import styles from "./GamePresentation.module.css";
import firiLogoMen from "./assets/top_logo_men.png";
import firiLogoWomen from "./assets/top_logo_women.png";

type TeamContainerProps = {
  name: string;
  logo: string;
};

const TeamContainer: React.FC<TeamContainerProps> = ({ name, logo }) => {
  return (
    <div className={styles.teamContainer}>
      <div className={styles.teamWrapper}>
        <img className={styles.teamImage} src={logo} />
      </div>
    </div>
  );
};

const GamePresentation: React.FC = () => {
  const teams = useSelector((state: RootState) => state.game);

  const logoGender = useSelector((state: RootState) => state.firiLogo.gender);
  const firiLogoToUse =
    logoGender === FiriLogoGender.MEN ? firiLogoMen : firiLogoWomen;

  return (
    <div className={styles.container}>
      <div className={styles.topDivider}></div>
      <div className={styles.logoWrapper}>
        <img className={styles.logo} src={firiLogoToUse} />
      </div>
      <div className={styles.midContainer}>
        <TeamContainer name={teams.home.name} logo={teams.home.logo} />
        <div className={styles.vs}>VS</div>
        <TeamContainer name={teams.away.name} logo={teams.away.logo} />
      </div>
      <div className={styles.basketNorgeContainer}>
        <span className={styles.basketNorgeText}>#basketnorge</span>
      </div>
    </div>
  );
};

export default GamePresentation;
