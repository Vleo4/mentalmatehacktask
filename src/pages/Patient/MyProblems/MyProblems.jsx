import { useEffect, useState } from "react";
import "./MyProblems.css";
import { isAuth } from "../../../api/AuthContext";
import { isPsycho } from "../../../api/apiPublic";
import { Card, Loader, TopLoader } from "../../../components";
import images from "../../../constants/images";
import { getMyProblemsApi } from "../../../api/apiPatient.js";
import { Link } from "react-router-dom";

const MyProblems = () => {
  useEffect(() => {
    if (!isAuth()) {
      window.location.href = "/login";
    }
  }, [isAuth()]);

  useEffect(() => {
    if (isPsycho()) {
      window.location.href = "/";
    }
  }, [isPsycho()]);

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
  const [problems, setProblems] = useState([]);
  useEffect(() => {
    const getProblems = async () => {
      setIsLoading(true);
      const data = await getMyProblemsApi();
      setProblems(data);
      console.log(data);
      setIsLoading(false);
    };
    getProblems();
  }, []);

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
            <h1>Мої проблеми</h1>
            <span></span>
            <div className="problems__container-content_totaldrop">
              <h4>Загалом: {problems && problems.length}</h4>
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
            {problems.length == 0 && (
              <div className="none">
                <h4>Наразі на цій сторінці немає створених проблем</h4>
                <Link
                  to="/problem/create"
                  className="app__main-content_text-button"
                >
                  Створити проблему
                </Link>
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

export default MyProblems;
