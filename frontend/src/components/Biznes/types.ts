export interface DocumentDataBusiness {
  data: {
    title: string;
    sl: sliderInterface[];
    wlc: welcomeSmsInterface;
    sc: secondContainerType[];
  };
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
