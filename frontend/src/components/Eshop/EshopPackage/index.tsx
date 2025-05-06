import { Fragment } from "react";
import "./style.scss";
import { handleCustomAPI } from "../../../api";
import Cards from "../Cards";
import { interfaceEshop, Product } from "../types";
import RightMenu from "../RightMenu";
import { useGet } from "../../../api/queryHooks";

function EshopPackage() {

  const fetchEshopPackageData = (url: string) => handleCustomAPI<interfaceEshop>(url, "GET");
  const { data, isLoading, isError, error } = useGet<interfaceEshop>(["eshop-packages"], `eshop-packages?populate=*`, fetchEshopPackageData, undefined, true);

  return (
    <div style={{ maxWidth: "95%", margin: "auto" }}>
      {isLoading && <p>Loading...</p>}
      {isError && <p style={{ color: "red" }}>{error?.message}</p>}

      <div className="filter_eshop_container">
        <div style={{ display: "flex", gap: ".6rem" }}></div>
        <RightMenu type="openCart" />
      </div>

      <div className="eshop_card_container">
        {isError && <p style={{ color: "red" }}>{error?.message}</p>}

        {Object.values(data?.data || {}).map((item: Product, index: number) => (
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

export default EshopPackage;