import "./Main.css";
import { isAuth } from "../../../api/AuthContext.jsx";
import "../Login/Login.css";
import { Link } from "react-router-dom";
import { isPsycho } from "../../../api/apiPublic.js";

const Main = () => {
  return (
    <div className="app__main">
     
      <section className="app__main-content">
        <div className="app__main-content_text">
          <h1>MENTALMATE</h1>
          {!isAuth() ? (
            <Link to="/register" className="app__main-content_text-button">
              Зареєструватися
            </Link>
          ) : !isPsycho() ? (
            <Link
              to="/problem/create"
              className="app__main-content_text-button"
            >
              Перейти в додаток
            </Link>
          ) : (
            <Link to="/problems" className="app__main-content_text-button">
              Перейти в додаток
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Main;
