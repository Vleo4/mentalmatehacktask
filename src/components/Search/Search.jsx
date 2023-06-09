import { isPsycho } from "../../api/apiPublic";
import "./Search.css";
import {useState} from "react";
const Search = (props) => {
    const [seacrhValue,setSearchValue]=useState("")
    const handleSearch = (e) => {
        setSearchValue(e.target.value);
        const newProblems = props.problems.filter((problem) => {
            const titleMatch = problem.title.toUpperCase().includes(e.target.value.toUpperCase());
            const descriptionMatch = problem.essence.toUpperCase().includes(e.target.value.toUpperCase());
            const conclusionMatch = problem.conclusion.toUpperCase().includes(e.target.value.toUpperCase());
            const categoryMatch = problem.cat.title.toUpperCase().includes(e.target.value.toUpperCase());
            return titleMatch || descriptionMatch||conclusionMatch || categoryMatch;
        });
       
        if(isPsycho()){props.handleOptionClick("Усі категорії")}
        props.setProblemsSearch(newProblems?newProblems:[]);
    };

    return (
        <div className="search-component">
            <input value={seacrhValue} placeholder="Знайдіть проблему" onChange={handleSearch}/>
        </div>
    );
};

export default Search;
