import { handleCustomAPI } from "../../api";
import WelcomeMessage from "../Individ/WelcomeMessage";
import Slider from "../Individ/Slider";
import { DocumentDataBusiness } from "./types";
import { SecondContainer } from "./SecondContainer";
import { Menu } from "../Menu";
import { useQuery } from "@tanstack/react-query";

const Biznes = () => {
  const { data, isLoading, error } = useQuery<DocumentDataBusiness>({
    queryKey: ["business-page"], 
    queryFn: () =>
      handleCustomAPI(`business-page?[populate]=*`, "GET"),
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
  });

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
