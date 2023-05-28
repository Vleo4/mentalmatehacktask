import "../JournalCard/JournalCard.css";

const JournalListCard = ({ journal }) => {
 
  return (
    <div onClick={()=>{window.location.href='/journal/'+journal.id}}
    className='journalCard'
    >
      <div className="journalCard__content" >
        <div className="journalCard__category" style={{whiteSpace:"nowrap",cursor:"pointer"}} >Журнал користувача {journal.patient}</div>
        </div>
    </div>
  );
};

export default JournalListCard;
