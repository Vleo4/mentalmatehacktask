import '../../Patient/MyProblemID/MyProblemID.css';
import "./ProblemID.css";
import { useEffect, useState } from "react";
import { isAuth } from "../../../api/AuthContext";
import { TopLoader } from "../../../components";
import {Problem} from "../../../components/index.js";
import {getProblemsApi, psychoAnswerAPI} from "../../../api/apiPsycho.js";
import {useParams} from "react-router-dom";
import {getMyProblemsApi} from "../../../api/apiPatient.js";

const ProblemID = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { id }=useParams();
  useEffect(() => {
    if (!isAuth()) {
      window.location.href = "/login";
    }
  }, [isAuth()]);

  const [problem,setProblem]=useState(null);
  useEffect(()=>{
    const fetchProblem = async () => {
      setIsLoading(true);
      const data = await getProblemsApi();
      data.map((prob)=>{
        if(prob.id==id){
          setProblem(prob)
        }
      })
      setTimeout(() => setIsLoading(false), 600);
    };
    fetchProblem();
  },[]);
  const answer= async ()=> {
    const data=await psychoAnswerAPI(id);
    console.log(data);
  }

  return (
    <div className="problem">
      {isLoading ? (
        <TopLoader />
      ) : (
        <div className="problem__container">
          <div className="problem__container__container">
            {problem&&<Problem problem={problem}/>}
            <div className="problemId__button white" onClick={answer}>
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
