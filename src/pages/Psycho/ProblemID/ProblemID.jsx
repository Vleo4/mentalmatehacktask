import '../../Patient/MyProblemID/MyProblemID.css';
import "./ProblemID.css";
import { useEffect, useState } from "react";
import { isAuth } from "../../../api/AuthContext";
import {Problem, TopLoader} from "../../../components/index.js";
import {getProblemPsychoApi, psychoAnswerAPI} from "../../../api/apiPsycho.js";
import {useParams} from "react-router-dom";
import jwtDecode from "jwt-decode";
import {getFromLocalStorage} from "../../../api/tokenStorage.js";

const ProblemID = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { id }=useParams();
  useEffect(() => {
    if (!isAuth()) {
      window.location.href = "/login";
    }
  }, [isAuth()]);

  const [problem,setProblem]=useState(null);
  const fetchProblem = async () => {
    setIsLoading(true);
    const data = await getProblemPsychoApi(id);
    setProblem(data);
    setTimeout(() => setIsLoading(false), 600);
  };
  useEffect(()=>{
    fetchProblem();
  },[]);
  const answer= async ()=> {
    await psychoAnswerAPI(id);
    fetchProblem();
  }
  const accessToken = getFromLocalStorage("ACCESS_TOKEN");
  const userId = jwtDecode(accessToken).user_id;
  return (
    <div className="problem">
      {isLoading ? (
        <TopLoader />
      ) : (
        <div className="problem__container">
          <div className="problem__container__container">
            {problem&&<Problem problem={problem}/>}
            {problem&&problem.is_answered===false&&
            <div className="problemId__button white" onClick={answer}>
              Допомогти
            </div>}
            {problem&&problem.executor&&<>
            <div className="problemId__button green">
                  Заявку прийнято
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
            </>
            }
            {problem&&problem.is_answered===true&&!problem.executor&&<><div className="problemId__button orange">
              Заявку надіслано
            </div>
            <div className="problemId__button white">
            Відмовитися
          </div>
          </>}
          </div>
        </div>
      )}
    </div>)
};

export default ProblemID;
