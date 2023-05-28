import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useEffect, useState } from "react";
import { getNotificationAPI, isPsycho } from "../../api/apiPublic";
import { isAuth } from "../../api/AuthContext";
import { clearStorages } from "../../api/tokenStorage";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [checked, setChecked] = useState(false);
  const handleToggleMenu = () => {
    setToggleMenu(!toggleMenu);
  };
  useEffect(() => {
    if (!isPsycho()) {
      const fetchData = async () => {
        const data = await getNotificationAPI();
       
        setChecked(data.check);
      };
      fetchData();
      const interval = setInterval(async () => {
        // Function to be executed every 30 seconds
        const data = await getNotificationAPI();
      
        setChecked(data.check);
      }, 30000);
      return () => {
        clearInterval(interval);
      };
    }
  }, []);

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
                <div className="notification">
                  <Link to="/problems" className="navbar__container-links_item">
                    Мої проблеми
                  </Link>
                  {checked == true && <div className="notification-icon"></div>}
                </div>
                <Link
                  to="/approved-problems"
                  className="navbar__container-links_item"
                >
                  Узгоджено
                </Link>
                <Link to="/psychos" className="navbar__container-links_item">
                  Психологи
                </Link>
                <Link to="/journal" className="navbar__container-links_item">
                  Журнал
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
                <Link
                  to="/journallist"
                  className="navbar__container-links_item"
                >
                  Список журналів
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
                <div
                  className="navbar-smallscreen_item-wrapper"
                  onClick={handleToggleMenu}
                >
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
                <div
                  className="navbar-smallscreen_item-wrapper"
                  onClick={handleToggleMenu}
                >
                  {!isPsycho() ? (
                    <Link to="/problems" className="navbar-smallscreen_item">
                      Мої проблеми
                    </Link>
                  ) : (
                    <Link
                      to="/approved-problems"
                      className="navbar-smallscreen_item"
                    >
                      Узгоджено
                    </Link>
                  )}
                </div>
                {/* --------------------------------- */}
                {isPsycho() && (
                  <div
                    className="navbar-smallscreen_item-wrapper"
                    onClick={handleToggleMenu}
                  >
                    <Link to="/journallist" className="navbar-smallscreen_item">
                      Список журналів
                    </Link>
                  </div>
                )}
                {/* --------------------------------- */}
                <div
                  className="navbar-smallscreen_item-wrapper"
                  onClick={handleToggleMenu}
                >
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
                  <div
                    className="navbar-smallscreen_item-wrapper"
                    onClick={handleToggleMenu}
                  >
                    <Link to="/psychos" className="navbar-smallscreen_item">
                      Психологи
                    </Link>
                  </div>
                )}
                {!isPsycho() && (
                  <div
                    className="navbar-smallscreen_item-wrapper"
                    onClick={handleToggleMenu}
                  >
                    <Link to="/journal" className="navbar-smallscreen_item">
                      Журнал
                    </Link>
                  </div>
                )}
                {!isPsycho() && (
                  <div
                    className="navbar-smallscreen_item-wrapper"
                    onClick={handleToggleMenu}
                  >
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
