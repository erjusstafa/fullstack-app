// Eshop.tsx
import { Fragment, useEffect, useState } from "react";
import "./style.scss";
import { handleCustomAPI } from "../../api";
import { Product } from "./types";
import Cards from "./Cards";
import FilterEshop from "./FilterEshop";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import { useLanguage } from "../../contextApi/LanguageContext";
import { useEshopData } from "../../contextApi/EshopData";
import RightMenu from "./RightMenu";

function Eshop() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filterLoading, setFilterLoading] = useState<boolean>(false);


  const { language } = useLanguage();
  const { data, setData, filteredData,markaFilters, setMarkaFilters,  ratingFilters, setRatingFilters, colorFilters,  setColorFilters, detailData } = useEshopData();

  useEffect(() => {
    handleCustomAPI(`eshops?populate=*&locale=${language}`, "GET")
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error instanceof Error ? error.message : "An error occurred");
        setLoading(false);
      });
  }, [language]);


  useEffect(() => {
    if (
      markaFilters.length > 0 ||
      colorFilters.length > 0 ||
      ratingFilters.length > 0
    ) {
      setFilterLoading(true);
      const timer = setTimeout(() => {
        setFilterLoading(false);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      setFilterLoading(false);
    }
  }, [markaFilters, colorFilters, ratingFilters]);

  return (
    <div style={{maxWidth: "95%", margin:"auto"}}>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: ".6rem",
        }}
      >
        <div style={{ display: "flex", gap: ".6rem" }}>
          <FilterEshop
            onFilterChange={setMarkaFilters}
            data={Object.values(data?.data || {})}
            type="marka"
            filtroTitle={language === "sq" ? "Filtro sipas" : "Filter by"}
          />
          <FilterEshop
            onFilterChange={setColorFilters}
            data={Object.values(data?.data || {})}
            type="color"
          />
          <FilterEshop
            onFilterChange={setRatingFilters}
            data={Object.values(data?.data || {})}
            type="rating"
          />
        </div>

        <RightMenu type="openCart"  detailData={detailData}   />
      </div>

      <div className="eshop_card_container">
        {filteredData.map((item: Product, index: number) => (
          <Fragment key={index}>
            {filterLoading ? (
              <Skeleton
                width={490}
                height={350}
                baseColor="rgb(231, 231, 231)"
              />
            ) : (
              <Cards item={item} />
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default Eshop;
