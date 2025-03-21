import { useState } from "react";
import { menuInteface } from "../../Individ/types";
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
        padding: "0 2rem",
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
            left: level === 2 ? "10rem" : "0.5rem",
            top: level === 2 ? "0rem" : "4rem",
          }}
        >
          {item.children.map((child, index) =>
            child.title ? (
              <MenuItem key={index} item={child} level={level + 1} />
            ) : null
          )}
        </div>
      )}
    </div>
  );
};
