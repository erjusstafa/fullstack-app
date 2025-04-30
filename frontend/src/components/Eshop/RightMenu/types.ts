 

    export interface RightMenuTypes {
        data: {
             menu: menuInteface[];
             
          };
      }
      
      export interface menuInteface {
        id: number;
        title: string;
        url: string;
        children?: Array<menuInteface>;
      }
      
      