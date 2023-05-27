import "./Statement.css";
import images from "../../constants/images.js";
const Statement = () => {

    return (
        <div className="statement">
            <div className="statement__first">
            <img src={images.Psycho} alt="india"/>
            <div className="statement_text">
                <div>First Name</div>
                <div>Age: 19</div>
            </div>
            </div>
            <div className="statement_buttons">
                <div className="statement_button_big">Переглянути профіль</div>
                <div className="statement_buttons_smalls">
                <div className="statement_button_small">Відхилити</div>
                <div className="statement_button_small">Прийняти</div>
                </div>
            </div>

        </div>
    )
};

export default Statement;
