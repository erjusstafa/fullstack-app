export interface FooterLink {
    id: number;
    title: string;
    url:string;
    mainTitle: string;
    isExternal: boolean;
    
  }
  

  export type FooterCardProps = {
     mainTitle: string;
    items: FooterLink[];
  };
  export interface ApiResponseFooter {
    data: {
        footerLink: FooterLink[];
    };
  }