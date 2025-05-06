import { useLanguage } from "../../contextApi/LanguageContext";
import { handleCustomAPI } from "../../api";

import { useGet } from "../../api/queryHooks";
import { DocumentData } from "./types";
import { Menu } from "../../components/Menu";
import Slider from "../../shared/Slider";
import WelcomeMessage from "../../shared/WelcomeMessage";

const Individ = () => {
  const { language } = useLanguage();

  const fetchIndividData = (url: string) =>
    handleCustomAPI<DocumentData>(url, "GET");
  const { data, isLoading, error } = useGet<DocumentData>(
    ["home-page", language],
    `home-page/customHomepage?[populate]=*&locale=${language}`,
    fetchIndividData,
    undefined,
    true
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error.message}</p>;

  if (data) {
    const { menu, sl, wlc } = data.data.homePage;
    return (
      <div>
        {menu && <Menu data={menu} type="header_menu" />}{" "}
        {sl && <Slider sliders={sl} />}
        {wlc && <WelcomeMessage wlc={wlc} />}{" "}
      </div>
    );
  }
};

export default Individ;