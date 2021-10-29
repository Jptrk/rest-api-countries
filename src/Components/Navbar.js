//Style
import "../Styles/Navbar.scss";
//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
//Library
import { Link } from "react-router-dom";

const Navbar = ({ setTheme, theme }) => {
  return (
    <nav className={`navbar ${theme === "dark" ? "nav-dark" : ""}`}>
      <div className="nav-content">
        <div className="logo">
          <Link to="/">
            <h1>Where in the world?</h1>
          </Link>
        </div>
        <div className="color-toggle">
          <button
            onClick={() =>
              setTheme((prev) => (prev === "dark" ? "light" : "dark"))
            }
          >
            <span className="moon-icon">
              <FontAwesomeIcon icon={faMoon} />
            </span>
            Dark Mode
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
