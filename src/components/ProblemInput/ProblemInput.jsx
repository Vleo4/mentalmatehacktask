import "./ProblemInput.css";
import images from "../../constants/images.js";
import {useState} from "react";
import {categories} from "../../constants/index.js";

const ProblemInput = (props) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    const [selectedOption, setSelectedOption] = useState("Депресія");

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        props.setCategory(categories.filter((category) => {
            return category.title === option;
        })[0].id);

        setIsDropdownOpen(false);
    };

  return (
          <div className="problemInput">
              <input className="input__title" value={props.title} placeholder="Назвіть свою проблему"  onChange={(e)=>{props.handleTitle(e)}}/>
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
                  >{categories.map((category)=>(
                      <div
                          className="problemInput__container-content_totaldrop-dropdown_content-wrapper"
                          onClick={() => handleOptionClick(category.title)}
                      >
                          <img src={images.CategoryIco} alt="ico"/>
                          <p>{category.title}</p>
                      </div>
                      ))}
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
