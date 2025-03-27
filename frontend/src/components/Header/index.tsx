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
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const location = useLocation();

  const { language, setLanguage } = useLanguage();
  const { inputsearch, setinputSearch } = useEshopData();

  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

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

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="container">
      {loading && <p>Loading...</p>}
      <div className="header_top_inner">
        <img
          title=""
          alt=""
          className="logo_header"
          src="https://www.one.al/public_portal/react/dist/images/newlogo-tal.svg"
        ></img>

        {/* Navigation Links */}
        <div className="header_top_inner_links">
          {/* Hamburger Menu Button (Mobile) */}
          <div
            className="hamburger-menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            /* ref={menuRef} */
          >
            <div className={`hamburger-line ${isMenuOpen ? "open" : ""}`}></div>
            <div className={`hamburger-line ${isMenuOpen ? "open" : ""}`}></div>
            <div className={`hamburger-line ${isMenuOpen ? "open" : ""}`}></div>
          </div>

          <div
            className={`header_links ${isMenuOpen ? "mobile-menu-open" : ""}`}
          >
            {headerData &&
              headerData.data.headerLink.map((item: HeaderLink) => (
                <div key={item.id} className="header_links_item">
                  <Link
                    to={item.url}
                    className={location.pathname === item.url ? "active" : ""}
                  >
                    {item.title}
                  </Link>
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
                  placeholder={
                    language === "en"
                      ? "What are you looking for?"
                      : "Çfarë po kërkoni?"
                  }
                  value={inputsearch}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setinputSearch(event.target.value)
                  }
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
                En
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
      </div>
    </div>
  );
};

export default Header;
