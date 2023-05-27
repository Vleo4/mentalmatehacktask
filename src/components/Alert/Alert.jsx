import images from "../../constants/images";
import "./Alert.css";

const Alert = () => {
  return (
    <div className="alert">
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </p>
      <img src={images.CrossIcon} alt="CrossIcon" />
    </div>
  );
};

export default Alert;
