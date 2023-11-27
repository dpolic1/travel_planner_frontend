import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"
import {useAuth} from "../auth-context/AuthContext.js";

export default function Header() {
    const { isAuthenticated } = useAuth();

    return (
        <header>
          <nav className="header_nav">
            <ul>
              {!isAuthenticated && (
                <div class="login_tabs">
                  <li className="nav_list_item">
                    <Link to="/login" className="nav_link">
                      Login
                    </Link>
                  </li>
                  <li className="nav_list_item">
                    <Link to="/register" className="nav_link">
                      Register
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
                  <li className="nav_list_item">
                    <Link to="/admin" className="nav_link">
                      Admin
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </header>
      );
    }
