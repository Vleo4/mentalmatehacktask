import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useState } from "react";
import { isPsycho } from "../../api/apiPublic";
import { isAuth } from "../../api/AuthContext";
import { clearStorages } from "../../api/tokenStorage";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleToggleMenu = () => {
    setToggleMenu(!toggleMenu);
  };

  const navigate = useNavigate();
  const logOut = () => {
    clearStorages();
    navigate("/");
  };
  return (
    <nav className="navbar">
      <div className="navbar__container">
        <div className="navbar__container-logo">
          <Link to="/" className="navbar__container-links_item">
            MentalMate
          </Link>
        </div>
        {!isAuth() ? (
          <div className="navbar__container-links">
            <Link to="/login" className="navbar__container-links_item">
              Увійти
            </Link>
            <Link to="/register" className="navbar__container-links_item">
              Зареєструватися
            </Link>
          </div>
        ) : (
          <>
            {!isPsycho() ? (
              <div className="navbar__container-links">
                <Link
                  to="/problem/create"
                  className="navbar__container-links_item"
                >
                  Створити проблему
                </Link>
                <Link to="/problems" className="navbar__container-links_item">
                  Мої проблеми
                </Link>
                <Link to="/approved-problems" className="navbar__container-links_item">
                  Узгоджено
                </Link>
                <h1 className="navbar__container-links_item" onClick={logOut}>
                  Вийти
                </h1>
              </div>
            ) : (
              <div className="navbar__container-links">
                <Link to="/problems" className="navbar__container-links_item">
                  Проблеми
                </Link>
                <Link
                  to="/approved-problems"
                  className="navbar__container-links_item"
                >
                  Узгоджено
                </Link>
                <Link to="/profile" className="navbar__container-links_item">
                  Профіль
                </Link>
              </div>
            )}
          </>
        )}
        <div className="burger-button" onClick={handleToggleMenu}>
          <span className={`top-span ${toggleMenu ? "rotate-top" : ""}`}></span>
          <span className={`middle-span ${toggleMenu ? "hide" : ""}`}></span>
          <span
            className={`bottom-span ${toggleMenu ? "rotate-bottom" : ""}`}
          ></span>
        </div>
        {toggleMenu && (
          <div className="navbar-smallscreen">
            <Link
              to="/"
              className="navbar-smallscreen_item"
              style={{ margin: 32 }}
            >
              MentalMate
            </Link>
            {!isAuth() ? (
              <>
                <div className="navbar-smallscreen_item-wrapper">
                  <Link to="/login" className="navbar-smallscreen_item">
                    Увійти
                  </Link>
                </div>
                <div className="navbar-smallscreen_item-wrapper">
                  <Link to="/register" className="navbar-smallscreen_item">
                    Зареєструватися
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className="navbar-smallscreen_item-wrapper">
                  {!isPsycho() ? (
                    <Link
                      to="/problem/create"
                      className="navbar-smallscreen_item"
                    >
                      Створити проблему
                    </Link>
                  ) : (
                    <Link to="/problems" className="navbar-smallscreen_item">
                      Проблеми
                    </Link>
                  )}
                </div>
                <div className="navbar-smallscreen_item-wrapper">
                  {!isPsycho() ? (
                    <Link to="/problems" className="navbar-smallscreen_item">
                      Мої проблеми
                    </Link>
                  ) : (
                    <Link to="/approved-problems" className="navbar-smallscreen_item">
                      Узгоджено
                    </Link>
                  )}
                </div>
                <div className="navbar-smallscreen_item-wrapper">
                  {!isPsycho() ? (
                    <Link
                      to="/approved-problems"
                      className="navbar-smallscreen_item"
                    >
                      Узгоджено
                    </Link>
                  ) : (
                    <Link to="/profile" className="navbar-smallscreen_item">
                      Профіль
                    </Link>
                  )}
                </div>
                {!isPsycho() && (
                  <div className="navbar-smallscreen_item-wrapper">
                    <h1 className="navbar-smallscreen_item" onClick={logOut}>
                      Вийти
                    </h1>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
