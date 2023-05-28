import "./Card.css";
import images from "../../constants/images";
import { categoriesImages } from "../../constants";

const getImageUrl = (categoryId) => {
  const category = categoriesImages.find((item) => item.id === categoryId);
  return category ? category.imgUrl : images.DefaultCategoryIco;
};

const Card = ({ problem }) => {
  const shortenedTitle =
    problem.essence.length > 80
      ? problem.essence.slice(0, 80) + "..."
      : problem.essence;

  const isApproved = location.pathname === "/approved-problems";

  return (
    <div
      className="card"
      onClick={() => {
        window.location.href = "/problem/" + problem.id;
      }}
    >
      {problem.has_answers && <div className="problem__dot">!</div>}
      <div className="card__content">
        <div className="card__content-category">
          <img src={getImageUrl(problem.cat.id)} alt="Category" />
          <h2>{problem.cat.title}</h2>
        </div>
        <h2>{problem.title}</h2>
        <p style={{ marginTop: 12 }}>{shortenedTitle}</p>
      </div>
      <div className="card__date">
        <span></span>
        <p>12.05.2023 14:55</p>
      </div>
    </div>
  );
};

export default Card;
