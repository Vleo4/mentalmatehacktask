import images from "../../constants/images";
import "./Main.css";
import {isAuth} from "../../api/AuthContext.jsx";

const Main = () => {
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
            <div className="main_help">Стати психологом</div>
            <div className="main_need_help">Стати пацієнтом</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
