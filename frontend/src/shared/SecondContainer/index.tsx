import { secondContainerType } from "../../pages/Biznes/types";
import { Img } from "../UI/Img";
import "./style.scss";

export const SecondContainer = ({ imgs }: { imgs: secondContainerType[] }) => {
  return (
    <div className="second__container">
      {imgs.map((item, index) => {
        return (
          <div key={index}>
            <Img src={item.url} alt="test" />
          </div>
        );
      })}
    </div>
  );
};
