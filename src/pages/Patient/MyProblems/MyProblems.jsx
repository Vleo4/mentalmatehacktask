import { useEffect, useState } from "react";
import "./MyProblems.css";
import { isAuth } from "../../../api/AuthContext";
import { isPsycho } from "../../../api/apiPublic";
import { Card, Loader, Search, TopLoader } from "../../../components";
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


  const [problems, setProblems] = useState([]);
  const [problemsSearch,setProblemsSearch]=useState([]);
  useEffect(() => {
    const getProblems = async () => {
      setIsLoading(true);
      const data = await getMyProblemsApi();
      setProblems(data);
      setProblemsSearch(data);
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
            <div className="problems__container-content_search">
            <h1>Мої проблеми</h1>
            <Search problems={problems} setProblemsSearch={setProblemsSearch}/>
            </div>
            <span></span>
            <div className="problems__container-content_totaldrop">
              <h4>Загалом: {problemsSearch && problemsSearch.length}</h4>

            </div>
            {problemsSearch.length == 0 && (
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
              {problemsSearch.length>0 &&
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

export default MyProblems;
