import { useState } from "react";
import "./style.scss";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { registerUserService } from "../../../services/auth";

interface ExtendedRegisterUserProps {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  lastName?: string;
  phone: string;
  title?: string;
  gender?: string;
  birthdate?: string;
}

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  /* const [showConfirmPassword, setShowConfirmPassword] = useState(false); */

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
  const [loading, setLoading] = useState<boolean>(false);
  const [registrationSuccess, setRegistrationSuccess] =
    useState<boolean>(false);

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      setError("Ju lutem plotësoni të gjitha fushat e detyrueshme");
      return;
    }
    /* 
    if (formData.password !== formData.confirmPassword) {
      setError("Fjalëkalimet nuk përputhen");
      return;
    } */

    setLoading(true);
    setError(null);

    try {
      const registrationData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      };

      const response = await registerUserService(registrationData);

      console.log("........", response);

      if (response?.user) {
        setRegistrationSuccess(true);

        setTimeout(() => {
          navigate("/selfcare/login");
        }, 1000);
      } else {
        setError(response?.message || "Regjistrimi dështoi");
      }
    } catch (err) {
      setError("Ndodhi një gabim gjatë regjistrimit.");
    } finally {
      setLoading(false);
    }
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
          <input
            name="username"
            type="text"
            placeholder="Emri i përdoruesit"
            onChange={handleChange}
            value={formData.username}
            required
          />
        </div>

        <div className="form_group">
          <label>Mbiemri</label>
          <input
            name="lastName"
            type="text"
            placeholder="Shkruani mbiemrin"
            onChange={handleChange}
            value={formData.lastName}
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
        <button type="submit" className="register_btn" disabled={loading}>
          {loading ? "Duke u regjistruar..." : "REGJISTROHU"}
        </button>
      </div>
    </form>
  );
}

export default Register;
