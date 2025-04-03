import { Fragment } from "react";
import { useQuery } from "@tanstack/react-query";
import "./style.scss";
import { handleCustomAPI } from "../../../api";
import Cards from "../Cards";
import { interfaceEshop, Product } from "../types";
import RightMenu from "../RightMenu";

function EshopPackage() {
  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery<{ data: interfaceEshop }, Error>({
    queryKey: ["eshop-packages"],
    queryFn: () => handleCustomAPI(`eshop-packages?populate=*`, "GET"),
  });

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