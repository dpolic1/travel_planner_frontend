import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"
import {useAuth} from "../auth-context/AuthContext.js";
import {useLocalization} from "../../../context/LocalizationContext";
export default function Header() {
  const { isAuthenticated } = useAuth();
  const { isAdmin } = useAuth();

  const { t, language, setLanguage } = useLocalization();

  const changeLanguage = () => {
    setLanguage(language === "en" ? "hr" : "en");
  };

  return (
    <header>
      <nav className="header_nav">
        <ul>
          {!isAuthenticated && (
            <div className="login_tabs">
              <li className="nav_list_item">
                <Link to="/login" className="nav_link">
                  {t("nav_login")}
                </Link>
              </li>
              <li className="nav_list_item">
                <Link to="/register" className="nav_link">
                  {t("nav_register")}
                </Link>
              </li>
            </div>
          )}

          {isAuthenticated && (
            <>
              <li className="nav_list_item">
                <Link to="/" className="nav_link">
                  Home
                </Link>
              </li>
              <li className="nav_list_item">
                <Link to="/newtrip" className="nav_link">
                  New Trip
                </Link>
              </li>
              {isAdmin && (
                <li className="nav_list_item">
                  <Link to="/admin" className="nav_link">
                    Admin
                  </Link>
                </li>
              )}
            </>
          )}
        </ul>
        <div className="language">
          <button
            className="language_button"
            onClick={() => changeLanguage()}
          >
            {t("language")}
          </button>
        </div>
      </nav>
    </header>
  );
}
