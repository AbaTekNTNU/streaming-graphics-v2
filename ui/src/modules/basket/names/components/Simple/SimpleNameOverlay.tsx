import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store/store";
import styles from "./SimpleNameOverlay.module.css";

const SimpleNameOverlay: React.FC = ({}) => {
  const namePayload = useSelector(
    (state: RootState) => state.nameOverlay.payload
  );
  return (
    <>
      {namePayload.name !== "" && (
        <div className={styles.container}>
          <div className={styles.nameContainer}>
            <h3>{namePayload.name}</h3>
          </div>
          {namePayload.role !== "" && (
            <div className={styles.roleContainer}>
              <span>{namePayload.role}</span>
            </div>
          )}
        </div>
      )}
    </>
  );
};
export default SimpleNameOverlay;
