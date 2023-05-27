import { useNavigate } from "react-router-dom";
import { clearStorages } from "../../api/tokenStorage";
import images from "../../constants/images";
import "./Profile.css";
import { useEffect, useState } from "react";
import { isAuth } from "../../api/AuthContext";
import { editProfileApi, profileApi } from "../../api/api";
import { Loader } from "../../components";

const Profile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    if (!isAuth()) {
      window.location.href = "/login";
    }
  }, [isAuth()]);

  const logOut = () => {
    clearStorages();
    navigate("/");
  };

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      const data = await profileApi();
      console.log(data);
      setUser(data);
      setIsLoading(false);
    };
    fetchUser();
  }, []);

  return (
    <div className="profile">
      <div className="profile__container">
        {isLoading ? (
          <div className="loading-screen">
            <Loader />
          </div>
        ) : (
          <>
            <div className="profile__container-mainInfo">
              <div className="profile__container-mainInfo_text">
                <p className="profile__container-text-p">
                  З нами від 12 травня 2023
                </p>
                <div className="edit">
                  <h1>{user && user.psycho.name}</h1>
                  <p className="edit-text">
                    <img src={images.Edit} alt="Edit" /> Редагувати
                  </p>
                </div>
                <h2 style={{ marginTop: 12 }}>Психолог</h2>
                <div
                  className="age"
                  style={{ marginTop: 16, marginBottom: 16 }}
                >
                  <p className="profile__container-text-p">Вік:</p>
                  <span>{user && user.psycho.age}</span>
                </div>
                <div className="cv">
                  <p className="profile__container-text-p">Резюме:</p>
                  <a
                    href={user && user.psycho.cv}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Переглянути
                  </a>
                </div>
                <div className="help" style={{ marginTop: 16 }}>
                  <p className="profile__container-text-p">Допоміг</p>
                  <span>{user && user.psycho.total_helped}</span>
                  <p className="profile__container-text-p">людям</p>
                </div>
              </div>
              <div className="profile__container-mainInfo_img">
                <img src={images.Avatar} alt="Avatar" />
              </div>
            </div>
            <div className="line" />
            <div className="profile__container-contacts">
              <div className="edit">
                <h2>Контактні дані:</h2>
                <p className="edit-text">
                  <img src={images.Edit} alt="Edit" /> Редагувати
                </p>
              </div>
              <div
                className="email"
                style={{ marginTop: 20, marginBottom: 16 }}
              >
                <p className="profile__container-text-p">Ел. пошта:</p>
                <span>example@email.com</span>
              </div>
              <div className="phone">
                <p className="profile__container-text-p">Номер телефону:</p>
                <span style={{ whiteSpace: "nowrap" }}>+38 ХХХ ХХХ-ХХ-ХХ</span>
              </div>
              <div className="telegram" style={{ marginTop: 16 }}>
                <p className="profile__container-text-p">Телеграм:</p>
                <span>@P3D0_Philip</span>
              </div>
            </div>
            <div className="line" />
            <div className="profile__container-routes">
              <div className="edit">
                <h2>Напрями:</h2>
                <p className="edit-text">
                  <img src={images.Edit} alt="Edit" /> Редагувати
                </p>
              </div>
              <ul>
                {user &&
                  user.psycho.perspective
                    .split(",")
                    .map((pers, index) => <li key={index}>{pers.trim()}</li>)}
              </ul>
            </div>
            <div className="line" />
            <div className="profile__container-skills">
              <div className="edit">
                <h2>Навички:</h2>
                <p className="edit-text">
                  <img src={images.Edit} alt="Edit" /> Редагувати
                </p>
              </div>
              <ul>
                {user &&
                  user.psycho.skills
                    .split(",")
                    .map((skill, index) => <li key={index}>{skill.trim()}</li>)}
              </ul>
            </div>
            <div className="line" />
            <div className="profile__container-languages">
              <div className="edit">
                <h2>Знання мов:</h2>
                <p className="edit-text">
                  <img src={images.Edit} alt="Edit" /> Редагувати
                </p>
              </div>
              <ul>
                {user &&
                  user.psycho.lang
                    .split(",")
                    .map((language, index) => (
                      <li key={index}>{language.trim()}</li>
                    ))}
              </ul>
            </div>
            <div className="line" />
            <div className="profile__container-additional">
              <div className="edit">
                <h2>Додаткова інформація</h2>
                <p className="edit-text">
                  <img src={images.Edit} alt="Edit" /> Редагувати
                </p>
              </div>
              <p style={{ marginTop: 24 }}>{user && user.psycho.description}</p>
            </div>
            <button className="logout" onClick={logOut}>
              Вийти з аккаунту
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
