import { Fragment, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import "./style.scss";
import { interfaceEshop, Product } from "./types";
import Cards from "./Cards";
import FilterEshop from "./FilterEshop";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import { useLanguage } from "../../contextApi/LanguageContext";
import { useEshopData } from "../../contextApi/EshopData";
import RightMenu from "./RightMenu";
import { handleCustomAPI } from "../../api";

function Eshop() {
  const [filterLoading, setFilterLoading] = useState<boolean>(false);
  const { language } = useLanguage();
  
  const {
    data,  
    setData,           
    filteredData,
    markaFilters,
    setMarkaFilters,
    ratingFilters,
    setRatingFilters,
    colorFilters,
    setColorFilters,
    detailData,
  } = useEshopData();
  
  const queryResult = useQuery<interfaceEshop>({
    queryKey: ['eshops', language],
    queryFn: () => handleCustomAPI(`eshops?populate=*&locale=${language}`, 'GET'),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    initialData: data || undefined
  });
  
  useEffect(() => {
    if (queryResult.data) {
      setData(queryResult.data);
    }
  }, [queryResult.data, setData]);
  
  const { isLoading, error } = queryResult;
  // Filter loading effect
  useEffect(() => {
    if (markaFilters.length > 0 || colorFilters.length > 0 || ratingFilters.length > 0) {
      setFilterLoading(true);
      const timer = setTimeout(() => {
        setFilterLoading(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [markaFilters, colorFilters, ratingFilters]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error.message}</p>;

  return (
    <div style={{ maxWidth: "95%", margin: "auto" }}>
      <div className="filter_eshop_container">
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
        <RightMenu type="openCart" detailData={detailData} />
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
              <Cards item={item} redirectToDetailItem={"eshop"} />
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default Eshop;