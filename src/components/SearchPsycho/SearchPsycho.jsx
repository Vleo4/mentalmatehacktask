import "../Search/Search.css";
import {useState} from "react";
const SearchPsycho = (props) => {
    const [seacrhValue,setSearchValue]=useState("")
    const handleSearch = (e) => {
        setSearchValue(e.target.value);
        const newProblems = props.psychos.filter((problem) => {
            const titleMatch = problem.name.toUpperCase().includes(e.target.value.toUpperCase());
            const descriptionMatch = problem.skills.toUpperCase().includes(e.target.value.toUpperCase());
            return titleMatch || descriptionMatch;
        });
        console.log(newProblems);
        props.setPsychosSearch(newProblems?newProblems:[]);
    };

    return (
        <div className="search-component">
            <input value={seacrhValue} placeholder="Пошук психолога" onChange={handleSearch}/>
        </div>
    );
};

export default SearchPsycho;
