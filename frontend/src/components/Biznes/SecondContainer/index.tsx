import { secondContainerType } from "../types";
import "./style.scss";

export const SecondContainer = ({ imgs }: { imgs: secondContainerType[] }) => {
  return (
    <div className="second__container">
      {imgs.map((item, index) => {
        return (
          <div key={index}>
            <img src={item.url} alt="test" />
          </div>
        );
      })}
    </div>
  );
};
