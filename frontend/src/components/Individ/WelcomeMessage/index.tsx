import { welcomeSmsInterface } from "../types";
import "./style.scss"

const WelcomeMessage = ({ wlc }: { wlc: welcomeSmsInterface }) => {
  return (
    <div className="welcome_sms">
      <h1 className="welcome_sms_title">{wlc.mainTitle}</h1>
      <p className="welcome_sms_description">{wlc.description}</p>
    </div>
  );
};

export default WelcomeMessage;
