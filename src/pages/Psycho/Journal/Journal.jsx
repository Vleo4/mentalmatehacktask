import { useEffect, useState } from "react";
import "../../Patient/MyJournal/MyJournal.css";
import '../../Psycho/Problems/Problems.css';
import { isAuth } from "../../../api/AuthContext.jsx";
import { JournalCard, Loader, TopLoader } from "../../../components/index.js";
import {useParams} from "react-router-dom";
import {getJournalApi} from "../../../api/apiPsycho.js";

const Journal = () => {
  const { id } = useParams();
  useEffect(() => {
    if (!isAuth()) {
      window.location.href = "/login";
    }
  }, [isAuth()]);
  const [journal, setJournal] = useState([]);
  const getJournal = async () => {
    setIsLoading(true);
    const data = await getJournalApi(id);
    setJournal(data);
    setIsLoading(false);
  };
  useEffect(() => {
    getJournal();
  }, []);
  const [isLoading, setIsLoading] = useState(false);
  // -------------------------- DROPDOWN SORT ---------------------------------

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
                  {journal && journal.emotions&&
                      journal.emotions.map((journalId, index) => (
                          <JournalCard key={index} journal={journalId} />
                      ))}
                </div>
            )}
          </div>
        </>
      </div>
  );
};

export default Journal;
