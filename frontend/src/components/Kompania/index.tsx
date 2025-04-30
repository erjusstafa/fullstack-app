import { Fragment } from "react";
import { handleCustomAPI } from "../../api";
import { cardsInterface, DocumentDataCompany } from "./types";
import "./style.scss";
import { CardItem } from "./Cards";
import { Menu } from "../Menu";
import { useQuery } from "@tanstack/react-query";
import { useGet } from "../../api/methods";

const Kompania = () => {
  /*   const { data, isLoading, error } = useQuery<DocumentDataCompany>({
      queryKey: ["company-page"],
      queryFn: () => handleCustomAPI(`company-page?[populate]=*`, "GET"),
      staleTime: 1000 * 60 * 5,  
    }); */

  const fetchKompaniData = (url: string) => handleCustomAPI<DocumentDataCompany>(url, "GET");
  const { data, isLoading, error } = useGet<DocumentDataCompany>(["company-page"],"company-page?[populate]=*", fetchKompaniData);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error.message}</p>;

  return (
    <div className="container_company">
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {data?.data.menu && <Menu data={data?.data?.menu} type="header_menu" />}

      <img src={data?.data.img.url} />

      {/* display data */}

      <div className="card_container_company">
        {data?.data.cards &&
          Object.values(data?.data.cards || []).map(
            (item: cardsInterface, index: number) => {
              return (
                <Fragment key={index}>
                  <CardItem item={item} />
                </Fragment>
              );
            }
          )}
      </div>
    </div>
  );
};

export default Kompania;
