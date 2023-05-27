import images from "../../../constants/images";
import "./Main.css";
import { isAuth } from "../../../api/AuthContext.jsx";
import "../Login/Login.css";
import { Link } from "react-router-dom";
import { isPsycho } from "../../../api/api.js";

const Main = () => {
  const reviews = [
    {
      text: "Я справді бачу прогрес у своєму психічному здоров’ї, чого я не міг сказати за 15 років, і це завдяки йому.",
      imgUrl: images.Profile1,
      name: "Бобік Додікович",
    },
    {
      text: "Дауні слухає та дає чудові поради в життєвих ситуаціях.",
      imgUrl: images.Profile2,
      name: "Дауні Леопардуі",
    },
    {
      text: "Міталік вражає своєю проникливістю та підходом до спілкування. Я дуже радий і благословенний, що знайшов його.",
      imgUrl: images.Profile3,
      name: "Міталік Вітнічук",
    },
  ];

  const headText =
    "Відчуйте спокій у своєму житті: безкоштовна онлайн платформа для психологічної допомоги та підтримки";

  const description =
    "MentalMate - це безкоштовний сайт, на якому люди можуть залишати заявки для отримання психологічної підтримки від волонтерів-психологів. Наша мета - допомогти людям знайти підтримку в складний період життя. Психологи, також отримують цінний досвід і знання, працюючи з різними людьми та проблемами";
  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };
  return (
    <div className="app__main">
      <div className="app__main-wrapper">
        <nav className="app__main-navbar">
          <h1>MentalMate</h1>
          <div className="app__main-navbar_links">
            {isAuth() ? (
              isPsycho() ? (
                <Link to="/profile" className="app__main-navbar_links-item">
                  Profile
                </Link>
              ) : (
                <p
                  onClick={logout}
                  style={{ cursor: "pointer" }}
                  className="app__main-navbar_links-item"
                >
                  Patient / Log Out
                </p>
              )
            ) : (
              <>
                <Link to="/login" className="app__main-navbar_links-item">
                  Log in
                </Link>
                <Link to="/register" className="app__main-navbar_links-item">
                  Sign up
                </Link>
              </>
            )}
          </div>
        </nav>
        <section className="app__main-content">
          <div className="app__main-content_text">
            <p>© Saton Team</p>
            <h1>{headText}</h1>
            <h3>{description}</h3>
            {!isAuth() ? (
              <Link to="/register" className="app__main-content_text-button">
                Зареєструватися
              </Link>
            ) : !isPsycho() ? (
              <Link to="/" className="app__main-content_text-button">
                Інше посилання
              </Link>
            ) : (
              <Link to="/problems" className="app__main-content_text-button">
                Перейти в додаток
              </Link>
            )}
          </div>
          <div className="app__main-content_review">
            {reviews.map((review) => (
              <div className="review-card" key={review.name}>
                <div className="review-card_text">
                  <img src={images.Commas} alt="Commas" />
                  <p>{review.text}</p>
                  <img src={images.Commasreverse} alt="Commasreverse" />
                </div>
                <div className="review-card_user">
                  <img src={review.imgUrl} alt="imgUrl" />
                  <h6>Відгук від користувача для {review.name}</h6>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Main;
