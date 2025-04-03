import { useQuery } from "@tanstack/react-query";
import { handleCustomAPI } from "../../api";
import "./style.scss";
import { ApiResponseFooter, FooterLink } from "./types";
import FooterCard from "./FooterCard";

const Footer = () => {
  const {
    data,
    isLoading,
    error,
  } = useQuery<ApiResponseFooter>({
    queryKey: ["footer"],
    queryFn: () => handleCustomAPI("footer?populate=*", "GET"),
    staleTime: 1000 * 60 * 5, 
  });

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
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
      <div className="">
        <div style={{ display: "flex", gap: "20px", padding: "0 3rem" }}>
          {Object.entries(groupedData).map(([mainTitle, links], index) => (
            <FooterCard key={index} mainTitle={mainTitle} items={links} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;