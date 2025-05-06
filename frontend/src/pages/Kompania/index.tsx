import { Fragment } from "react";
import { handleCustomAPI } from "../../api";
import { cardsInterface, DocumentDataCompany } from "./types";
import "./style.scss";

import { useGet } from "../../api/queryHooks";
import { CardItem } from "../../shared/Cards";
import { Menu } from "../../components/Menu";
import { Img } from "../../shared/UI/Img";

const Kompania = () => {

  const fetchKompaniData = (url: string) => handleCustomAPI<DocumentDataCompany>(url, "GET");
  const { data, isLoading, error } = useGet<DocumentDataCompany>(["company-page"], "company-page?[populate]=*", fetchKompaniData, undefined, true);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error.message}</p>;

  return (
    <div className="container_company">
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {data?.data.menu && <Menu data={data?.data?.menu} type="header_menu" />}

      <Img src={data?.data.img.url} alt="" />

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
