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
      handleCustomAPI(`home-page?[populate]=*&locale=${language}`, "GET"),
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error.message}</p>;

  return (
    <div>
      {data?.data.menu && <Menu data={data.data.menu} type="header_menu" />}
      {data?.data.sl && <Slider sliders={data.data.sl} />}
      {data?.data.wlc && <WelcomeMessage wlc={data.data.wlc} />}
    </div>
  );
};

export default Individ;