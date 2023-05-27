import { useEffect, useState } from "react";
import "./Problems.css";
import images from "../../../constants/images";
import { Card, Loader, TopLoader } from "../../../components";
import { isAuth } from "../../../api/AuthContext";
import { isPsycho } from "../../../api/api";

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
          <Loader />
        ) : (
          <div className="problems__container-content">
            <h1>Відкриті проблеми</h1>
            <span></span>
            <div className="problems__container-content_totaldrop">
              <h4>Загалом: 136</h4>
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
                    onClick={() => handleOptionClick("За другим")}
                  >
                    <p>За другим</p>
                  </div>
                  <div
                    className="problems__container-content_totaldrop-dropdown_content-wrapper"
                    onClick={() => handleOptionClick("За третім")}
                  >
                    <p>За третім</p>
                  </div>
                  <div
                    className="problems__container-content_totaldrop-dropdown_content-wrapper"
                    onClick={() => handleOptionClick("За четвертим")}
                  >
                    <p>За четвертим</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="problems__container-content_cards">
              {Array.from({ length: 20 }, (_, index) => (
                <Card key={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Problems;
