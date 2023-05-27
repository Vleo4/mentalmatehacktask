import "./Statement.css";
import images from "../../constants/images.js";
import {approveProblemAPI} from "../../api/apiPatient.js";
import {useEffect, useState} from "react";
import {viewPsychoProfileApi} from "../../api/apiPsycho.js";
const Statement = (props) => {
    const [psycho, setPsycho] = useState();
    useEffect(() => {
        const fetchUser = async () => {
            const data = await viewPsychoProfileApi(props.data.executor);
            setPsycho(data.psycho);
        };
        fetchUser();
    }, []);
    const approve=(bool)=>{
        approveProblemAPI(props.data.id,bool);
        props.fetchProblem();
        props.fetchProblem();
    }
    return (
        <div className="statement">
            <div className="statement__first">
            <img src={images.Psycho} alt="india"/>
            <div className="statement_text">
                <div>{psycho&&psycho.name}</div>
                <div>Age: {psycho&&psycho.age}</div>
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
