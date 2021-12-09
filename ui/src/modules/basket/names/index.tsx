import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import PlayerOverlay from "./components/Player/PlayerOverlay";
import SimpleNameOverlay from "./components/Simple/SimpleNameOverlay";
import { NameSkin } from "./reducer";

type CustomNameOverlayBySkinProps = {
  skin: NameSkin;
};

const CustomNameOverlayBySkin: React.FC<CustomNameOverlayBySkinProps> = ({
  skin,
}) => {
  switch (skin) {
    case NameSkin.SIMPLE:
      return <SimpleNameOverlay />;
    case NameSkin.PLAYER_FULL:
      return <PlayerOverlay />;
  }
  return null;
};

const Names: React.FC = () => {
  const showName = useSelector(
    (state: RootState) => state.nameOverlay.showName
  );

  const skin = useSelector((state: RootState) => state.nameOverlay.type);

  const namePayload = useSelector(
    (state: RootState) => state.nameOverlay.payload
  );

  if (showName) {
    return <CustomNameOverlayBySkin skin={skin} />;
  } else {
    return null;
  }
};
export default Names;
