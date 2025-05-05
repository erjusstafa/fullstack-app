import { ChangeEvent, useEffect, useRef, useState } from "react";
import { handleCustomAPI } from "../../api";
import "./style.scss";
import { ApiResponseHeader, HeaderLink } from "./types";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "../../contextApi/LanguageContext";
import { useEshopData } from "../../contextApi/EshopDataContext";
import { useGet } from "../../api/methods";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { language, setLanguage } = useLanguage();
  const { inputsearch, setinputSearch } = useEshopData();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const fetchHeaderData = (url: string) => handleCustomAPI<ApiResponseHeader>(url, "GET");
  const { data: headerData, error } = useGet<ApiResponseHeader>(["header", language], `header?populate=*&locale=${language}`, fetchHeaderData, undefined, true);

  useEffect(() => {
    if (searchInputRef.current) searchInputRef.current.focus();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="container">
      {error && <p style={{ color: "red" }}>Error: {error.message}</p>}

      <div className="header_top_inner">
        <img
          className="logo_header"
          src="https://www.one.al/public_portal/react/dist/images/newlogo-tal.svg"
          alt="Logo"
        />

        <div className="header_top_inner_links">
          {/* Hamburger Menu */}
          <div
            className="hamburger-menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className={`hamburger-line ${isMenuOpen ? "open" : ""}`}></div>
            <div className={`hamburger-line ${isMenuOpen ? "open" : ""}`}></div>
            <div className={`hamburger-line ${isMenuOpen ? "open" : ""}`}></div>
          </div>

          {/* Navigation Links */}
          <div
            className={`header_links ${isMenuOpen ? "mobile-menu-open" : ""}`}
          >
            {headerData?.data.headerLink.map((item: HeaderLink) => (
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

          {/* Search and Language Selector */}
          <div className="header_end">
            <form className="header-search">
              <div className="input-group">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <img
                      src="https://www.one.al/public_portal/react/dist/images/search.svg"
                      alt="Search"
                    />
                  </div>
                </div>
                <input
                  type="text"
                  ref={searchInputRef}
                  value={inputsearch}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setinputSearch(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && inputsearch.trim()) {
                      e.preventDefault(); 
                      navigate(`${encodeURIComponent(inputsearch.trim())}`);
                    }
                  }}
                  placeholder={
                    language === "en"
                      ? "What are you looking for?"
                      : "Çfarë po kërkoni?"
                  }
                />
              </div>
            </form>

            <div className="headerLang">
              <a
                onClick={() => setLanguage("en")}
                className={language === "en" ? "active" : ""}
              >
                En
              </a>
              <a
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
