import { useEffect, useState } from "react";
import images from "../../../constants/images";
import { CardPsycho, Loader, SearchPsycho, TopLoader } from "../../../components";
import { isAuth } from "../../../api/AuthContext";
import { isPsycho } from "../../../api/apiPublic";
import { psychosListApi } from "../../../api/apiPatient";

const PsychoPage = () => {
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
  const [psychos, setPsychos] = useState([]);
  const [psychosSearch, setPsychosSearch] = useState([]);

  useEffect(() => {
    const getPsychos = async () => {
      setIsLoading(true);
      const data = await psychosListApi();
    
      setPsychos(data);
      setPsychosSearch(data);
      setIsLoading(false);
    };
    getPsychos();
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
              <h1>Усі психологи</h1>
              <SearchPsycho psychos={psychos} setPsychosSearch={setPsychosSearch}/>
            </div>
            <span></span>
            <div className="problems__container-content_totaldrop">
              <h4>Загалом: {psychos && psychos.length}</h4>
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
            {!psychosSearch && (
              <div className="none">
                <h4>Наразі на цій сторінці немає психологів</h4>
              </div>
            )}
            <div className="problems__container-content_cards">
              {psychosSearch  &&
                  psychosSearch .map((psycho, index) => (
                  <CardPsycho key={index} psycho={psycho} />
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PsychoPage;
