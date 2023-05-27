import "./Statement.css";
import images from "../../constants/images.js";
import {approveProblemAPI} from "../../api/apiPatient.js";
const Statement = (props) => {
        console.log(props.data)
    const approve=(bool)=>{
        approveProblemAPI(props.data.id,bool);
        window.location.href="/problem/"+props.data.order;
    }
    return (
        <div className="statement">
            <div className="statement__first">
            <img src={images.Psycho} alt="india"/>
            <div className="statement_text">
                <div>name</div>
                <div>Age: 19</div>
            </div>
            </div>
            <div className="statement_buttons">
                <div className="statement_button_big" onClick={()=>{window.location.href="/psycho-profile/"+props.data.executor}}>Переглянути профіль</div>
                <div className="statement_buttons_smalls">
                <div className="statement_button_small" onClick={()=>{approve(false)}}>Відхилити</div>
                <div className="statement_button_small" onClick={()=>{approve(true)}}>Прийняти</div>
                </div>
            </div>

        </div>
    )
};

export default Statement;
