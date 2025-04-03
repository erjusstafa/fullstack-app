import { endpointAPI } from "../../api";
import { RegisterUserProps } from "./types";

export const authService = {
  async register(userData: RegisterUserProps) {
    const url = new URL("/api/auth/local/register", endpointAPI);
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }
    return await response.json();
  },

  async login(identifier: string, password: string) {
    const url = new URL("/api/auth/local", endpointAPI);
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier, password }),
    });
    return response.json();
  }
};