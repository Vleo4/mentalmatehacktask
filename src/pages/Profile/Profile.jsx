import { useNavigate } from "react-router-dom";
import { clearStorages } from "../../api/tokenStorage";
import images from "../../constants/images";
import "./Profile.css";
import { useEffect, useState } from "react";
import { isAuth } from "../../api/AuthContext";
import {isPsycho, profileApi, updatePsycho} from "../../api/api";
import {Loader, TopLoader} from "../../components";

const Profile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
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

  // -----------------------EDIT-------------------------------

  const languages = [
    "Англійська",
    "Арабська",
    "Бенгальська",
    "Бірманська",
    "Гінді",
    "Грецька",
    "Гуджараті",
    "Іспанська",
    "Італійська",
    "Каннада",
    "Китайська",
    "Корейська",
    "Кхмерська",
    "Маратхі",
    "Нідерландська",
    "Німецька",
    "Панджабі",
    "Південно-міньська",
    "Польська",
    "Португальська",
    "Румунська",
    "Сингальська",
    "Суахілі",
    "Тамільська",
    "Турецька",
    "Українська",
    "Урду",
    "Узбецька",
    "Французька",
    "Яванська",
    "Японська",
  ];

  const [updatedLang, setUpdatedLang] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleOptionClick = (option) => {
    if (!updatedLang.includes(option)) {
      if (updatedLang && !updatedLang.includes(option)) {
        setUpdatedLang(updatedLang + ", " + option);
      } else {
        setUpdatedLang(option);
      }
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
      setUpdatedName(user.psycho.name);
      setUpdatedAge(user.psycho.age);
      setUpdatedPerspectives(user.psycho.perspective.split(", "));
      setUpdatedLang(user.psycho.lang);
      setUpdatedDescription(user.psycho.description);
      setUpdatedEmail(user.psycho.contacts.split(", ")[1]);
      setUpdatedPhone(user.psycho.contacts.split(", ")[0]);
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
    // Call updatePsycho with updated data
    await updatePsycho(
      updatedName,
      updatedDescription,
      updatedCv,
      user.psycho.skills,
      updatedPerspectives.join(", "),
      updatedLang,
      updatedPhone + ", " + updatedEmail,
      updatedAge
    );
    // Update user state with new data
    setUser((prevUser) => ({
      ...prevUser,
      psycho: {
        ...prevUser.psycho,
        name: updatedName,
        age: updatedAge,
        cv: updatedCv,
        perspective: updatedPerspectives.join(", "),
        lang: updatedLang,
        description: updatedDescription,
        contacts: updatedPhone + ", " + updatedEmail,
      },
    }));
    // Exit editing mode
    setIsEditing(false);
    fetchUser();
    setIsLoading(false);
  };

  return (
    <div className="profile">
      {isLoading ? (
          <TopLoader/>
      ) : (
      <div className="profile__container">
          <>
            <div className="profile__container-mainInfo">
              <div className="profile__container-mainInfo_text">
                <p className="profile__container-text-p">
                  З нами від{" "}
                  {user &&
                    user.psycho.join_date
                      .split("T")[0]
                      .split("-")
                      .reverse()
                      .join("-")}
                </p>
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
                    <h1>{user && user.psycho.name}</h1>
                  )}
                  {isEditing ? (
                    <p className="edit-text" onClick={handleSave}>
                      <img src={images.Edit} alt="Edit" /> Зберегти
                    </p>
                  ) : (
                    <p className="edit-text" onClick={handleEdit}>
                      <img src={images.Edit} alt="Edit" /> Редагувати
                    </p>
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
                    <span>{user && user.psycho.age}</span>
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
                      href={user && user.psycho.cv}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Переглянути
                    </a>
                  )}
                </div>
                <div className="help" style={{ marginTop: 16 }}>
                  <p className="profile__container-text-p">Допоміг</p>
                  <span>{user && user.psycho.total_helped}</span>
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
                  <p className="edit-text" onClick={handleSave}>
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
                  <span>{user && user.psycho.contacts.split(", ")[1]}</span>
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
                    {user && user.psycho.contacts.split(", ")[0]}
                  </span>
                )}
              </div>
            </div>
            <div className="line" />
            <div className="profile__container-routes">
              <div className="edit">
                <h2>Напрями:</h2>
                {isEditing ? (
                  <p className="edit-text" onClick={handleSave}>
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
                    user.psycho.perspective
                      .split(", ")
                      .map((pers, index) => <li key={index}>{pers.trim()}</li>)}
                </ul>
              )}
            </div>
            <div className="line" />
            <div className="profile__container-skills">
              <div className="edit">
                <h2>Навички:</h2>
                <p className="edit-text">
                  <img src={images.Edit} alt="Edit" /> Редагувати
                </p>
              </div>
              <ul>
                {user &&
                  user.psycho.skills
                    .split(", ")
                    .map((skill, index) => <li key={index}>{skill.trim()}</li>)}
              </ul>
            </div>
            <div className="line" />
            <div className="profile__container-languages">
              <div className="edit">
                <h2>Знання мов:</h2>

                {isEditing ? (
                  <p className="edit-text" onClick={handleSave}>
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
                      onClick={() => {
                        setIsDropdownOpen(!isDropdownOpen);
                      }}
                    >
                      <span>{updatedLang}</span>
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
                    user.psycho.lang
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
                  <p className="edit-text" onClick={handleSave}>
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
                <p style={{ marginTop: 24 }}>
                  {user && user.psycho.description}
                </p>
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
