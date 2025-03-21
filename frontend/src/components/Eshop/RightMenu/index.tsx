import { FaRegUser } from "react-icons/fa";
import { TbMap2 } from "react-icons/tb";
import { TiShoppingCart } from "react-icons/ti";
import { useEshopData } from "../../../contextApi/EshopData";
import "./style.scss";
import { useState } from "react";
import DialogCart from "../EshopDetailsItem/DialogCart";
import { Product } from "../types";
function RightMenu({ type,detailData }: { type?: "openCart",detailData?:Product }) {
  const [openCart, setOpenCart] = useState<boolean>(false)
  const { cart } = useEshopData();


  const handleOpenCart = () => {
    setOpenCart(true)
  }
  return (
    <div className="menu_eshop_right">
      <div>
        <FaRegUser color="#662e8f" fontSize={23} />
      </div>
      <div className="menu_eshop_right_cart" onClick={handleOpenCart}>
        <TiShoppingCart color="#662e8f" fontSize={34} />
        <span>{cart.length}</span>
      </div>

   {
        openCart && type && detailData && <DialogCart detailData={detailData} setOpenDialog={setOpenCart} />
      } 
      <div>
        <TbMap2 color="#662e8f" fontSize={23} />
      </div>
    </div>
  );
}

export default RightMenu;
