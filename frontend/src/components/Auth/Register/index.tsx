import { useState } from "react";
import "./style.scss";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthResponse, RegisterUserProps } from "../../../services/auth/types";
import { authService } from "../../../services/auth";
import { ExtendedRegisterUserProps } from "./types";
import { usePost } from "../../../api/queryHooks";
import { Input } from "../../../shared/UI/Input";
import { Button } from "../../../shared/UI/Button";

function Register() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState<ExtendedRegisterUserProps>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    lastName: "",
    phone: "",
    title: "",
    gender: "",
    birthdate: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [registrationSuccess, setRegistrationSuccess] =
    useState<boolean>(false);

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const registerMutation = usePost<RegisterUserProps, AuthResponse>(
    authService.register,
    (response) => {
      if (response) {
        setRegistrationSuccess(true);
        setTimeout(() => navigate("/selfcare/login"), 1000);
      }
    },
    (error) => {
      setError(error.message || "Ndodhi një gabim gjatë regjistrimit.");
    }
  );

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      setError("Ju lutem plotësoni të gjitha fushat e detyrueshme");
      return;
    }

    setError(null);
    registerMutation.mutate({
      username: formData.username,
      email: formData.email,
      password: formData.password,
    });
  };

  return (
    <form onSubmit={handleRegister}>
      {error && <p className="error_message">{error}</p>}

      {/* Success message that appears during redirect delay */}
      {registrationSuccess && (
        <div className="success_message">
          Regjistrimi u krye me sukses! Po ju ridrejtojmë...
        </div>
      )}
      <div className="register_form">
        <div className="form_group">
          <label>Titulli</label>
          <select name="title" onChange={handleChange} value={formData.title}>
            <option value="">Ju lutem zgjidhni</option>
            <option value="Z">Z</option>
            <option value="Znj">Znj</option>
          </select>
        </div>

        <div className="form_group">
          <label>Emri*</label>
          <Input
            name="username"
            type="text"
            placeholder="Emri i përdoruesit"
            onChange={handleChange}
            value={formData.username || ""}
            required
          />
        </div>

        <div className="form_group">
          <label>Mbiemri</label>
          <Input
            name="lastName"
            type="text"
            placeholder="Shkruani mbiemrin"
            onChange={handleChange}
            value={formData.lastName || ""}
          />
        </div>

        <div className="form_group">
          <label>Email*</label>
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            value={formData.email}
            required
          />
        </div>

        <div className="form_group password_group">
          <label>Fjalëkalimi*</label>
          <div className="password_wrapper">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Shkruani fjalëkalimin"
              onChange={handleChange}
              value={formData.password}
              required
            />
            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
        {/* 
        <div className="form_group password_group">
          <label>Konfirmo fjalëkalimin*</label>
          <div className="password_wrapper">
            <input
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Konfirmo fjalëkalimin"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <span onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div> */}

        <div className="form_group">
          <label>Nr kontakti alternativ</label>
          <div className="phone_input">
            <span>+355</span>
            <input
              name="phone"
              type="tel"
              placeholder="Numri i telefonit"
              onChange={handleChange}
              value={formData.phone}
            />
          </div>
        </div>

        <div className="form_group">
          <label>Datëlindja</label>
          <input
            name="birthdate"
            type="date"
            onChange={handleChange}
            value={formData.birthdate}
          />
        </div>

        <div className="form_group">
          <label>Gjinia</label>
          <select name="gender" onChange={handleChange} value={formData.gender}>
            <option value="">Ju lutem zgjidhni</option>
            <option value="male">Mashkull</option>
            <option value="female">Femër</option>
          </select>
        </div>
      </div>

      <div className="register_footer">
        <p>
          Keni tashmë një llogari?{" "}
          <Link to={"/selfcare/login"} className="login_link">
            Hyr
          </Link>
        </p>
        <Button
          type="submit"
          className="register_btn"
          disabled={registerMutation.isPending}
        >
          {registerMutation.isPending ? "Duke u regjistruar..." : "REGJISTROHU"}
        </Button>
      </div>
    </form>
  );
}

export default Register;
