import { ReactNode } from "react";
 import { LanguageProvider } from "./LanguageContext";
import { AuthProvider } from "./AuthContext";
import { EshopDataProvider } from "./EshopDataContext";

export const MainContextProvider = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <EshopDataProvider>
        <LanguageProvider>{children}</LanguageProvider>
      </EshopDataProvider>
    </AuthProvider>
  );
};
