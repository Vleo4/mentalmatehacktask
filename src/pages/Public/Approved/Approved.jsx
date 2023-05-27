import { useEffect, useState } from "react";
import "./Approved.css";
import '../../Psycho/Problems/Problems.css';
import { isAuth } from "../../../api/AuthContext.jsx";
import { isPsycho } from "../../../api/apiPublic.js";
import { Card, Loader, TopLoader } from "../../../components/index.js";
import images from "../../../constants/images.js";
import { getPendingPatientApi } from "../../../api/apiPatient.js";
import { getPendingPsychoApi } from "../../../api/apiPsycho.js";

const Approved = () => {
  useEffect(() => {
    if (!isAuth()) {
      window.location.href = "/login";
    }
  }, [isAuth()]);
  const [problems, setProblems] = useState([]);
  useEffect(() => {
    const getProblems = async () => {
      setIsLoading(true);
      if (isPsycho()) {
        const data = await getPendingPsychoApi();
        setProblems(data);
        console.log(data);
      } else {
        const data = await getPendingPatientApi();
        setProblems(data);
      }
      setIsLoading(false);
    };
    getProblems();
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  // -------------------------- DROPDOWN SORT ---------------------------------

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const [selectedOption, setSelectedOption] = useState("Останні");

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };
  // ---------------------------------------------------------------------------

  return (
    <div className="problems">
      {isLoading && <TopLoader />}
      <div className="problems__container">
        {isLoading ? (
          <div className="loading-screen">
            <Loader />
          </div>
        ) : (
          <div className="problems__container-content">
            <h1>Узгоджені проблеми</h1>
            <span></span>
            <div className="problems__container-content_totaldrop">
              <h4>Загалом: {problems ? problems.length : "0"}</h4>
              <div className="problems__container-content_totaldrop-dropdown">
                <button onClick={toggleDropdown}>
                  {selectedOption}{" "}
                  <img src={images.ArrowDown} alt="ArrowDown" />
                </button>
                <div
                  className={`problems__container-content_totaldrop-dropdown_content ${
                    isDropdownOpen ? "open" : ""
                  }`}
                >
                  <div
                    className="problems__container-content_totaldrop-dropdown_content-wrapper"
                    onClick={() => handleOptionClick("Останні")}
                  >
                    <p>Останні</p>
                  </div>
                  <div
                    className="problems__container-content_totaldrop-dropdown_content-wrapper"
                    onClick={() => handleOptionClick("Узгоджені")}
                  >
                    <p>Узгоджені</p>
                  </div>
                  <div
                    className="problems__container-content_totaldrop-dropdown_content-wrapper"
                    onClick={() => handleOptionClick("В очікуванні")}
                  >
                    <p>В очікуванні</p>
                  </div>
                </div>
              </div>
            </div>
              {!problems && (
                <div className="none">
                  <h4>Наразі на цій сторінці немає жодних узгоджених проблем.</h4>
                </div>
              )}
            <div className="problems__container-content_cards">
              {problems &&
                problems.map((problem, index) => (
                  <Card key={index} problem={problem} />
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Approved;
