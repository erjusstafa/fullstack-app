export interface AuthContextType {
    username: string;
    setUsername: (username: string) => void;
    isLoggedIn: boolean;
    loginUser: (userData: { username: string }) => void;
    logoutUser: () => void;
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
     
  }
  