import './ReviewCreate.css';
import {useState} from "react";
import {images} from "../../constants/index.js";
import { createReviewAPI} from "../../api/apiPatient.js";
import {Alert} from "../index.js";

const ReviewCreate = (props) => {
    const [text,setText]=useState("");
    const [ratingStar,setRatingStar]=useState(1);
    const [alert,setAlert]=useState(false);
    const handleCloseAlert=()=>{
        setAlert(false);
    }
  return (
    <div className="review__create">
        <Alert showAlert={alert} handleCloseAlert={handleCloseAlert} text='Ви не можете написати відгук двічі одному психологу'/>
      <div className="review__create_container">
          <div className="review__block">
          <div className="review__create_header">Залишіть відгук</div>
          <img src={images.CrossIcon} onClick={()=>{
              props.setCreateReview(false);
          }}/>
          </div>
          <div className="review__create_text">Напишіть коротко про психолога*</div>
          <textarea value={text} onChange={(e)=>{
              setText(e.target.value);
          }}/>
          <div className="stars">
          {Array.from({ length: 5 }, (rating,id) => {if(id>=ratingStar){
              return <img key={id} src={images.EmptyStar} onClick={()=>{setRatingStar(id+1)}} alt="star"/>
          }
          else{
             
          return <img key={id} onClick={()=>{setRatingStar(id+1)}} src={images.Star} alt="star"/>}
          })
          }
          </div>
          <div className="review__create__button" onClick={()=>{
              createReviewAPI(ratingStar,text,props.executor).then((error)=>{
                  if(error.status!==201){
                      setAlert(true);
                  }
                  else{
                      props.setCreateReview(false);
                  }
              })
          }}>
              Оцінити
          </div>
      </div>
    </div>
  )
}

export default ReviewCreate
