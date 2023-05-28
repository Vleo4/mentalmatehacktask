import { useEffect, useState } from "react";
import "./MyJournal.css";
import '../../Psycho/Problems/Problems.css';
import { isAuth } from "../../../api/AuthContext.jsx";
import { JournalCard, Loader, TopLoader } from "../../../components/index.js";
import {getMyJournalApi, postMyJournalApi} from "../../../api/apiPatient.js";
import images from "../../../constants/images.js";
import {categories,mood} from "../../../constants/index.js";
const MyJournal = () => {
  useEffect(() => {
    if (!isAuth()) {
      window.location.href = "/login";
    }
  }, [isAuth()]);
  const [journal, setJournal] = useState([]);
  const getJournal = async () => {
    setIsLoading(true);
    const data = await getMyJournalApi();
    setJournal(data);
    console.log(data);
    setIsLoading(false);
  };
  useEffect(() => {

    getJournal();
  }, []);
  const [isLoading, setIsLoading] = useState(false);
  // -------------------------- DROPDOWN SORT ---------------------------------

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const [selectedOption, setSelectedOption] = useState("Усі категорії");
  const [selectedIcon, setSelectedIcon] = useState(4);
  const [isDropdown, setIsDropdown] = useState(false);
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };
  // ---------------------------------------------------------------------------
  const [desc,setDesc]=useState("");
  const [add,setAdd]=useState(false);
  return (
      <div className="journal">
        {isLoading && <TopLoader />}
        <>
        <div className="journal__container">
          {isLoading ? (
              <div className="loading-screen">
                <Loader />
              </div>
          ) : (
              <div className="problems__container-content">
                <div className="journal__container-content">
                  <h1>Журнал</h1>
                  <div className="journal__container-content__add" onClick={()=>{
                    setAdd(true);}}>
                    <div>Додати</div><img src={images.AddCard} alt="add"/></div>
                </div>
                <div
                    className='journalCardHeader'
                >
                  <div className="journalCard__contentHeader">
                    <div className="journalCard__category">Муд</div>
                    <div className="journalCard__description">Опис</div>
                    <div className="journalCard__date">Дата</div>
                  </div>
                </div>
                {add&&
                <div className='journalCard'>
                  <div className="journalCard__content">
                    <div className="journalCard__category">
                      <div className="journal__container-content_totaldrop">
                        <div className="journal__container-content_totaldrop-dropdown">
                          <button onClick={()=>{setIsDropdown(!isDropdown)}}>
                            <img alt="" src={mood[selectedIcon-1]}/>
                            <img src={images.ArrowDown} alt="ArrowDown" />
                          </button>
                          <div
                              className={`journal__container-content_totaldrop-dropdown_content ${
                                  isDropdown ? "open" : ""
                              }`}
                          >
                            {mood.map((category,id) => (
                                <div
                                    key={id}
                                    className="journal__container-content_totaldrop-dropdown_content-wrapper"
                                    onClick={() => {setSelectedIcon(id+ 1);setIsDropdown(false)}}
                                >
                                  <img src={category} alt="Category" />
                                </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <input value={desc} onChange={(e)=>{setDesc(e.target.value)}} className="journalCard__description" ></input>
                    <div className="journalCard__date" >{new Date().toLocaleDateString("uk-UA", { day: "numeric", month: "long", year: "numeric" })}  </div>
                    <img src={images.AddCard} onClick={async ()=>{
                     await postMyJournalApi(desc,selectedIcon);
                     getJournal();
                     getJournal();
                    }} className="journalCard__delete" alt="delete"/>
                  </div>
                </div>}
                  {journal && journal.emotions&&
                      journal.emotions.map((journalId, index) => (
                          <JournalCard key={index} journal={journalId} />
                      ))}
              </div>
          )}
        </div>
          <div className="containers__psycho">
            <p>Надати доступ до журналу:</p>
          <div className="problems__container-content_totaldrop">
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
          </div>
        </>
      </div>
  );
};

export default MyJournal;
