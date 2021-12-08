import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { BasketSkin } from "../basketconfig";
import JetsSponsors from "./components/FIRI/Jets/Sponsors";
import MidtbyenSponsors from "./components/FIRI/Midtbyen/Sponsors";

type SponsorBySkinProps = {
  skin: BasketSkin;
};

const SponsorBySkin: React.FC<SponsorBySkinProps> = ({ skin }) => {
  switch (skin) {
    case BasketSkin.FIRI_MEN:
      return <JetsSponsors />;
    case BasketSkin.FIRI_WOMEN:
      return <MidtbyenSponsors />;
    case BasketSkin.NTNUI:
      return null;
    default:
      return null;
  }
};

const Sponsors: React.FC = () => {
  const showSponsors = useSelector(
    (state: RootState) => state.sponsors.showSponsors
  );
  const skin = useSelector((state: RootState) => state.config.skin);
  if (showSponsors) {
    return <SponsorBySkin skin={skin} />;
  } else {
    return null;
  }
};

export default Sponsors;
