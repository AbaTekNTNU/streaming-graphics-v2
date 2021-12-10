import React from "react";
import styles from "./Button.module.css";

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
};

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button className={styles.uglyButton} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
