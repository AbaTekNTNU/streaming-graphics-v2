import React from "react";
import styles from "./SponsorsContainer.module.css";

type SponsorsContainerProps = {
  children: React.ReactNode;
};

const SponsorsContainer: React.FC<SponsorsContainerProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <h1 style={{ textAlign: "center" }}>
          Teamname vil takke sine sponsorer
        </h1>
        {children}
      </div>
    </div>
  );
};

export default SponsorsContainer;
