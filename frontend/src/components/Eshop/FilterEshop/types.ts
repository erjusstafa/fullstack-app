import { Product } from "../types";

export interface FilterEshopProps {
    onFilterChange: (filter: string[]) => void;
    data: Product[]; 
    type: "marka" | "color" | "rating"; 
    filtroTitle?: string
  }
  
