import { menuInteface } from "../../pages/Inidivid/types";

export interface DocumentDataCompany {
  data: {
    menu: menuInteface[];

    img: sliderInterface;
    cards: cardsInterface;
  };
}

export interface sliderInterface {
  url: string;
}

export interface cardsInterface {
  title: string;
  img: string;
  description: string;
  more?: null;
}
