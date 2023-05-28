import { images } from "../../constants";
import "./Review.css";

const Review = ({ review }) => {
  const createDate = new Date(review.time_created);
  const day = createDate.getDate();
  const month = createDate.getMonth() + 1;
  const year = createDate.getFullYear();

  const formattedDate = `${day}.${month < 10 ? "0" + month : month}.${year}`;

  return (
    <div className="reviewCard">
      <div className="reviewCard-info">
        <h3>Анонім</h3>
        <p>{formattedDate}</p>
      </div>
      <span></span>
      <div className="reviewCard-rating">
        {Array.from({ length: 5 }, (rating, id) => {
          if (id >= review.rating) {
            return <img key={id} src={images.EmptyStar} alt="star" />;
          } else {
           
            return <img key={id} src={images.Star} alt="star" />;
          }
        })}
      </div>
      <p className="reviewCard-description">{review.comment}</p>
    </div>
  );
};

export default Review;
