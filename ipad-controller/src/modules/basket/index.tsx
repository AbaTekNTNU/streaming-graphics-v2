import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../sharedComponents/Button";
import { RootState } from "../../store";
import styles from "./Basket.module.css";
import CorrectBasketScoreButton from "./components/CorrectBasketScoreButton";
import RemoteToggle from "./components/RemoteToggle";
import moduleinfo from "./moduleinfo.json";
import Interview from "./pages/Interview";
import { gotoPage } from "./reducer";
import { BasketPages } from "./types";

const ControlPage: React.FC = () => {
  const dispatch = useDispatch();

  const buttons = moduleinfo.eventGroups.map(({ name, eventName, type }) => (
    <RemoteToggle key={name} id={name} eventType={type} eventName={eventName} />
  ));

  return (
    <div>
      <CorrectBasketScoreButton />
      <div className={styles.wrapper}>
        <div className={styles.endpointText}>/basket</div>
        <div className={styles.formWrapper}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className={styles.form}
          >
            {buttons}
          </form>
          <Button
            onClick={() => dispatch(gotoPage({ page: BasketPages.INTERVIEW }))}
          >
            Go to interview overlays
          </Button>
        </div>
      </div>
    </div>
  );
};

const Basket = () => {
  const page = useSelector((state: RootState) => state.basket.page);

  switch (page) {
    case BasketPages.CONTROL_BUTTONS:
      return <ControlPage />;
    case BasketPages.INTERVIEW:
      return <Interview />;
  }
};

export default Basket;
