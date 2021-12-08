import men from "../firilogo/assets/men.png";
import women from "../firilogo/assets/women.png";
import { BasketSkin } from "../basketconfig";

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
