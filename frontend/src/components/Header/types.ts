export interface HeaderLink {
    id: number;
    title: string;
    url:string;
    description: string;
  }
  
  export interface ApiResponseHeader {
    data: {
      headerLink: HeaderLink[];
    };
  }