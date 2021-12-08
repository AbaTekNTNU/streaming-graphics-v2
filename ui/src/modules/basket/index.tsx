import React from "react";
import FiriLogo from "./firilogo";
import Score from "./score";
import Sponsors from "./sponsors";
import Team from "./team";
import TeamPresentation from "./team/TeamPresentation";

const Basket: React.FC = () => {
  const enabledFeatures = [
    <Team />,
    <FiriLogo />,
    <Score />,
    <TeamPresentation />,
    <Sponsors />,
  ];

  return <div>{enabledFeatures}</div>;
};

export default Basket;
