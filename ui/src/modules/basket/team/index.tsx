import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import GamePresentation from "./GamePresentation";

const Team: React.FC = () => {
  const showGameSummary = useSelector(
    (state: RootState) => state.game.showGameSummary
  );

  if (showGameSummary) {
    return <GamePresentation />;
  } else {
    return null;
  }
};
export default Team;
