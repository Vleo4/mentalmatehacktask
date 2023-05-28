import "./Main.css";
import { isAuth } from "../../../api/AuthContext.jsx";
import "../Login/Login.css";
import { Link } from "react-router-dom";
import { isPsycho } from "../../../api/apiPublic.js";
import { images } from "../../../constants";
import { useRef, useState } from "react";

const Main = () => {
  const appMainLastRef = useRef(null);
  const handleScrollToLast = () => {
    appMainLastRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const [showArrowDown, setShowArrowDown] = useState(true);
  const handleArrowShow = () => {
    setShowArrowDown(!showArrowDown);
  };
  return (
    <div className="app__main">
      <section className="app__main-content">
        <div className="app__main-content_text">
          <h1>Психологічна підтримка</h1>
          <h2>
            Знайдіть психологічну допомогу або станьте підтримкою для інших
          </h2>
          {!isAuth() ? (
            <Link to="/register" className="app__main-content_text-button">
              Спробувати зараз
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
        <img
          src={images.ArrowDownMain}
          className={`arrodown ${showArrowDown ? "active" : ""}`}
          alt="ArrowDownMain"
          onClick={() => {
            handleScrollToLast();
            handleArrowShow();
          }}
        />
      </section>
      <section className="app__main-last" ref={appMainLastRef}>
        <h1>Про проєкт</h1>
        <p>
          MentalMate - це безкоштовний сайт, який надає можливість людям
          залишати заявки для отримання психологічної підтримки від
          волонтерів-психологів. Головною метою нашого проекту є надання
          допомоги людям у складний період їхнього життя. Ми розуміємо,
          наскільки важлива підтримка може бути у такі часи, тому пропонуємо
          платформу, де ви можете знайти психологів, готових надати вам
          необхідну допомогу.<br></br> Окрім того, робота волонтерам-психологам
          також надає цінний досвід і знання. Вони мають можливість набувати
          нові знання і розуміння різних аспектів людської психології, що
          дозволяє їм стати кращими в цьому руслі.
        </p>
      </section>
    </div>
  );
};

export default Main;
