import '../../Public/MyProblemID/MyProblemID.css';
import "./ProblemID.css";
import { useEffect, useState } from "react";
import { isAuth } from "../../../api/AuthContext";
import { TopLoader } from "../../../components";
import {Problem} from "../../../components/index.js";

const ProblemID = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isAuth()) {
      window.location.href = "/login";
    }
  }, [isAuth()]);

  const fetchUser = async () => {
    setIsLoading(true);
    const data = await profileApi();
    console.log(data);
    setUser(data);
    setTimeout(() => setIsLoading(false), 600);
  };


  return (
    <div className="problem">
      {isLoading ? (
        <TopLoader />
      ) : (
        <div className="problem__container">
          <div className="problem__container__container">
          <Problem/>
            <div className="problemId__button white">
              Допомогти
            </div>
            <div className="problemId__button white">
              Відмовитися
            </div>
            <div  className="problem__container_peoples">
            Контактні дані:
            </div>
            <div className="problem__contacts">
              <div className="problem__contact">
                <div>Ел. пошта: </div>
                <span>example@gmail.com</span>
              </div>
              <div className="problem__contact">
                <div>Номер телефону: </div>
                <span>+38 fads fdas 8008 </span>
              </div>
              <div className="problem__contact">
                <div>Telegram: </div>
                <span>@p3edo</span>
              </div>
            </div>
            <div className="problemId__button orange">
              Заявку надіслано
            </div>
            <div className="problemId__button green">
              Заявку прийнято
            </div>
          </div>
        </div>
      )}
    </div>)
};

export default ProblemID;
