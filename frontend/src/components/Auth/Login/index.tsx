import { useMutation } from "@tanstack/react-query";
import RightButtons from "./RightButtons";
import React, { useState } from "react";
import { authService } from "../../../services/auth";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contextApi/AuthContext";

function Login() {
  const [identifier, setIdentifier] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { loginUser, isLoggedIn } = useAuth();

  const loginMutation = useMutation({
    mutationFn: ({
      identifier,
      password,
    }: {
      identifier: string;
      password: string;
    }) => authService.login(identifier, password),
    onSuccess: (data) => {
      if (data?.user) {
        loginUser({ username: data.user.username }); // Use context login
        navigate("/eshop");
      } else {
        setError("Invalid credentials");
      }
    },
    onError: (error) => {
      setError(error.message || "Login failed");
    },
  });

  if (isLoggedIn) {
    navigate("/eshop");
    return null;
  }
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    loginMutation.mutate({ identifier, password });
  };

 
  return (
    <div className="auth_container">
      <div className="auth_container_form">
        <h1>Mirë se vjen në My One</h1>
        <h5>Hyr për të gjeneruar konfirgurimet e llogarisë</h5>

        {error && <p className="error_message">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="auth_container_form_username">
            <label>Emri i përdoruesit*</label>
            <input
              type="text"
              placeholder="Email ose Numri i Regjistruar"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
          </div>
          <div className="auth_container_form_password">
            <label>Fjalëkalimi*</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <p className="auth_container_forgot_password">
            Keni harruar fjalekalimin?
          </p>
          <button
            type="submit"
            className="auth_container_button"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? "Duke u identifikuar..." : "Hyr"}
          </button>
        </form>
      </div>

      <RightButtons />
    </div>
  );
}

export default Login;
