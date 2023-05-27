import { useEffect, useState } from "react";
import "./PsychoProfile.css";
import { isAuth } from "../../../api/AuthContext";
import { isPsycho } from "../../../api/apiPublic";
import { TopLoader } from "../../../components";
import { viewPsychoProfileApi } from "../../../api/apiPsycho";
import images from "../../../constants/images";
import { useParams } from "react-router-dom";

const PsychoProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [psycho, setPsycho] = useState();
  const { id } = useParams();
  useEffect(() => {
    if (!isAuth()) {
      window.location.href = "/login";
    }
  }, [isAuth()]);

  useEffect(() => {
    if (isPsycho()) {
      window.location.href = "/";
    }
  }, [isPsycho()]);
  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      const data = await viewPsychoProfileApi(id);
      if(!data){
        window.location.href='/';
      }
      setPsycho(data.psycho);
      setTimeout(() => setIsLoading(false), 600);
    };
    fetchUser();
  }, []);

  return (
    <div className="profile">
      {isLoading ? (
        <TopLoader />
      ) : (
        <div className="profile__container">
          <div className="profile__container-mainInfo">
            <div className="profile__container-mainInfo_text">
              <p className="profile__container-text-p">
                З нами від{" "}
                {psycho &&
                  psycho.join_date.split("T")[0].split("-").reverse().join("-")}
              </p>

              <h1>{psycho && psycho.name}</h1>

              <h2 style={{ marginTop: 12 }}>Психолог</h2>
              <div className="age" style={{ marginTop: 16, marginBottom: 16 }}>
                <p className="profile__container-text-p">Вік:</p>

                <span>{psycho && psycho.age}</span>
              </div>
              <div className="cv">
                <p className="profile__container-text-p">Резюме:</p>
                <a
                  href={psycho && psycho.cv}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Переглянути
                </a>
              </div>
              <div className="help" style={{ marginTop: 16 }}>
                <p className="profile__container-text-p">Допоміг</p>
                <span>{psycho && psycho.total_helped}</span>
                <p className="profile__container-text-p">людям</p>
              </div>
            </div>
            <div className="profile__container-mainInfo_img">
              <img src={images.Avatar} alt="Avatar" />
            </div>
          </div>
          <div className="line" />
          <div className="profile__container-contacts">
            <h2>Контактні дані:</h2>

            <div className="email" style={{ marginTop: 20, marginBottom: 16 }}>
              <p className="profile__container-text-p">Ел. пошта:</p>
              <span>{psycho &&psycho.contacts.split(", ")[0]}</span>
            </div>
            <div className="phone">
                <p className="profile__container-text-p">Номер телефону:</p>
              <span style={{ whiteSpace: "nowrap" }}>
                {psycho && psycho.contacts.split(", ")[1]}
              </span>
            </div>
          </div>
          <div className="line" />
          <div className="profile__container-routes">
            <h2>Напрями:</h2>
            <ul>
              {psycho &&
                psycho.perspective
                  .split(", ")
                  .map((pers, index) => <li key={index}>{pers.trim()}</li>)}
            </ul>
          </div>
          <div className="line" />
          <div className="profile__container-languages">
            <h2>Знання мов:</h2>

            <ul>
              {psycho &&
                psycho.lang
                  .split(", ")
                  .map((language, index) => (
                    <li key={index}>{language.trim()}</li>
                  ))}
            </ul>
          </div>
          <div className="line" />
          <div className="profile__container-additional">
            <h2>Додаткова інформація</h2>
            <p style={{ marginTop: 24 }}>{psycho && psycho.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PsychoProfile;
