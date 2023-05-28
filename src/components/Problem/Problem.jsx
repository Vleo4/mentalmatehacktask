import "./Problem.css";
import images from "../../constants/images.js";
import { categoriesImages } from "../../constants";

const getImageUrl = (categoryId) => {
  const category = categoriesImages.find((item) => item.id === categoryId);
  return category ? category.imgUrl : images.DefaultCategoryIco;
};
const Problem = ({ problem }) => {
  return (
    <>
     
      <div className="problem__header">{problem.title}</div>
      <div className="problem__category">
        <img src={getImageUrl(problem.cat.id)} alt="ico" />
        <div>{problem.cat.title}</div>
      </div>
      <div className="problem__description">{problem.essence}</div>
      <div className="problem__description">{problem.conclusion}</div>
    </>
  );
};

export default Problem;
