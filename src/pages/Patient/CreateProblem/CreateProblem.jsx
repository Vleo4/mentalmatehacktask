import '../MyProblemID/MyProblemID.css';
import "./CreateProblem.css";
import { useEffect, useState } from "react";
import { isAuth } from "../../../api/AuthContext";
import ProblemInput from "../../../components/ProblemInput/ProblemInput.jsx";
import { createProblemAPI} from "../../../api/apiPatient.js";

const CreateProblem = () => {
  const [title,setTitle]=useState('');
  const [description,setDescription]=useState('');
  const [number,setNumber]=useState('');
  const [mail,setMail]=useState('');
  const [conclusion,setConclusion]=useState('');
  const handleTitle=(e)=>{
    setTitle(e.target.value)
  }
  const handleDescription=(e)=>{
    setDescription(e.target.value)
  }
  const handleNumber=(e)=>{
    setNumber(e.target.value)
  }
  const handleMail=(e)=>{
    setMail(e.target.value)
  }
  const handleConclusion=(e)=>{
    setConclusion(e.target.value)
  }
  useEffect(() => {
    if (!isAuth()) {
      window.location.href = "/login";
    }
  }, [isAuth()]);
  const create=()=>{
    const contacts =number+", "+mail;
    createProblemAPI(title,description,conclusion,contacts);
  }
  return (
      <div className="problem">
            <div className="problem__container">
              <div className="problem__container__container">
                <ProblemInput title={title}
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
                  Створити
                </div>
              </div>
            </div>
      </div>)
};

export default CreateProblem;
