import "./Card.css";
import images from "../../constants/images";

const Card = () => {
  /* const shortenedTitle = title.length > 80 ? title.slice(0, 80) + "..." : title; */
  return (
    <div className="card">
      <div className="card__content">
        <div className="card__content-category">
          <img src={images.CategoryIco} alt="Category" />
          <h2>CATEGORY</h2>
        </div>
        <h2>8QzXagpHX3piS2eD0bkVPsNInHDTCqmK3L</h2>
        <p style={{ marginTop: 12 }}>
          o7MMMSsA9v8vzjboi7OQVWCkYCKGhKWc0BuwuvLbvPnel3rPv6pCzGk7r4CAMwXI0NOlyPPh2x6CvZoG
        </p>
      </div>
      <div className="card__date">
        <span></span>
        <p>12.05.2023 14:55</p>
      </div>
    </div>
  );
};

export default Card;
