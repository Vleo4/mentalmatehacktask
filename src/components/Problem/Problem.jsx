import "./Problem.css";
import images from "../../constants/images.js";
const Problem = ({problem}) => {

    return (
        <>
        <div className="problem__header">{problem.title}</div>
        <div className="problem__category">
            <img src={images.CategoryIco} alt="ico"/>
            <div>{problem.cat.title}</div>
        </div>
        <div className="problem__description">
            {problem.essence}
        </div>
            <div className="problem__description">
                {problem.conclusion}
            </div>
        </>
    )
};

export default Problem;
