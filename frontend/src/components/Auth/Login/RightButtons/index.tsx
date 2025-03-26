import { Link } from "react-router-dom";
import "./style.scss";
function RightButtons() {
  return (
    <div className="auth_container_guest">
      <h2>Nuk keni një llogari?</h2>

      <div className="auth_buttons">
        <Link to={"/selfcare/register"} className="auth_buttons_register">
             REGJISTROHU
         </Link>

        <div className="divider">
          <hr />
          <span>APO</span>
          <hr />
        </div>

        <button className="auth_buttons_guest">VAZHDO SI VIZITOR</button>
      </div>
    </div>
  );
}

export default RightButtons;
