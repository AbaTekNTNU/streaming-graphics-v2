import React from "react";
import styles from "./SponsorsContainer.module.css";

type SponsorRowProps = {
  children: React.ReactNode;
};

const SponsorRow: React.FC<SponsorRowProps> = ({ children }) => {
  return <div className={styles.row}>{children}</div>;
};

export default SponsorRow;
