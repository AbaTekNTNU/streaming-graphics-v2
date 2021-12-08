import React from "react";
import styles from "./SponsorsContainer.module.css";

type SponsorItemProps = {
  src: string;
};

const SponsorItem: React.FC<SponsorItemProps> = ({ src }) => {
  return (
    <div className={styles.item}>
      <img src={src} />
    </div>
  );
};

export default SponsorItem;
