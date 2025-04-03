import { createContext, useContext, useState, ReactNode } from "react";
import { AuthContextType } from "./types";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loginUser = (userData: { username: string }) => {
    setUsername(userData.username);
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logoutUser = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500)); 

      setUsername("");
      setIsLoggedIn(false);
      localStorage.removeItem("user");
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize from localStorage
  useState(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setUsername(user.username);
      setIsLoggedIn(true);
    }
  });

  return (
    <AuthContext.Provider
      value={{
        username,
        isLoggedIn,
        isLoading,
        loginUser,
        logoutUser,
        setUsername,
        setIsLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
