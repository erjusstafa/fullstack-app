import { useEffect, useState } from "react";
import { handleCustomAPI } from "../../api";
import Slider from "./Slider";
import { DocumentData } from "./types";
import WelcomeMessage from "./WelcomeMessage";
import { Menu } from "../Menu";
import { useLanguage } from "../../contextApi/LanguageContext";

const Individ = () => {
  const [data, setData] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { language } = useLanguage();

  useEffect(() => {
    handleCustomAPI(`home-page?[populate]=*&locale=${language}`, "GET")
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error instanceof Error ? error.message : "An error occurred");
        setLoading(false);
      });
  }, [language]);

  return (
    <div>
      
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {data?.data.menu && <Menu data={data?.data?.menu} type="header_menu" />}
      {data?.data.sl && <Slider sliders={data?.data?.sl} />}
      {data?.data.wlc && <WelcomeMessage wlc={data?.data.wlc} />}
    </div>
  );
};

export default Individ;
