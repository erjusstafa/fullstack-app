import { endpointAPI } from "../../api";
import { RegisterUserProps } from "./types";

export async function registerUserService(userData: RegisterUserProps) {
  const url = new URL("/api/auth/local/register", endpointAPI);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
      cache: "no-cache",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }

    return await response.json();
  } catch (error) {
    console.error("Registration Service Error:", error);
    throw error; // Re-throw to handle in component
  }
}

export async function loginUserService(identifier: string, password: string) {
  const url = new URL("/api/auth/local", endpointAPI);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
      cache: "no-cache",
    });

    return response.json();
  } catch (error) {
    console.error("Login Service Error:", error);
    throw error;
  }
}
