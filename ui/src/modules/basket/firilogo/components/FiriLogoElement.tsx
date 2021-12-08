import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { getLogoBySkin } from "../utils";

import styles from "./FiriLogoElement.module.css";

const FiriLogoElement: React.FC = () => {
  const skin = useSelector((state: RootState) => state.config.skin);

  return (
    <div className={styles.logoWrapper}>
      <img className={styles.logo} src={getLogoBySkin(skin)} />
    </div>
  );
};

export default FiriLogoElement;
