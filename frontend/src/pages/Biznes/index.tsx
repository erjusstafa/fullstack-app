import { handleCustomAPI } from "../../api";
import { DocumentDataBusiness } from "./types";
import { useGet } from "../../api/queryHooks";
import { Menu } from "../../components/Menu";
import Slider from "../../shared/Slider";
import WelcomeMessage from "../../shared/WelcomeMessage";
import { SecondContainer } from "../../shared/SecondContainer";

const Biznes = () => {
  
  const fetchBiznesData = (url: string) => handleCustomAPI<DocumentDataBusiness>(url, "GET");
  const { data, isLoading, error } = useGet<DocumentDataBusiness>(["business-page"],`business-page?[populate]=*`, fetchBiznesData, undefined, true);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error.message}</p>;

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {data?.data.menu && <Menu data={data?.data?.menu} type="header_menu" />}

      {data?.data.sl && <Slider sliders={data?.data?.sl} />}
      {data?.data.sc && <SecondContainer imgs={data.data.sc} />}
      {data?.data.wlc && <WelcomeMessage wlc={data?.data.wlc} />}
    </div>
  );
};

export default Biznes;
