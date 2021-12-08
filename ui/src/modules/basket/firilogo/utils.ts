import men from "../firilogo/assets/men.png";
import women from "../firilogo/assets/women.png";
import { BasketSkin } from "../basketconfig";
import men_simple from "../team/assets/top_logo_men.png";
import women_simple from "../team/assets/top_logo_women.png";

export const getLogoBySkin = (skin: BasketSkin): any => {
  switch (skin) {
    case BasketSkin.FIRI_MEN:
      return men;

    case BasketSkin.FIRI_WOMEN:
      return women;
    case BasketSkin.NTNUI:
      return "https://ntnui.no/basket/wp-content/uploads/sites/165/2020/05/cropped-NTNUI-favicon.png";
  }
};

export const getSimpleLogoBySkin = (skin: BasketSkin): any => {
  switch (skin) {
    case BasketSkin.FIRI_MEN:
      return men_simple;
    case BasketSkin.FIRI_WOMEN:
      return women_simple;
    case BasketSkin.NTNUI:
      return "https://ntnui.no/basket/wp-content/uploads/sites/165/2020/05/cropped-NTNUI-favicon.png";
  }
};
