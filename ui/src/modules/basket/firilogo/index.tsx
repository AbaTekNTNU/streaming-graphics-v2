import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import FiriLogoElement from "./components/FiriLogoElement";

const FiriLogo: React.FC = () => {
  const showLogo = useSelector((state: RootState) => state.firiLogo.showLogo);

  return showLogo ? <FiriLogoElement /> : null;
};
export default FiriLogo;
