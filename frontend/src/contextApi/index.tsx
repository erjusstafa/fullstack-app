import { ReactNode } from "react";
import { EshopDataProvider } from "./EshopData";
import { LanguageProvider } from "./LanguageContext";
import { AuthProvider } from "./AuthContext";

export const MainContextProvider = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <EshopDataProvider>
        <LanguageProvider>{children}</LanguageProvider>
      </EshopDataProvider>
    </AuthProvider>
  );
};
