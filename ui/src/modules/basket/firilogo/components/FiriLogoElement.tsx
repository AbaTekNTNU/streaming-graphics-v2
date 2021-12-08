import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import men from "../assets/men.png";
import women from "../assets/women.png";
import { FiriLogoGender } from "../reducer";
import styles from "./FiriLogoElement.module.css";

const FiriLogoElement: React.FC = () => {
  const logoGender = useSelector((state: RootState) => state.firiLogo.gender);
  const logoToUse = logoGender === FiriLogoGender.MEN ? men : women;

  console.log("fir logo ");
  console.log(logoGender);

  return (
    <div className={styles.logoWrapper}>
      <img className={styles.logo} src={logoToUse} />
    </div>
  );
};

export default FiriLogoElement;
