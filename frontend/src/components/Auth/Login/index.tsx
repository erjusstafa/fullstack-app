import React, { useState } from "react";
import "./style.scss";
import { loginUserService } from "../../../services/auth";
import RightButtons from "./RightButtons";

function Login() {
  const [identifier, setIdentifier] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await loginUserService(identifier, password);

      if (response?.user) {
        setUser(response.user);
        console.log("User logged in successfully:", response.user);
      } else {
        setError("Invalid credentials or user not found");
      }
    } catch (err) {
      setError("An error occurred while logging in.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <React.Fragment>
      {user ? (
        <div className="auth_container">
          <h1>Welcome, {user.username}</h1>
        </div>
      ) : (
        <div className="auth_container">
          <div className="auth_container_form">
            <h1>Mirë se vjen në My One</h1>
            <h5>Hyr për të gjeneruar konfirgurimet e llogarisë</h5>

            {error && <p className="error_message">{error}</p>}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            >
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
                disabled={loading}
              >
                {loading ? "Duke u identifikuar..." : "Hyr"}
              </button>
            </form>
          </div>

          <RightButtons />
        </div>
      )}
    </React.Fragment>
  );
}

export default Login;
