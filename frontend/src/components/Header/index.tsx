import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { handleCustomAPI } from "../../api";
import "./style.scss";
import { ApiResponseHeader, HeaderLink } from "./types";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../../contextApi/LanguageContext";
import { useEshopData } from "../../contextApi/EshopData";

const Header = () => {
  const location = useLocation();
  const { language, setLanguage } = useLanguage();
  const { inputsearch, setinputSearch } = useEshopData();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const { data: headerData, error } = useQuery<ApiResponseHeader>({
    queryKey: ["header", language],
    queryFn: () =>
      handleCustomAPI(`header?populate=*&locale=${language}`, "GET"),
    staleTime: 1000 * 60 * 5,
  });

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
