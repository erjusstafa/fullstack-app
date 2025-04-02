import { Fragment, useEffect, useState } from "react";
import "./style.scss";
import { handleCustomAPI } from "../../../api";
import Cards from "../Cards";
import { interfaceEshop, Product } from "../types";
import RightMenu from "../RightMenu";
function EshopPAckage() {
  const [data, setData] = useState<interfaceEshop | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    handleCustomAPI(`eshop-packages?populate=*`, "GET")
      .then((data) => {
        setData(data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error instanceof Error ? error.message : "An error occurred");
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ maxWidth: "95%", margin: "auto" }}>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="filter_eshop_container">
        <div style={{ display: "flex", gap: ".6rem" }}></div>
        <RightMenu type="openCart" />
      </div>

      <div className="eshop_card_container">
        {error && <p style={{ color: "red" }}>{error}</p>}

        {Object.values(data || {}).map((item: Product, index: number) => (
          <Fragment key={index}>
            <Cards
              item={item}
              redirectToDetailItem={"eshop-packages"}
              width={"300px"}
              lineHeight={1.5}
              fontSize={".8rem"}
            />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default EshopPAckage;
