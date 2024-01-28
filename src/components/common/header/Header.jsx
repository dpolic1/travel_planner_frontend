import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"
import {useAuth} from "../auth-context/AuthContext.js";
import {useLocalization} from "../../../context/LocalizationContext";
import { ArrowLeftFromLine } from "lucide-react";


export default function Header() {
  const { isAuthenticated } = useAuth();
  const { isAdmin } = useAuth();

  const { t, language, setLanguage } = useLocalization();

  const changeLanguage = () => {
    setLanguage(language === "en" ? "hr" : "en");
  };

  const handleLogout = async () => {
    try {
      // Handle logout
      const response = await fetch('http://localhost:8081/auth/logout', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`, 
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        localStorage.removeItem('jwtToken');
        window.location.reload();
      } else {
        // Handle other cases, such as non-200 status codes
        console.error('Logout failed:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
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
                {t("nav_home")}
                </Link>
              </li>
              <li className="nav_list_item">
                <Link to="/newtrip" className="nav_link">
                {t("nav_newtrip")}
                </Link>
              </li>
              {isAdmin && (
                <li className="nav_list_item">
                  <Link to="/admin" className="nav_link">
                  {t("nav_admin")}
                  </Link>
                </li>
              )}
            </>
          )}
        </ul>
        <div className="language_logout">
          <button
            className="language_button"
            onClick={() => changeLanguage()}
          >
            {t("language")}
          </button>
          {isAuthenticated && (
            <button className="logout_button" onClick={() => handleLogout()}>
            <ArrowLeftFromLine size={24} />
          </button>
          )}
        </div>
      </nav>
    </header>
  );
}
