// types.ts
export interface interfaceEshop {
  data: Product[];
}

export interface Product {
  id: number;
  documentId: string;
  eshop: {
    id: number;
    description: string;
    media: string;
    price: number;
    rating: string;
    type: string;
    name: string;
    marka: string;
    color: string;
  };
}