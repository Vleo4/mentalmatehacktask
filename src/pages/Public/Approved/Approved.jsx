import { useEffect, useState } from "react";
import "./Approved.css";
import "../../Psycho/Problems/Problems.css";
import { isAuth } from "../../../api/AuthContext.jsx";
import { isPsycho } from "../../../api/apiPublic.js";
import { Card, Loader, Search, TopLoader } from "../../../components/index.js";
import images from "../../../constants/images.js";
import { getAppliedApi } from "../../../api/apiPsycho.js";
import { getAppliedUserApi } from "../../../api/apiPatient.js";
import { categories } from "../../../constants";

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
        console.log(data);
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
  const [selectedOption, setSelectedOption] = useState("Усі категорії");

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
    filterProblemsByCategory(option);
  };

  const filterProblemsByCategory = (category) => {
    if (category === "Усі категорії") {
      setProblemsSearch(problems);
    } else {
      const filteredProblems = problems.filter(
        (problem) => problem.cat.title === category
      );
      setProblemsSearch(filteredProblems);
    }
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
              <h4>Загалом: {problemsSearch ? problemsSearch.length : "0"}</h4>
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
