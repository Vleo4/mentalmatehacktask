import { useEffect, useState } from "react";
import "./Journal.css";
import '../../Psycho/Problems/Problems.css';
import { isAuth } from "../../../api/AuthContext.jsx";
import { isPsycho } from "../../../api/apiPublic.js";
import { Card, Loader, Search, TopLoader } from "../../../components/index.js";
import images from "../../../constants/images.js";
import {getAppliedApi} from "../../../api/apiPsycho.js";
import {getAppliedUserApi} from "../../../api/apiPatient.js";
import { categories } from "../../../constants/index.js";

const Journal = () => {
  useEffect(() => {
    if (!isAuth()) {
      window.location.href = "/login";
    }
  }, [isAuth()]);
  const [journal, setJournal] = useState([]);

  useEffect(() => {
    const getJournal = async () => {
      setIsLoading(true);
      const data = await getAppliedApi();
      setJournal(data);
      console.log(data);
      setIsLoading(false);
    };
    getJournal();
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
              <h1>Журнал</h1>
            </div>
            <span></span>
            <div className="problems__container-content_cards">
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Journal;
