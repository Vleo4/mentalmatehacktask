import "./JournalCard.css";
import images from "../../constants/images";
import {mood} from "../../constants/index.js";

const JournalCard = ({ journal }) => {
  const title='fdsafdsafadfdsafdsafadffdsafdsafadffdsafdsafadffdsafdsafadffdsafdsafadffdsafdsafadffdsafdsafadffdsafdsafadffdsafdsafadffdsafdsafadffdsafdsafadffdsafdsafadffdsafdsafadffdsafdsafadffdsafdsafadffdsafdsafadffdsafdsafadffdsafdsafadffdsafdsafadffdsafdsafadffdsafdsafadffdsafdsafadffdsafdsafadffdsafdsafadffdsafdsafadffdsafdsafadffdsafdsafadffdsafdsafadffdsafdsafadffdsafdsafadffdsafdsafadffdsafdsafadffdsafdsafadffdsafdsafadf';
  const deleteJournal=()=>{

  }
  return (
    <div
    className='journalCard'
    >
      <div className="journalCard__content">
        <div className="journalCard__category">
          <img src={mood.filter((moo,id)=>{if(id+1===journal.type){return moo;}})[0]} alt="Category" />
        </div>
        <div className="journalCard__description" >{journal.content}</div>
        <div className="journalCard__date" >{new Date(journal.time_created).toLocaleDateString("uk-UA", { day: "numeric", month: "long", year: "numeric" })}
        </div>
        <img src={images.DeleteCard} className="journalCard__delete" onClick={deleteJournal} alt="delete"/>
      </div>
    </div>
  );
};

export default JournalCard;
