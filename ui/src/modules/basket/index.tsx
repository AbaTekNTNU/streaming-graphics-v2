import React from "react";
import FiriLogo from "./firilogo";
import Score from "./score";
import Team from "./team";
import TeamPresentation from "./team/TeamPresentation";

const Basket: React.FC = () => {
  const enabledFeatures = [
    <Team />,
    <FiriLogo />,
    <Score />,
    <TeamPresentation />,
  ];

  return <div>{enabledFeatures}</div>;
};

export default Basket;
