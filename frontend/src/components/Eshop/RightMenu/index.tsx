import { FaRegUser } from "react-icons/fa";
import { TbMap2 } from "react-icons/tb";
import { TiShoppingCart } from "react-icons/ti";
import { useEshopData } from "../../../contextApi/EshopData";
import "./style.scss";
import { useState } from "react";
import DialogCart from "../EshopDetailsItem/DialogCart";
import { Product } from "../types";
import { handleCustomAPI } from "../../../api";
import { DocumentData } from "../../Individ/types";
import { Menu } from "../../Menu";

function RightMenu({
  type,
  detailData,
}: {
  type?: "openCart";
  detailData?: Product | null;
}) {
  const [linkAuth, setLinkAuth] = useState<DocumentData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState<boolean>(false);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const { cart } = useEshopData();

  const handleAuthApi = () => {
    handleCustomAPI(`auth?populate=*`, "GET")
      .then((data) => {
        setLinkAuth(data);
        setError(null);
      })
      .catch((error) => {
        setError(error instanceof Error ? error.message : "An error occurred");
      });
  };

  const handleUserIconClick = () => {
    setUserMenuOpen((prev) => !prev);
    if (!userMenuOpen) handleAuthApi();
    setCartOpen(false);
  };

  const handleCartClick = () => {
    setCartOpen((prev) => !prev);
    setUserMenuOpen(false); 
  };

  return (
    <div className="menu_eshop_right">
      <div onClick={handleUserIconClick}>
        <FaRegUser color="#662e8f" fontSize={23} />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="menu_eshop_right_submenu_container">
        {userMenuOpen && linkAuth?.data.menu && (
          <Menu data={linkAuth?.data?.menu} type="auth_menu" />
        )}
      </div>

      <div className="menu_eshop_right_cart" onClick={handleCartClick}>
        <TiShoppingCart color="#662e8f" fontSize={34} />
        <span>{cart.length}</span>
      </div>

      {cartOpen && cart && type && detailData && (
        <DialogCart detailData={detailData} setOpenDialog={setCartOpen} />
      )}

      <div>
        <TbMap2 color="#662e8f" fontSize={23} />
      </div>
    </div>
  );
}

export default RightMenu;