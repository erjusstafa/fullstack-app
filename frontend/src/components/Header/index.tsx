import { ChangeEvent, useEffect, useRef, useState } from "react";
import { handleCustomAPI } from "../../api";
import "./style.scss";
import { ApiResponseHeader, HeaderLink } from "./types";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../../contextApi/LanguageContext";
import { useEshopData } from "../../contextApi/EshopData";
 
const Header = () => {
  const [headerData, setHeaderData] = useState<ApiResponseHeader | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();

  
  const { language, setLanguage } = useLanguage();
  const { inputsearch , setinputSearch} = useEshopData();

  const searchInputRef = useRef<HTMLInputElement | null>(null);
  
  useEffect(() => {
    handleCustomAPI(`header?[populate]=*&locale=${language}`, "GET")
      .then((data) => {
        setHeaderData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error instanceof Error ? error.message : "An error occurred");
        setLoading(false);
      });
  }, [language]);


useEffect(() => {
  if (searchInputRef.current) {
    searchInputRef.current.focus();
  }
}, []);
  return (
    <div className="container">
      {loading && <p>Loading...</p>}
      <div className="header_top_inner">
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <img
          title=""
          alt=""
          className="logo_header"
          src="https://www.one.al/public_portal/react/dist/images/newlogo-tal.svg"
        ></img>
        {headerData &&
          headerData.data.headerLink.map((item: HeaderLink) => (
            <div key={item.id}>
              <Link
                to={item.url}
                className={location.pathname === item.url ? "active" : ""} // Add active class
              >
                {item.title}
              </Link>{" "}
              <p>{item.description}</p>
            </div>
          ))}
      </div>

      <div className="header_end">
        <form className="header-search">
          <div className="input-group">
            <div className="input-group-prepend">
              <div className="input-group-text">
                <img
                  title=""
                  alt=""
                  className=""
                  src="https://www.one.al/public_portal/react/dist/images/search.svg"
                />
              </div>
            </div>
            <input
              type="text"
              className="form-control"
              id="inlineFormInputGroup"
              placeholder={language === "en" ? "What are you looking for?" : "Çfarë po kërkoni?"}
              value={inputsearch}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setinputSearch(event.target.value)}
              ref={searchInputRef}
            />
          </div>
        </form>

        <div className="headerLang">
          <a
            id="english"
            onClick={() => setLanguage("en")}
            className={language === "en" ? "active" : ""}
          >
            {" "}
            En{" "}
          </a>
          <a
            id="albanian"
            onClick={() => setLanguage("sq")}
            className={language === "sq" ? "active" : ""}
          >
            Al
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
