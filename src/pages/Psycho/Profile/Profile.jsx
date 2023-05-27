import { useNavigate } from "react-router-dom";
import { clearStorages } from "../../../api/tokenStorage";
import images from "../../../constants/images";
import "./Profile.css";
import { useEffect, useState } from "react";
import { isAuth } from "../../../api/AuthContext";
import { isPsycho } from "../../../api/apiPublic";
import { Alert, TopLoader } from "../../../components";
import { profileApi, updatePsycho } from "../../../api/apiPsycho.js";
import { emailRegex, languages } from "../../../constants/index.js";
const Profile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    if (!isAuth()) {
      window.location.href = "/login";
    }
  }, [isAuth()]);

  useEffect(() => {
    if (!isPsycho()) {
      window.location.href = "/";
    }
  }, [isPsycho()]);
  const logOut = () => {
    clearStorages();
    navigate("/");
  };

  const fetchUser = async () => {
    setIsLoading(true);
    const data = await profileApi();
    console.log(data);
    setUser(data);
    setTimeout(() => setIsLoading(false), 600);
  };

  useEffect(() => {
    fetchUser();
  }, []);
  const [updatedLang, setUpdatedLang] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleOptionClick = (option) => {
    if (!updatedLang.includes(option)) {
      if (updatedLang) {
        setUpdatedLang([...updatedLang, option]);
      }
    } else {
      setUpdatedLang(updatedLang.filter((item) => item !== option));
    }
    setIsDropdownOpen(false);
  };

  const [isEditing, setIsEditing] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedAge, setUpdatedAge] = useState(null);
  const [updatedCv, setUpdatedCv] = useState(null);
  const [updatedPerspectives, setUpdatedPerspectives] = useState([]);
  const [isActiveAdd, setIsActiveAdd] = useState(true);
  const [isAdd, setIsAdd] = useState(true);
  const [add, setAdd] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [isDesc, setIsDesc] = useState(true);
  const [isPhone, setIsPhone] = useState(true);
  const [charCount, setCharCount] = useState(0);
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedPhone, setUpdatedPhone] = useState("");

  const handlePhone = (event) => {
    setIsPhone(true);
    if (event.target.value.length <= 12) {
      setUpdatedPhone(event.target.value);
    }
  };

  const handleDesc = (event) => {
    setIsDesc(true);
    if (event.target.value.length <= 300) {
      setUpdatedDescription(event.target.value);
      setCharCount(event.target.value.length);
    }
  };

  const addPerspectives = () => {
    if (add) {
      setUpdatedPerspectives([...updatedPerspectives, add]);
      setAdd("");
    }
  };
  const deletePerspective = (index) => {
    const newPerspectives = updatedPerspectives.filter(
      (block, i) => i !== index
    );
    setUpdatedPerspectives(newPerspectives);
  };
  const handleAddChange = (event) => {
    setIsAdd(true);
    setAdd(event.target.value);
  };

  useEffect(() => {
    if (user) {
      setUpdatedName(user.name);
      setUpdatedAge(user.age);
      setUpdatedPerspectives(user.perspective.split(", "));
      setUpdatedLang(user.lang.split(", "));
      setUpdatedDescription(user.description);
      setUpdatedEmail(user.contacts.split(", ")[1]);
      setUpdatedPhone(user.contacts.split(", ")[0]);
    }
  }, [user]);

  function handleFileChange(event) {
    const file = event.target.files[0];
    const maxSizeInBytes = 4 * 1024 * 1024; // 4 МБ
    if (file.size > maxSizeInBytes) {
      alert("Розмір файлу занадто великий");
    } else {
      setUpdatedCv(file);
    }
  }

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    setIsLoading(true);
    setIsEditing(false);
    // Call updatePsycho with updated data
    await updatePsycho(
      updatedName,
      updatedDescription,
      updatedCv,
      user.skills,
      updatedPerspectives.join(", "),
      updatedLang.join(", "),
      updatedPhone + ", " + updatedEmail,
      updatedAge
    );
    // Exit editing mode
    fetchUser();
    setIsLoading(false);
  };

  const [showAlert, setShowAlert] = useState(false);
  const [text, setText] = useState("Заповність усі поля");
  const handleCloseAlert = () => {
    setShowAlert(!showAlert);
  };
  const updateProfile = async () => {
    if (
      !updatedName ||
      !updatedDescription ||
      !user.skills ||
      !updatedPerspectives ||
      !updatedLang ||
      !updatedPhone ||
      !updatedEmail ||
      !updatedAge
    ) {
      setShowAlert(true);
      setText("Заповність усі поля");
    } else if (!emailRegex.test(updatedEmail)) {
      setShowAlert(true);
      setText("Не коректна електронна адреса");
    } else {
      setShowAlert(false);
      handleSave();
    }
  };

  return (
    <div className="profile">
      <Alert
        text={text}
        handleCloseAlert={handleCloseAlert}
        showAlert={showAlert}
      />
      {isLoading ? (
        <TopLoader />
      ) : (
        <div className="profile__container">
          <>
            <div className="profile__container-mainInfo">
              <div className="profile__container-mainInfo_text">
                <div className="withus-block">
                  <p className="profile__container-text-p">
                    З нами від{" "}
                    {user &&
                      user.join_date
                        .split("T")[0]
                        .split("-")
                        .reverse()
                        .join("-")}
                  </p>
                  {isEditing ? (
                    <p className="edit-text" onClick={updateProfile}>
                      <img src={images.Edit} alt="Edit" /> Зберегти
                    </p>
                  ) : (
                    <p className="edit-text" onClick={handleEdit}>
                      <img src={images.Edit} alt="Edit" /> Редагувати
                    </p>
                  )}
                </div>
                <div className="edit">
                  {isEditing ? (
                    <>
                      <input
                        style={{ maxWidth: 180 }}
                        type="text"
                        className="maininfo-input"
                        value={updatedName}
                        onChange={(e) => setUpdatedName(e.target.value)}
                      />
                    </>
                  ) : (
                    <h1>{user && user.name}</h1>
                  )}
                </div>
                <h2 style={{ marginTop: 12 }}>Психолог</h2>
                <div
                  className="age"
                  style={{ marginTop: 16, marginBottom: 16 }}
                >
                  <p className="profile__container-text-p">Вік:</p>
                  {isEditing ? (
                    <>
                      <input
                        style={{ maxWidth: 180 }}
                        type="number"
                        className="maininfo-input"
                        value={updatedAge}
                        onChange={(e) => setUpdatedAge(e.target.value)}
                      />
                    </>
                  ) : (
                    <span>{user && user.age}</span>
                  )}
                </div>
                <div className="cv">
                  <p className="profile__container-text-p">Резюме:</p>
                  {isEditing ? (
                    <>
                      <label htmlFor="myfile" className="profile-files-label">
                        {updatedCv ? (
                          <div className="profile__input__block">
                            {updatedCv.name}
                          </div>
                        ) : (
                          <div />
                        )}
                        <div className="profile__files__button">
                          {updatedCv ? "Змінити файл" : "Додати файл"}
                        </div>
                        <input
                          id="myfile"
                          accept=".pdf"
                          type="file"
                          onChange={handleFileChange}
                          style={{ display: "none" }}
                        />
                      </label>
                    </>
                  ) : (
                    <a
                      href={user && user.cv}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Переглянути
                    </a>
                  )}
                </div>
                <div className="help" style={{ marginTop: 16 }}>
                  <p className="profile__container-text-p">Допоміг</p>
                  <span>{user && user.total_helped}</span>
                  <p className="profile__container-text-p">людям</p>
                </div>
              </div>
              <div className="profile__container-mainInfo_img">
                <img src={images.Avatar} alt="Avatar" />
              </div>
            </div>
            <div className="line" />
            <div className="profile__container-contacts">
              <div className="edit">
                <h2>Контактні дані:</h2>
                {isEditing ? (
                  <p className="edit-text" onClick={updateProfile}>
                    <img src={images.Edit} alt="Edit" /> Зберегти
                  </p>
                ) : (
                  <p className="edit-text" onClick={handleEdit}>
                    <img src={images.Edit} alt="Edit" /> Редагувати
                  </p>
                )}
              </div>
              <div
                className="email"
                style={{ marginTop: 20, marginBottom: 16 }}
              >
                <p className="profile__container-text-p">Ел. пошта:</p>
                {isEditing ? (
                  <>
                    <input
                      type="email"
                      placeholder="email@email.com"
                      className="maininfo-input"
                      style={{ maxWidth: 200 }}
                      value={updatedEmail}
                      onChange={(e) => setUpdatedEmail(e.target.value)}
                    />
                  </>
                ) : (
                  <span>{user && user.contacts.split(", ")[1]}</span>
                )}
              </div>
              <div className="phone">
                <p className="profile__container-text-p">Номер телефону:</p>
                {isEditing ? (
                  <>
                    <input
                      type="number"
                      placeholder="0XX XXX XX XX"
                      className="maininfo-input"
                      style={{ maxWidth: 120 }}
                      value={updatedPhone}
                      onChange={(e) => {
                        handlePhone(e);
                      }}
                    />
                  </>
                ) : (
                  <span style={{ whiteSpace: "nowrap" }}>
                    {user && user.contacts.split(", ")[0]}
                  </span>
                )}
              </div>
            </div>
            <div className="line" />
            <div className="profile__container-routes">
              <div className="edit">
                <h2>Напрями:</h2>
                {isEditing ? (
                  <p className="edit-text" onClick={updateProfile}>
                    <img src={images.Edit} alt="Edit" /> Зберегти
                  </p>
                ) : (
                  <p className="edit-text" onClick={handleEdit}>
                    <img src={images.Edit} alt="Edit" /> Редагувати
                  </p>
                )}
              </div>
              {isEditing ? (
                <>
                  {updatedPerspectives &&
                    updatedPerspectives.map((perspective, index) => (
                      <div
                        key={index}
                        className="profile__input__block-per login__skills"
                      >
                        <div className="profile-per__input text__left">
                          {perspective}
                        </div>
                        <img
                          src={images.Delete}
                          alt="delete"
                          className="profile-per__input__img__right"
                          onClick={() => {
                            deletePerspective(index);
                          }}
                        />
                      </div>
                    ))}
                  <div
                    className={
                      isActiveAdd
                        ? isAdd
                          ? "profile__input__block-per login__skills"
                          : "login__input__block-per__false login__skills"
                        : "login__input__block-per__active login__skills"
                    }
                  >
                    <input
                      className="profile-per__input"
                      onChange={handleAddChange}
                      onBlur={() => {
                        setIsActiveAdd(true);
                      }}
                      onClick={() => {
                        setIsActiveAdd(false);
                      }}
                      type="text"
                      placeholder="Додати"
                      value={add}
                    />
                    <img
                      src={images.Add}
                      alt="add"
                      onClick={addPerspectives}
                      className="profile-per__input__img__right"
                    />
                  </div>
                </>
              ) : (
                <ul>
                  {user &&
                    user.perspective
                      .split(", ")
                      .map((pers, index) => <li key={index}>{pers.trim()}</li>)}
                </ul>
              )}
            </div>
            <div className="line" />

            <div className="profile__container-languages">
              <div className="edit">
                <h2>Знання мов:</h2>

                {isEditing ? (
                  <p className="edit-text" onClick={updateProfile}>
                    <img src={images.Edit} alt="Edit" /> Зберегти
                  </p>
                ) : (
                  <p className="edit-text" onClick={handleEdit}>
                    <img src={images.Edit} alt="Edit" /> Редагувати
                  </p>
                )}
              </div>
              {isEditing ? (
                <>
                  <div
                    className="profile__dropdown drop"
                    style={{ marginTop: 24 }}
                  >
                    <div
                      className="profile__dropdown-drop"
                      style={{ overflow: "hidden" }}
                      onClick={() => {
                        setIsDropdownOpen(!isDropdownOpen);
                      }}
                    >
                      <span>{updatedLang.join(", ")}</span>
                      <img
                        src={images.Dropdown}
                        alt="ArrowDownFilter"
                        style={{
                          width: 12,
                          height: 7,
                          marginLeft: 14,

                          cursor: "pointer",
                          filter: "invert(1)",
                        }}
                      />
                    </div>
                    <div
                      className={`profile__dropdown-cat ${
                        isDropdownOpen ? "open" : ""
                      }`}
                    >
                      {languages.map((language) => (
                        <div
                          key={language}
                          className="profile__dropdown-cat-wrapper"
                          onClick={() => handleOptionClick(language)}
                        >
                          <p>{language}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <ul>
                  {user &&
                    user.lang
                      .split(", ")
                      .map((language, index) => (
                        <li key={index}>{language.trim()}</li>
                      ))}
                </ul>
              )}
            </div>
            <div className="line" />
            <div className="profile__container-additional">
              <div className="edit">
                <h2>Додаткова інформація</h2>
                {isEditing ? (
                  <p className="edit-text" onClick={updateProfile}>
                    <img src={images.Edit} alt="Edit" /> Зберегти
                  </p>
                ) : (
                  <p className="edit-text" onClick={handleEdit}>
                    <img src={images.Edit} alt="Edit" /> Редагувати
                  </p>
                )}
              </div>
              {isEditing ? (
                <>
                  <div className="edit-textarea-wrapper">
                    <textarea
                      type="text"
                      value={updatedDescription}
                      onChange={(e) => {
                        handleDesc(e);
                      }}
                    ></textarea>
                    <h3>{charCount}/300</h3>
                  </div>
                </>
              ) : (
                <p style={{ marginTop: 24 }}>{user && user.description}</p>
              )}
            </div>
            <button className="logout" onClick={logOut}>
              Вийти з аккаунту
            </button>
          </>
        </div>
      )}
    </div>
  );
};

export default Profile;
