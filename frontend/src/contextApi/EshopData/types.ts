import { interfaceEshop, Product } from "../../components/Eshop/types";

export interface EshopContextType {
  data: interfaceEshop | null;
  inputsearch: string;
  setinputSearch: React.Dispatch<React.SetStateAction<string>>;
  setData: React.Dispatch<React.SetStateAction<interfaceEshop | null>>;
  filteredData: Product[];
  markaFilters: string[];
  setMarkaFilters: React.Dispatch<React.SetStateAction<string[]>>;
  ratingFilters: string[];
  setRatingFilters: React.Dispatch<React.SetStateAction<string[]>>;
  colorFilters: string[];
  setColorFilters: React.Dispatch<React.SetStateAction<string[]>>;
  cart: Product[];
  setCart: React.Dispatch<React.SetStateAction<Product[]>>;
  detailData: Product | null;
  setDetailData: React.Dispatch<React.SetStateAction<Product | null>>;
  addProductToCart: (product: Product) => void;
}
