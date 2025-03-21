// Cards.tsx
import { useState } from "react";
import { Product } from "../types";
import "./style.scss";
import buyButton from "../../../assets/buynow.png";
import { Link } from "react-router-dom";

function Cards({ item }: { item: Product }) {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <Link to={`/eshop/${item.documentId}`} className="eshop_card_container_box">
      <div
        className="eshop_card_container_box_wrapper"
        style={{
          opacity: isHovered ? 0.3 : 1,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={item.eshop.media} alt={item.eshop.name} />
        <h1>{item.eshop.description}</h1>
        <span>
          {item.eshop.price} <p>Leke</p>
        </span>
      </div>
      {isHovered && <img src={buyButton} className="hover-button" />}
    </Link>
  );
}

export default Cards;