import { ReactNode } from "react";
import { LanguageProvider } from "./LanguageContext";
import { AuthProvider } from "./AuthContext";
import { EshopDataProvider } from "./EshopDataContext";
import { ThemeProvider } from "./ThemeContext";

export const MainContextProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <EshopDataProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </EshopDataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};
