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
  const [open, setOpen] = useState<boolean>(false);
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
    setOpen((prev) => !prev);
    if (!open) handleAuthApi();
  };

  return (
    <div className="menu_eshop_right">
      <div onClick={handleUserIconClick}>
        <FaRegUser color="#662e8f" fontSize={23} />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="menu_eshop_right_submenu_container">
        {open && linkAuth?.data.menu && <Menu data={linkAuth?.data?.menu}  type="auth_menu"/>}
      </div>

      <div className="menu_eshop_right_cart" onClick={() => setOpen(true)}>
        <TiShoppingCart color="#662e8f" fontSize={34} />
        <span>{cart.length}</span>
      </div>

      {open && cart && type && detailData && (
        <DialogCart detailData={detailData} setOpenDialog={setOpen} />
      )}

      <div>
        <TbMap2 color="#662e8f" fontSize={23} />
      </div>
    </div>
  );
}

export default RightMenu;
