import RightButtons from "./RightButtons";
import React, { useState } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contextApi/AuthContext";
import { authService } from "../../../services/auth";
import { AuthResponse, LoginUserProps } from "../../../services/auth/types";
import { usePost } from "../../../api/queryHooks";
import { Input } from "../../../shared/UI/Input";
import { Button } from "../../../shared/UI/Button";

function Login() {
  const [identifier, setIdentifier] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const loginMutation = usePost<LoginUserProps, AuthResponse>(
    ({ identifier, password }) => authService.login(identifier, password),
    (response) => {
      if (response) {
        loginUser({ username: response.user.username }); 
        navigate("/eshop");
      }
    },
    (error) => {
      setError(error.message || "Login failed");
    }
  );
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
            <Input
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
          <Button
            type="submit"
            className="auth_container_button"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? "Duke u identifikuar..." : "Hyr"}
          </Button>

        </form>
      </div>

      <RightButtons />
    </div>
  );
}

export default Login;
