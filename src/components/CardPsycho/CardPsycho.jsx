import "./CardPsycho.css";
import images from "../../constants/images";

const CardPsycho = ({ psycho }) => {
  const shortenedDesc =
    psycho.description.length > 70
      ? psycho.description.slice(0, 70) + "..."
      : psycho.description;

  const handleCardClick = () => {
    window.location.href = "/psycho-profile/" + psycho.id;
  };

  const handleLinkClick = (event) => {
    event.stopPropagation();
    window.open(psycho.cv, "_blank");
  };

  const imageArray = Array.from({ length: 5 }, () => images.EmptyStar);

  return (
    <div className="cardpsycho" onClick={handleCardClick}>
      <div className="cardpsycho_info">
        <div>
          <h5 style={{ marginBottom: 8 }}>{psycho.name}</h5>
          <p style={{ marginBottom: 8 }}>Age: {psycho.age}</p>
          <p style={{ marginBottom: 8 }}>Допомоги: {psycho.total_helped}</p>
          <a
            style={{ marginBottom: 8 }}
            href={psycho.cv}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleLinkClick}
          >
            Резюме
          </a>
        </div>
        <img src={images.Ava} alt="Ava" />
      </div>
      <span style={{ marginBottom: 12 }}></span>

      <div className="cardpsycho-description">
        <h3>{shortenedDesc}</h3>
      </div>

      <div className="cardpsycho-rating">
        {imageArray.map((image, index) => (
          <img key={index} src={image} alt="Image" />
        ))}
      </div>
    </div>
  );
};

export default CardPsycho;
