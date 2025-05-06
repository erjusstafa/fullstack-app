import { useState } from "react";
import { menuInteface } from "../../../pages/Inidivid/types";
import "./style.scss";
import { Link } from "react-router-dom";

export const MenuItem: React.FC<{ item: menuInteface; level: number }> = ({
  item,
  level,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div
      style={{
        padding: "0 1rem",
        position: "relative",
        height: "100%",
        display: "grid",
        alignItems: "center",
        cursor: "pointer",
      }}
      onMouseOver={() => setOpen(true)}
    onMouseLeave={() => setOpen(false)}  
    >
      <div>
        <Link to={item.url} style={{ textDecoration: "none", color: "black" }}>
          {item.title}
        </Link>
      </div>
      {open && item.children && (
        <div
          className="submenu_container"
          style={{
            left: level === 2 ? "10rem" : "-1.8rem",
            top: level === 2 ? "0rem" : "4rem",
          }}
        >
          {item.children.map((child, index) => {
            return child.title ? (
              <MenuItem key={index} item={child} level={level + 1} />
            ) : null;
          })}
        </div>
      )}
    </div>
  );
};
