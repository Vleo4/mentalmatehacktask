import "./MyProblemID.css";
import { useEffect, useState } from "react";
import { isAuth } from "../../../api/AuthContext";
import { Alert, TopLoader } from "../../../components";
import {Problem, Specialist, Statement, ProblemInput, ReviewCreate} from "../../../components/index.js";
import {
  closeProblemAPI,
  editProblemAPI,
  getMyProblemIDApi,
} from "../../../api/apiPatient.js";
import { useParams } from "react-router-dom";
import { digits, emailRegex } from "../../../constants/index.js";
import {Error404} from "../../index.js";
const MyProblemID = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [createReview, setCreateReview] = useState(false);
  const [problem, setProblem] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    if (!isAuth()) {
      window.location.href = "/login";
    }
  }, [isAuth()]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [number, setNumber] = useState("");
  const [mail, setMail] = useState("");
  const [conclusion, setConclusion] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [error,setError]=useState(false);
  const fetchProblem = async () => {
    setIsLoading(true);
    const prob = await getMyProblemIDApi(id);
    if(prob===undefined){
      setError(true);
    }
    setProblem(prob);
    setTitle(prob.title);
    setDescription(prob.essence);
    setNumber(prob.contacts.split(", ")[0]);
    setMail(prob.contacts.split(", ")[1]);
    setConclusion(prob.conclusion);
    setTimeout(() => setIsLoading(false), 600);
  };
  useEffect(() => {
    fetchProblem();
  }, []);
  const handleTitle = (e) => {
    if (e.target.value.length < 80) {
      setTitle(e.target.value);
    }
  };
  const handleDescription = (e) => {
    if (e.target.value.length < 400) {
      setDescription(e.target.value);
    }
  };
  const handleNumber = (e) => {
    if (digits.test(e.target.value) && e.target.value.length < 15) {
      setNumber(e.target.value);
    }
  };
  const handleMail = (e) => {
    setMail(e.target.value);
  };
  const handleConclusion = (e) => {
    if (e.target.value.length < 400) {
      setConclusion(e.target.value);
    }
  };
  useEffect(() => {
    if (!isAuth()) {
      window.location.href = "/login";
    }
  }, [isAuth()]);

  const [text, setText] = useState("Заповність усі поля");
  const [showAlert, setShowAlert] = useState(false);
  const handleCloseAlert = () => {
    setShowAlert(!showAlert);
  };
  const create = async () => {
    if (!title || !description || !conclusion || !number || !mail) {
      setShowAlert(true);
      setText("Заповність усі поля");
    } else if (!emailRegex.test(mail)) {
      setShowAlert(true);
      setText("Не коректна електронна адреса");
    } else {
      setShowAlert(false);
      const contacts = number + ", " + mail;
      await editProblemAPI(title, description, conclusion, contacts, id);
      setIsEdit(false);
      fetchProblem();
    }
  };
  return (error?<Error404/>:
          <>
            {createReview&&<ReviewCreate setCreateReview={setCreateReview} executor={problem.executor}/>}
    <div className={createReview?"problem opacity_small":"problem"}>
        <Alert
        text={text}
        handleCloseAlert={handleCloseAlert}
        showAlert={showAlert}
      />
      {isLoading ? (
        <TopLoader />
      ) : (
        <div  className={createReview?"problem__container problem__container_opacity_small":"problem__container"}>
          <div className="problem__container__container">
            {isEdit ? (
              <>
                <ProblemInput
                  title={title}
                  handleTitle={handleTitle}
                  description={description}
                  handleDescription={handleDescription}
                  mail={mail}
                  handleMail={handleMail}
                  number={number}
                  handleNumber={handleNumber}
                  conclusion={conclusion}
                  handleConclusion={handleConclusion}
                />
                <div className="problemId__button white" onClick={create}>
                  Зберегти зміни
                </div>
              </>
            ) : (
              <>
                {problem && <Problem problem={problem} />}
                {problem && problem.is_closed == false && (
                    <div className="problem__container_buttons">
                      <div
                      className="problem__container_button"
                      onClick={() => {
                        setIsEdit(!isEdit);
                      }}
                    >
                      Редагувати
                    </div>
                    <div
                      className="problem__container_button"
                      onClick={() => {
                        setIsLoading(true);
                        closeProblemAPI(id);
                        fetchProblem();
                        fetchProblem();
                        setIsLoading(false);
                      }}
                    >
                      Закрити
                    </div>
                  </div>
                )}

                {problem && !problem.executor && problem.answers.length > 0 && (
                  <>
                    <div className="problem__container_peoples">Заявки:</div>
                    {problem.answers.map((answer) => {
            
                        return <Statement key={answer.id} data={answer} fetchProblem={fetchProblem} />
                
                      }
                    )}
                  </>
                )}
                {problem && problem.answers.length === 0 &&!problem.executor&& (
                  <div className="problem__container_peoples">Немає заявок</div>
                )}
                {problem && problem.executor && (
                  <>
                    <div className="problem__container_peoples">
                      Зв'яжіться зі спеціалістом:
                    </div>
                    <Specialist executor={problem.executor} setCreateReview={setCreateReview}/>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
          </>
  );
};

export default MyProblemID;
