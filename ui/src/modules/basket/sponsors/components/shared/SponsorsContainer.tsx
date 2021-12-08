import React from "react";
import styles from "./SponsorsContainer.module.css";

type SponsorsContainerProps = {
  children: React.ReactNode;
};

const SponsorsContainer: React.FC<SponsorsContainerProps> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default SponsorsContainer;
