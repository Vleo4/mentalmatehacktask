/* ---------------------------------------- КОД ВЄТАЛЯ ----------------------------------- */

import images from "../../constants/images";
import "./Main.css";
import { isAuth } from "../../api/AuthContext.jsx";
import { Link } from "react-router-dom";
import {isPsycho} from "../../api/api.js";

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
  const logout= ()=>{localStorage.clear(); window.location.href="/login"}
  return (
    <div className="app__main">
      <div className="app__main-wrapper">
        <nav className="app__main-navbar">
          <h1>MentalMate</h1>
          <div className="app__main-navbar_links">
            {isAuth() ? (
                isPsycho()?
              <Link to="/profile" className="app__main-navbar_links-item">
                Profile
              </Link>:
              <p onClick={logout} className="app__main-navbar_links-item">
                U NOT PSYCHO/LOGOUT
              </p>
            ) : (<>
                <Link to="/login" className="app__main-navbar_links-item">
                  Log in
                </Link>
                <Link to="/login" className="app__main-navbar_links-item">
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
            <Link to="/register" className="app__main-content_text-button">
              Зареєструватися
            </Link>
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

/* const Main = () => {
  const logout= ()=>{localStorage.clear(); window.location.href="/register"}
  const login= ()=>{localStorage.clear(); window.location.href="/login"}
  const profile= ()=>{window.location.href="/profile"}

  return (
    <div className="main">
      <div className="main__navbar">
        <div className="navbar_logo">MentalMate</div>
        <div className="navbar_menu">
          {isAuth()?          <>
              <div className="navbar_login" onClick={profile}>Profile</div>
              <div className="navbar_login" onClick={logout}>LOG OUT</div></>
              :
              <>
            <div className="navbar_login" onClick={login}>Login</div>
          <div className="navbar_register" onClick={logout}>Sign up</div></>
        }
        </div>
      </div>

      <div className="main__info">
        <div className="main_descryption">
          <div className="main_copy">© Saton Team</div>
          <div className="main_content">
            Відчуйте спокій у своєму житті: безкоштовна онлайн платформа для
            психологічної допомоги та підтримки
          </div>
          <div className="main_company_info">
            MentalMate - це безкоштовний сайт, на якому пацієнти можуть залишати
            заявки для отримання психологічної підтримки від
            волонтерів-психологів. Наша мета - допомогти людям знайти підтримку
            в складний період життя
          </div>
          <div className="main_menu">
            <div className="main_register">Зареєструватися</div>
          </div>
        </div>
        <div className="main_comment_info">
          <div className="main_comment">
            <div className="main_comment_text">
              <img src={images.Commas} alt="" />
              <p>
                Я справді бачу прогрес у своєму психічному здоров’ї, чого я не
                міг сказати за 15 років, і це завдяки йому.
              </p>
              <img src={images.Commasreverse} alt="" />
            </div>
            <div className="main_comment_response">
              <img src={images.Profile1} alt="" />
              <p>відгук від користувача для Бобік Додікович</p>
            </div>
          </div>
          <div className="main_comment">
            <div className="main_comment_text">
              <img src={images.Commas} alt="" />
              <p>Дауні слухає та дає чудові поради в життєвих ситуаціях.</p>
              <img src={images.Commasreverse} alt="" />
            </div>
            <div className="main_comment_response">
              <img src={images.Profile2} alt="" />
              <p>відгук від користувача для Дауні Леопардуі</p>
            </div>
          </div>
          <div className="main_comment">
            <div className="main_comment_text">
              <img src={images.Commas} alt="" />
              <p>
                Міталік вражає своєю проникливістю та підходом до спілкування.
              </p>
              <img src={images.Commasreverse} alt="" />
            </div>
            <div className="main_comment_response">
              <img src={images.Profile3} alt="" />
              <p>відгук від користувача для Міталік Вітнічук</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main; */
