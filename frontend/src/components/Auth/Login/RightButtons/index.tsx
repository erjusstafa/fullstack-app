import { Link } from "react-router-dom";
import "./style.scss";
function RightButtons() {
  return (
    <div className="auth_container_guest">
      <h2>Nuk keni një llogari?</h2>

      <div className="auth_buttons">
        <button className="register">
          <Link to={"/selfcare/register"} className="register">
            REGJISTROHU
          </Link>
        </button>

        <div className="divider">
          <hr />
          <span>APO</span>
          <hr />
        </div>

        <button className="guest">VAZHDO SI VIZITOR</button>
      </div>
    </div>
  );
}

export default RightButtons;
