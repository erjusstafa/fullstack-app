import { useQuery } from "@tanstack/react-query";
import { DocumentData } from "./types";
import { useLanguage } from "../../contextApi/LanguageContext";
import { handleCustomAPI } from "../../api";
import { Menu } from "../Menu";
import Slider from "./Slider";
import WelcomeMessage from "./WelcomeMessage";

  const Individ = () => {
  const { language } = useLanguage();

  const { data, isLoading, error } = useQuery<DocumentData>({
    queryKey: ["home-page", language], 
    queryFn: () => 
      handleCustomAPI(`home-page/customHomepage?[populate]=*&locale=${language}`, "GET"),
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error.message}</p>;

  return (
    <div>
      {data?.data.homePage.menu && <Menu data={data.data.homePage.menu} type="header_menu" />}
      {data?.data.homePage.sl && <Slider sliders={data.data.homePage.sl} />}
      {data?.data.homePage.wlc && <WelcomeMessage wlc={data.data.homePage.wlc} />}
    </div>
  );
};

export default Individ;