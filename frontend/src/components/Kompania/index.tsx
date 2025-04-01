import { Fragment, useEffect, useState } from "react";
import { handleCustomAPI } from "../../api";
import { cardsInterface, DocumentDataCompany } from "./types";
import "./style.scss";
import { CardItem } from "./Cards";
import { Menu } from "../Menu";

const Kompania = () => {
  const [data, setData] = useState<DocumentDataCompany | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    handleCustomAPI("company-page?[populate]=*", "GET")
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error instanceof Error ? error.message : "An error occurred");
        setLoading(false);
      });
  }, []);

  return (
    <div className="container_company">
      {loading && <p>Loading...</p>}
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
