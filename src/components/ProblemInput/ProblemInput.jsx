import "./ProblemInput.css";
import images from "../../constants/images.js";
import {useState} from "react";

const ProblemInput = (props) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    const [selectedOption, setSelectedOption] = useState("Останні");

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsDropdownOpen(false);
    };

  return (
          <div className="problemInput">
              <input className="input__title" value={props.title} placeholder="Назва"  onChange={(e)=>{props.handleTitle(e)}}/>
              <div className="problemInput__border"></div>
              <div className="problemInput__container-content_totaldrop-dropdown">
                  <img src={images.CategoryIco} alt="ico"/>
                  <button onClick={toggleDropdown}>
                      {selectedOption}{" "}
                      <img src={images.ArrowDown} alt="ArrowDown" />
                  </button>
                  <div
                      className={`problemInput__container-content_totaldrop-dropdown_content ${
                          isDropdownOpen ? "open" : ""
                      }`}
                  >
                      <div
                          className="problemInput__container-content_totaldrop-dropdown_content-wrapper"
                          onClick={() => handleOptionClick("Останні")}
                      >
                          <img src={images.CategoryIco} alt="ico"/>
                          <p>Останні</p>
                      </div>
                      <div
                          className="problemInput__container-content_totaldrop-dropdown_content-wrapper"
                          onClick={() => handleOptionClick("За другим")}
                      >
                          <img src={images.CategoryIco} alt="ico"/>
                          <p>За другим</p>
                      </div>
                      <div
                          className="problemInput__container-content_totaldrop-dropdown_content-wrapper"
                          onClick={() => handleOptionClick("За третім")}
                      >
                          <img src={images.CategoryIco} alt="ico"/>
                          <p>За третім</p>
                      </div>
                      <div
                          className="problemInput__container-content_totaldrop-dropdown_content-wrapper"
                          onClick={() => handleOptionClick("За четвертим")}
                      >
                          <img src={images.CategoryIco} alt="ico"/>
                          <p>За четвертим</p>
                      </div>
                  </div>
              </div>
              <textarea className="first" placeholder="Опишіть вашу проблему" value={props.description} onChange={(e)=>{props.handleDescription(e)}}/>
              <textarea className="second" placeholder="У чому вам потрібна допомога" value={props.conclusion} onChange={(e)=>{props.handleConclusion(e)}}/>
              <div className="problemInput__contacts">Вкажіть ваші контактні дані:</div>
              <input placeholder="Електронна адреса" className="input__contacts" value={props.mail} onChange={(e)=>{props.handleMail(e)}}/>
              <input placeholder="Номер телефону" className="input__contacts" value={props.number} onChange={(e)=>{props.handleNumber(e)}}/>
          </div>
  )
};

export default ProblemInput;
