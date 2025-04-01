// contextApi/EshopData/EshopDataProvider.tsx

import { createContext, useState, useContext, ReactNode } from "react";
import { interfaceEshop, Product } from "../../components/Eshop/types";
import { EshopContextType } from "./types";
 
const EshopContext = createContext<EshopContextType | null>(null);

export const EshopDataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<interfaceEshop | null>(null);
  const [detailData, setDetailData] = useState<Product | null>(null);
  const [inputsearch, setinputSearch] = useState<string>("");
  const [cart, setCart] = useState< Product[]>([]);

  // Add state for the filters
  const [markaFilters, setMarkaFilters] = useState<string[]>([]);
  const [ratingFilters, setRatingFilters] = useState<string[]>([]);
  const [colorFilters, setColorFilters] = useState<string[]>([]);

  const filteredData = Object.values(data?.data || {}).filter((product) => {
    if (inputsearch.length > 0) {
      return product.eshop.name
        .toLowerCase()
        .includes(inputsearch.toLowerCase());
    } else {
      const matchesMarka =
        markaFilters.length > 0
          ? markaFilters.includes(product.eshop.marka)
          : true;
      const matchesColor =
        colorFilters.length > 0
          ? colorFilters.includes(product.eshop.color)
          : true;
      const matchesRating =
        ratingFilters.length > 0
          ? ratingFilters.includes(product.eshop.rating)
          : true;
      return matchesMarka && matchesColor && matchesRating;
    }
  });

  const addProductToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
    console.log('----product----', product);
    
  };

  const removeProductToCart = (id: number) => {
    setCart((prevCart) =>  prevCart.filter((item) => item.id !== id));
    
  };
  console.log('++++++++++', cart);

  

  return (
    <EshopContext.Provider
      value={{
        data,
        inputsearch,
        setinputSearch,
        setData,
        filteredData,
        markaFilters,
        setMarkaFilters,
        ratingFilters,
        setRatingFilters,
        colorFilters,
        setColorFilters,
        cart,
        setCart,
        detailData,
        setDetailData,
        addProductToCart,
        removeProductToCart
      }}
    >
      {children}
    </EshopContext.Provider>
  );
};

export const useEshopData = () => {
  const context = useContext(EshopContext);
  if (!context) {
    throw new Error("useEshopData must be used within an EshopDataProvider");
  }
  return context;
};
