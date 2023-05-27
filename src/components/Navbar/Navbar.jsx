import { Link } from "react-router-dom";
import "./Navbar.css";
import { useState } from "react";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleToggleMenu = () => {
    setToggleMenu(!toggleMenu);
  };
  return (
    <nav className="navbar">
      <div className="navbar__container">
        <div className="navbar__container-logo">
          <Link to="/" className="navbar__container-links_item">MentalMate</Link>
        </div>
        <div className="navbar__container-links">
          <Link to="/problems" className="navbar__container-links_item">
            Проблеми
          </Link>
          <Link to="/approved" className="navbar__container-links_item">
            Узгоджено
          </Link>
          <Link to="/profile" className="navbar__container-links_item">
            Профіль
          </Link>
        </div>
        <div className="burger-button" onClick={handleToggleMenu}>
          <span className={`top-span ${toggleMenu ? "rotate-top" : ""}`}></span>
          <span className={`middle-span ${toggleMenu ? "hide" : ""}`}></span>
          <span
            className={`bottom-span ${toggleMenu ? "rotate-bottom" : ""}`}
          ></span>
        </div>
        {toggleMenu && (
          <div className="navbar-smallscreen">
            <Link to="/problems" className="navbar-smallscreen_item">
              Проблеми
            </Link>
            <Link to="/approved" className="navbar-smallscreen_item">
              Узгоджено
            </Link>
            <Link to="/profile" className="navbar-smallscreen_item">
              Профіль
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
