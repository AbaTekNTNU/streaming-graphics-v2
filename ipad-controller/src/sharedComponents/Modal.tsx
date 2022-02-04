import React from "react";
import styles from "./Modal.module.css";

type ModalProps = {
  showModal: boolean;
  closeModal: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ showModal, children, closeModal }) => {
  if (!showModal) {
    return null;
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <button className={styles.close} onClick={closeModal}>
          X
        </button>
        <div className={styles.innerContainer}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
