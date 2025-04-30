import { TbMap2 } from "react-icons/tb";
import { TiShoppingCart } from "react-icons/ti";
import { useEshopData } from "../../../contextApi/EshopDataContext";
import "./style.scss";
import { useState } from "react";
import DialogCart from "../EshopDetailsItem/DialogCart";
import { Product } from "../types";
import { handleCustomAPI } from "../../../api";
import { Menu } from "../../Menu";
import { useAuth } from "../../../contextApi/AuthContext";
import LoadingSlider from "../../Loading";
import { useGet } from "../../../api/methods";
import { RightMenuTypes } from "./types";

function RightMenu({
  type,
  detailData,
}: {
  type?: "openCart";
  detailData?: Product | null;
}) {
  const [userMenuOpen, setUserMenuOpen] = useState<boolean>(false);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const { cart } = useEshopData();
  const {
    username,
    isLoggedIn,
    logoutUser,
    isLoading: authLoading,
  } = useAuth();

  // Generate random color based on username
  const getAvatarColor = (name: string) => {
    const colors = [
      "#FF6633",
      "#FFB399",
      "#FF33FF",
      "#FFFF99",
      "#00B3E6",
      "#E6B333",
      "#3366E6",
      "#999966",
      "#99FF99",
      "#B34D4D",
    ];
    const charCode = name.charCodeAt(0) || 0;
    return colors[charCode % colors.length];
  };

  const fetchLinkAuthData = (url: string) =>
    handleCustomAPI<RightMenuTypes>(url, "GET");
  const { data: authMenuData, error } = useGet<RightMenuTypes>(
    ["auth-menu"],
    `auth?populate=*`,
    fetchLinkAuthData
  );

  const handleUserIconClick = () => {
    setUserMenuOpen((prev) => !prev);
    setCartOpen(false);
  };

  const handleCartClick = () => {
    setCartOpen(true);
    setUserMenuOpen(false);
    console.log("cartOpen", cartOpen );
    console.log(" cart.length",  cart );
    console.log("type",   type    );
    console.log("detailData", detailData);

  };

  const handleLogout = async () => {
    try {
      await logoutUser();
    } finally {
      setUserMenuOpen(false);
    }
  };

  if (authLoading) {
    return <LoadingSlider />;
  }

  return (
    <div className="menu_eshop_right">
      <div className="user_avatar_container" onClick={handleUserIconClick}>
        {isLoggedIn && username ? (
          <div
            className="user_avatar"
            style={{ backgroundColor: getAvatarColor(username) }}
          >
            {username.charAt(0).toUpperCase()}
          </div>
        ) : (
          <div className="user_icon">
            <svg viewBox="0 0 24 24" fill="#662e8f" width="23" height="23">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        )}
      </div>

      {error && <p style={{ color: "red" }}>{(error as Error).message}</p>}

      <div className="menu_eshop_right_submenu_container">
        {userMenuOpen &&
          (isLoggedIn ? (
            <div className="user_menu">
              <div className="user_info">
                <span className="username">Welcome, {username}!</span>
              </div>
              <button
                className="logout_button"
                onClick={handleLogout}
                disabled={authLoading}
              >
                {authLoading ? "Logging out..." : "Logout"}
              </button>
            </div>
          ) : (
            authMenuData?.data.menu && (
              <Menu data={authMenuData.data.menu} type="auth_menu" />
            )
          ))}
      </div>

      <div className="menu_eshop_right_cart" onClick={handleCartClick}>
        <TiShoppingCart color="#662e8f" fontSize={34} />
        {cart.length > 0 && <span>{cart.length}</span>}
      </div>

      {cartOpen && cart.length > 0 && type  && (
        <DialogCart setOpenDialog={setCartOpen} />
      )}

      <div>
        <TbMap2 color="#662e8f" fontSize={23} />
      </div>
    </div>
  );
}

export default RightMenu;
