import "../Statement/Statement.css";
import images from "../../constants/images.js";
import {useEffect, useState} from "react";
import {viewPsychoProfileApi} from "../../api/apiPsycho.js";

const Specialist = (props) => {
    const [psycho, setPsycho] = useState();
    useEffect(() => {
        const fetchUser = async () => {
            const data = await viewPsychoProfileApi(props.executor);
           
            setPsycho(data);
        };
        fetchUser();
    }, []);
    return (
        <div className="specialist">
            {psycho && <>
                <div className="statement__first">
                    <img src={images.Psycho} alt="india"/>
                    <div className="statement_text">
                        <div>{psycho.name}</div>
                        <div>Age: {psycho.age}</div>
                        <div>Допомоги: {psycho&&psycho.total_helped}</div>
                        <div className="email">
                            <p className="profile__container-text-p">Ел. пошта:</p>
                            <span>{psycho && psycho.contacts.split(", ")[1]}</span>
                        </div>
                        <div className="phone">
                            <p className="profile__container-text-p">Номер телефону:</p>
                            <span style={{whiteSpace: "nowrap"}}>
                                {psycho && psycho.contacts.split(", ")[0]}
                            </span>
                        </div>
                    </div>

                </div>
                <div className="statement_buttons">
                    <div className="statement_button_big" onClick={() => {
                        window.location.href = "/psycho-profile/" + props.executor
                    }}>Профіль
                    </div>
                </div>
            </>
            }
        </div>
    )
};

export default Specialist;
