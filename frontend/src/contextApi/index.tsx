
import { ReactNode } from "react";
import { EshopDataProvider } from "./EshopData";
import { LanguageProvider } from "./LanguageContext";

export const MainContextProvider = ({ children }: { children: ReactNode }) => {
  return (
    <EshopDataProvider>
      <LanguageProvider>{children}</LanguageProvider>
    </EshopDataProvider>
  );
};