import { useEffect, useState } from "react";
import "./Approved.css";
import '../../Psycho/Problems/Problems.css';
import { isAuth } from "../../../api/AuthContext.jsx";
import { isPsycho } from "../../../api/apiPublic.js";
import { Card, Loader, TopLoader } from "../../../components/index.js";
import images from "../../../constants/images.js";
import {getAppliedApi} from "../../../api/apiPsycho.js";
import {getAppliedUserApi} from "../../../api/apiPatient.js";
import Search from "../../../components/Search/Search.jsx";

const Approved = () => {
  useEffect(() => {
    if (!isAuth()) {
      window.location.href = "/login";
    }
  }, [isAuth()]);
  const [problems, setProblems] = useState([]);
  const [problemsSearch, setProblemsSearch] = useState([]);

  useEffect(() => {
    const getProblems = async () => {
      setIsLoading(true);
      if (isPsycho()) {
        const data = await getAppliedApi();
        setProblems(data);
        setProblemsSearch(data);
        console.log(data);
      } else {
        const data = await getAppliedUserApi();
        setProblems(data);
        setProblemsSearch(data);
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
            <div className="problems__container-content_search">
              <h1>Узгоджені проблеми</h1>
              <Search problems={problems} setProblemsSearch={setProblemsSearch}/>
            </div>
            <span></span>
            <div className="problems__container-content_totaldrop">
              <h4>Загалом: {problemsSearch ? problemsSearch.length : "0"}</h4>
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
              {problemsSearch.length === 0 && (
                <div className="none">
                  <h4>Наразі на цій сторінці немає жодних узгоджених проблем.</h4>
                </div>
              )}
            <div className="problems__container-content_cards">
              {problemsSearch &&
                  problemsSearch.map((problem, index) => (
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
