// Cards.tsx
import { useState } from "react";
import { Product } from "../types";
import "./style.scss";
import buyButton from "../../../assets/buynow.png";
import { Link } from "react-router-dom";

function Cards({
  item,
  redirectToDetailItem,
  width,
  lineHeight,
  fontSize,
}: {
  item: Product;
  redirectToDetailItem: string;
  width?: string;
  lineHeight?: number;
  fontSize?: string;
}) {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <Link
      to={`/${redirectToDetailItem}/${item.documentId}`}
      className="eshop_card_container_box"
      style={{ width: width }}
    >
      <div
        className="eshop_card_container_box_wrapper"
        style={{
          opacity: isHovered ? 0.3 : 1,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={item?.eshop?.media}
          alt={item?.eshop?.name}
          className="eshop_card_container_box_wrapper_imgCart"
        />
        <h1 style={{ lineHeight: lineHeight, fontSize: fontSize }}>
          {item?.eshop?.description}
        </h1>
        <span>
          {item?.eshop?.price} <p>Leke</p>
        </span>
      </div>
      {isHovered && (
        <img
          src={buyButton}
          onClick={(e) => e.preventDefault()}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="hover_button"
        />
      )}
    </Link>
  );
}

export default Cards;
