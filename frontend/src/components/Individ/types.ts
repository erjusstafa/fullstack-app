export interface DocumentData {
  data: {
    title: string;
    menu : menuInteface[],
    sl: sliderInterface[];
    wlc: welcomeSmsInterface;
    secondContainer: secondContainerType[];
  };
}


export interface menuInteface {
  id:number
  title: string;
  url: string;
  children?:  Array<menuInteface>;
} 
export interface sliderInterface {
  url: string;
}

export interface secondContainerType {
  url: string;
}

export interface welcomeSmsInterface {
  mainTitle: string;
  description: string;
}
