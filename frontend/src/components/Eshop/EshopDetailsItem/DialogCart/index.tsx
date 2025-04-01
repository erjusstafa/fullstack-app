import { DialogBoxInterface } from "./types";
import "./style.scss";
import { useEshopData } from "../../../../contextApi/EshopData";
import React from "react";

function DialogCart({ setOpenDialog }: DialogBoxInterface) {
  const { removeProductToCart, cart } = useEshopData();

  return (
    <div className="dialog_cart">
      <div className="dialog_cart_container">
        <div className="dialog_cart_container_header">
          <h3>Karta</h3>
          <span onClick={() => setOpenDialog(false)}>x</span>
        </div>
        <div className="dialog_cart_container_title">
          <p>Duke shfaqur 1 nga {cart.length} Artikujt</p>
          &nbsp;
          <a href="#">Shfaqi të gjitha</a>
        </div>
        <hr style={{ color: "rgb(196, 194, 194)" }} />
        {cart.map((item) => (
          <React.Fragment key={item.id}>
            <div className="dialog_cart_container_bodyDetails">
              <h5>{item.eshop.name}</h5>
              <p>Sasia: {item.eshop.rating}</p>
            </div>
            <div className="dialog_cart_container_bodyPrice">
              <span>Paguaj ne perfundim</span>
              <p>{item.eshop.price}</p>
            </div>
            <div className="dialog_cart_container_button">
              <button>Blej</button>
              <button>Vazhdo blerjen</button>
              <button onClick={() => removeProductToCart(item.id)}>del</button>
            </div>
            <hr style={{ color: "rgb(196, 194, 194)" }} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default DialogCart;
