import "./MyProblemID.css";
import { useEffect, useState } from "react";
import { isAuth } from "../../../api/AuthContext";
import { TopLoader } from "../../../components";
import {Problem, Statement} from "../../../components/index.js";
const MyProblemID = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [problem,setProblem]=useState();

  useEffect(() => {
    if (!isAuth()) {
      window.location.href = "/login";
    }
  }, [isAuth()]);
  useEffect(()=>{
    const fetchProblem = async () => {
    setIsLoading(true);
    const data = await profileApi();
   
    setProblem(data);
    setTimeout(() => setIsLoading(false), 600);
  };
    fetchProblem();
  },[])



  return (
      <div className="problem">
        {isLoading ? (
            <TopLoader />
        ) : (
            <div className="problem__container">
              <div className="problem__container__container">
                <Problem/>
                <div className="problem__container_buttons">
                  <div className="problem__container_button">
                    Редагувати
                  </div>
                  <div className="problem__container_button">
                    Видалити
                  </div>
                </div>
                <div  className="problem__container_peoples">
                  Заявки:
                </div>
                <Statement/>
                <Statement/>
              </div>
            </div>
        )}
      </div>)
};

export default MyProblemID;
