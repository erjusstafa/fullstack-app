import { menuInteface } from "../Individ/types";
import { MenuItem } from "./MenuItem";
import "./styles.scss";

export const Menu: React.FC<{ data: menuInteface[]; type: string }> = ({
  data,
  type,
}) => {
  return (
    <div
      className={
        type === "header_menu"
          ? "header_menu__container"
          : type === "auth_menu"
          ? "auth_menu__container"
          : ""
      }
    >
      {Array.isArray(data) &&
        data.map((item, index) => (
          <MenuItem key={index} item={item} level={1} />
        ))}
    </div>
  );
};
