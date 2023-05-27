import '../MyProblemID/MyProblemID.css';
import "./CreateProblem.css";
import { useEffect, useState } from "react";
import { isAuth } from "../../../api/AuthContext";
import { createProblemAPI} from "../../../api/apiPatient.js";
import {Alert, ProblemInput} from "../../../components/index.js";
import {digits, emailRegex} from "../../../constants/index.js";

const CreateProblem = () => {
  const [title,setTitle]=useState('');
  const [description,setDescription]=useState('');
  const [number,setNumber]=useState('');
  const [mail,setMail]=useState('');
  const [conclusion,setConclusion]=useState('');
  const handleTitle=(e)=>{
    if(e.target.value.length<80) {
      setTitle(e.target.value)
    }
  }
  const handleDescription=(e)=>{
    if(e.target.value.length<400) {
      setDescription(e.target.value)
    }
  }
  const handleNumber=(e)=>{
    if(digits.test(e.target.value)&&(e.target.value.length<15)) {
      setNumber(e.target.value)
    }
  }
  const handleMail=(e)=>{
      setMail(e.target.value)
  }
  const handleConclusion=(e)=>{
    if(e.target.value.length<400) {
      setConclusion(e.target.value)
    }
  }
  useEffect(() => {
    if (!isAuth()) {
      window.location.href = "/login";
    }
  }, [isAuth()]);
  const [text,setText]=useState("Заповність усі поля");
  const [showAlert, setShowAlert] = useState(false);
  const handleCloseAlert=()=>{
    setShowAlert(!showAlert);
  }
  const create= async ()=>{
    if(!title||!description||!conclusion||!number||!mail){
      setShowAlert(true);
      setText("Заповність усі поля");
    }
    else if(!emailRegex.test(mail)){
      setShowAlert(true);
      setText("Не коректна електронна адреса");
    }
    else {
      setShowAlert(false);
      const contacts = number + ", " + mail;
      const response = await createProblemAPI(title, description, conclusion, contacts);
      window.location.href="/problem/"+response.data.id;
    }
  }

  return (
      <div className="problem">
       <Alert text={text} handleCloseAlert={handleCloseAlert} showAlert={showAlert} />
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
