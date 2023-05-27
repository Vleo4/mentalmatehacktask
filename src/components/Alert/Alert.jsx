import images from "../../constants/images";
import "./Alert.css";

const Alert = (props) => {
  return (
      <>
          {props&&props.showAlert &&
              <div className="alert">
                  <p>
                      {props.text}
                  </p>
                  <img
                      src={images.CrossIcon}
                      alt="CrossIcon"
                      onClick={props.handleCloseAlert}
                  />
              </div>
        }
    </>
  );
};

export default Alert;
