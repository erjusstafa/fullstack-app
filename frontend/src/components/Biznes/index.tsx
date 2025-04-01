import { useEffect, useState } from "react";
import { handleCustomAPI } from "../../api";
import WelcomeMessage from "../Individ/WelcomeMessage";
import Slider from "../Individ/Slider";
import { DocumentDataBusiness } from "./types";
import { SecondContainer } from "./SecondContainer";
import { Menu } from "../Menu";

const Biznes = () => {
  const [data, setData] = useState<DocumentDataBusiness | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    handleCustomAPI("business-page?[populate]=*", "GET")
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
    <div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {data?.data.menu && <Menu data={data?.data?.menu} type="header_menu" />}

      {data?.data.sl && <Slider sliders={data?.data?.sl} />}
      {data?.data.sc && <SecondContainer imgs={data.data.sc} />}
      {data?.data.wlc && <WelcomeMessage wlc={data?.data.wlc} />}
    </div>
  );
};

export default Biznes;
