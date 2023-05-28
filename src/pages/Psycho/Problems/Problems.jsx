import { useEffect, useState } from "react";
import "./Problems.css";
import images from "../../../constants/images";
import { Card, Loader, Search, TopLoader } from "../../../components";
import { isAuth } from "../../../api/AuthContext";
import { isPsycho } from "../../../api/apiPublic";
import { getProblemsApi } from "../../../api/apiPsycho.js";
import { categories } from "../../../constants";

const Problems = () => {
  useEffect(() => {
    if (!isAuth()) {
      window.location.href = "/login";
    }
  }, [isAuth()]);

  useEffect(() => {
    if (!isPsycho()) {
      window.location.href = "/";
    }
  }, [isPsycho()]);
  const [problems, setProblems] = useState([]);
  const [problemsSearch, setProblemsSearch] = useState([]);

  useEffect(() => {
    const getProblems = async () => {
      setIsLoading(true);
      const data = await getProblemsApi();
      setProblems(data);
      setProblemsSearch(data);
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
            <div className="problems__container-content_search">
              <h1>Відкриті проблеми</h1>
              <Search
                problems={problems}
                setProblemsSearch={setProblemsSearch}
                handleOptionClick={handleOptionClick}
              />
            </div>
            <span></span>
            <div className="problems__container-content_totaldrop">
              <h4>Загалом: {problemsSearch && problemsSearch.length}</h4>
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
                    onClick={() => handleOptionClick("Усі категорії")}
                  >
                    <p>Усі категорії</p>
                  </div>
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className="problems__container-content_totaldrop-dropdown_content-wrapper"
                      onClick={() => handleOptionClick(category.title)}
                    >
                      <p>{category.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {problemsSearch.length === 0 && (
              <div className="none">
                <h4>Наразі на цій сторінці немає жодних проблем.</h4>
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

export default Problems;
