import { Fragment, useEffect, useState } from "react";
import { handleCustomAPI } from "../../api";
import "./style.scss";
import { ApiResponseFooter, FooterLink } from "./types";
import FooterCard from "./FooterCard";

const Footer = () => {
  const [data, setData] = useState<ApiResponseFooter | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    handleCustomAPI("footer?[populate]=*", "GET")
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error instanceof Error ? error.message : "An error occurred");
        setLoading(false);
      });
  }, []);

  const groupByMainTitle = (
    links: FooterLink[]
  ): Record<string, FooterLink[]> => {
    return links.reduce((acc: Record<string, FooterLink[]>, link) => {
      if (!acc[link.mainTitle]) {
        acc[link.mainTitle] = [];
      }
      acc[link.mainTitle].push(link);
      return acc;
    }, {});
  };

  const groupedData = groupByMainTitle(data?.data.footerLink || []);

  return (
    <div className="container__footer">
      {loading && <p>Loading...</p>}
      <div className=" ">
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div style={{ display: "flex", gap: "20px" , padding:"0 3rem"}}>
          {Object.entries(groupedData).map(([mainTitle, links], index) => (
             <Fragment key={index}>
              <FooterCard   mainTitle={mainTitle} items={links} />
             </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
