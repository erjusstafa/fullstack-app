import { menuInteface } from "../Individ/types";
import { MenuItem } from "./MenuItem";
import "./styles.scss"

export const Menu: React.FC<{ data: menuInteface[] }> = ({ data }) => {
  return (
    <div className="menu__container">
      {data.map((item, index) => (
        <MenuItem key={index} item={item} level={1} />
      ))}

    </div>
  );
};