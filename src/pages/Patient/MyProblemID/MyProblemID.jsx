import "./MyProblemID.css";
import { useEffect, useState } from "react";
import { isAuth } from "../../../api/AuthContext";
import { TopLoader } from "../../../components";
import { Problem, Statement } from "../../../components/index.js";
import {
  closeProblemAPI,
  createProblemAPI,
  editProblemAPI,
  getMyProblemsApi,
} from "../../../api/apiPatient.js";
import { useParams } from "react-router-dom";
import ProblemInput from "../../../components/ProblemInput/ProblemInput.jsx";
import { updatePsycho } from "../../../api/apiPsycho.js";
const MyProblemID = () => {
  const [isLoading, setIsLoading] = useState(false);
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
  const fetchProblem = async () => {
    setIsLoading(true);
    const data = await getMyProblemsApi();
    let boolData = false;
    data.map((prob) => {
      if (prob.id == id) {
        console.log(prob);
        setProblem(prob);
        boolData = true;
        setTitle(prob.title);
        setDescription(prob.essence);
        setNumber(prob.contacts.split(", ")[0]);
        setMail(prob.contacts.split(", ")[1]);
        setConclusion(prob.conclusion);
      }
    });
    if (!boolData) {
      window.location.href = "/problems";
    }
    setTimeout(() => setIsLoading(false), 600);
  };
  useEffect(() => {
    fetchProblem();
  }, []);

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleNumber = (e) => {
    setNumber(e.target.value);
  };
  const handleMail = (e) => {
    setMail(e.target.value);
  };
  const handleConclusion = (e) => {
    setConclusion(e.target.value);
  };
  useEffect(() => {
    if (!isAuth()) {
      window.location.href = "/login";
    }
  }, [isAuth()]);
  const create = () => {
    const contacts = number + ", " + mail;
    editProblemAPI(title, description, conclusion, contacts, id);
    setIsEdit(false);
    fetchProblem();
  };

  return (
    <div className="problem">
      {isLoading ? (
        <TopLoader />
      ) : (
        <div className="problem__container">
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
                        setTimeout((window.location.href = "/problems"), 1000);
                      }}
                    >
                      Видалити
                    </div>
                  </div>
                )}
                <div className="problem__container_peoples">Заявки:</div>
                <Statement />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProblemID;
