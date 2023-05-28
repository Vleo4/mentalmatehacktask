import { useEffect, useState } from "react";
import "../../Patient/MyJournal/MyJournal.css";
import '../../Psycho/Problems/Problems.css';
import { isAuth } from "../../../api/AuthContext.jsx";
import { JournalCard, Loader, TopLoader } from "../../../components/index.js";
import {useParams} from "react-router-dom";
import {getJournalApi, getJournalListApi} from "../../../api/apiPsycho.js";
import JournalList from "./JournalList.jsx";
import JournalListCard from "../../../components/JournalListCard/JournalListCard.jsx";
import { isPsycho } from "../../../api/apiPublic";

const Journal = () => {
  const { id } = useParams();
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
  const [journal, setJournal] = useState([]);
  const getJournals = async () => {
    setIsLoading(true);
    const data = await getJournalListApi();
    setJournal(data);
    setIsLoading(false);
  };
  useEffect(() => {
    getJournals();
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
                    <h1>Журнали</h1>
                  </div>
                  {journal &&
                      journal.map((journalId, index) => (
                          <JournalListCard key={index}  journal={journalId} />
                      ))}
                </div>
            )}
          </div>
        </>
      </div>
  );
};

export default Journal;
