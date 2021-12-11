import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store/store";
import styles from "./SponsorsContainer.module.css";

type SponsorsContainerProps = {
  children: React.ReactNode;
};

const SponsorsContainer: React.FC<SponsorsContainerProps> = ({ children }) => {
  const teamName = useSelector((state: RootState) => state.game.home.name);
  return (
    <div className={styles.container}>
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <h1 style={{ textAlign: "center" }}>
          En stor takk til våre samarbeidspartnere fra oss i {teamName}
        </h1>
        {children}
      </div>
    </div>
  );
};

export default SponsorsContainer;
