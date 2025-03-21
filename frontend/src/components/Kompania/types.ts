export interface DocumentDataCompany {
    data: {
       img : sliderInterface;
       cards: cardsInterface;
    };
  }
  
  export interface sliderInterface {
    url: string;
  }
  
 
  export interface cardsInterface {
    title: string;
    img : string;
    description: string;
    more?: null 
  }