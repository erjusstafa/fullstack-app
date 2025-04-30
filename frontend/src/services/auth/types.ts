export interface RegisterUserProps {
  username: string;
  password: string;
  email: string;
  lastName?: string;
  phone?: string;
  title?: string;
  gender?: string;
  birthdate?: string;
}

export interface LoginUserProps {
  identifier: string;
  password: string;
}

export interface AuthResponse {
  user: {
    username: string;
  };
}
