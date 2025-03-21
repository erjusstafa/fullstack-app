import { DialogBoxInterface } from "./types";
import "./style.scss";

function DialogCart({ detailData, setOpenDialog }: DialogBoxInterface) {
  return (
    <div className="dialog_cart">
      <div className="dialog_cart_container">
        <div className="dialog_cart_container_header">
          <h3>Karta</h3>
          <span onClick={() => setOpenDialog(false)}>x</span>
        </div>
        <div className="dialog_cart_container_title">
          <p>Duke shfaqur 1 nga x Artikujt</p>
          &nbsp;
          <a>Shfaqi të gjitha</a>
        </div>
        <hr  style={{color : "rgb(196, 194, 194)"}}/>
        <div className="dialog_cart_container_bodyDetails">
          <h5>{detailData.eshop.name}</h5>
          <p>Sasia : {detailData.eshop.rating}</p>
        </div>
        <div className="dialog_cart_container_bodyPrice">
          <span>Paguaj ne perfundim</span>
          <p>{detailData.eshop.price}</p>
        </div>
        <div className="dialog_cart_container_button">
          <button>Blej</button>
          <button>Vazhdo blerjen</button>
        </div>
      </div>
    </div>
  );
}

export default DialogCart;
