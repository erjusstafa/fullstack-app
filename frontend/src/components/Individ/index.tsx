import { DocumentData } from "./types";
import { useLanguage } from "../../contextApi/LanguageContext";
import { handleCustomAPI } from "../../api";
import { Menu } from "../Menu";
import Slider from "./Slider";
import WelcomeMessage from "./WelcomeMessage";
import { useGet } from "../../api/methods";

const Individ = () => {
  const { language } = useLanguage();

  const fetchIndividData = (url: string) => handleCustomAPI<DocumentData>(url, "GET");
  const { data, isLoading, error } = useGet<DocumentData>(["home-page", language], `home-page/customHomepage?[populate]=*&locale=${language}`, fetchIndividData, undefined, true);


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