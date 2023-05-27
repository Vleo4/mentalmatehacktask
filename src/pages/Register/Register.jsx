import {useState, useEffect} from "react";
import "../Login/Login.css";
import images from "../../constants/images";
import useResizer from "../../constants/isMobile";
import {saveToLocalStorage} from "../../api/tokenStorage.js";
import {Link} from "react-router-dom";
import {onFailure, onSuccess, registerApi, updatePsycho} from "../../api/api.js";
import {isAuth} from "../../api/AuthContext.jsx";
import {GoogleLogin, GoogleOAuthProvider} from "@react-oauth/google";

const Register = () => {
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
        "Японська"
    ];
    const [lang,setLang]=useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const handleOptionClick = (option) => {
        if(!lang.includes(option)) {
            if (lang && !lang.includes(option)) {
                setLang(lang + "," + option);
            } else {
                setLang(option);
            }
        }
        setIsDropdownOpen(false);
    };
    const isMobile = useResizer();
    const [button, setButton] = useState(false);
    const [button3, setButton3] = useState(false);
    const [isPsycho, setIsPsycho] = useState("abc");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [desc, setDesc] = useState("");
    const [skills, setSkills] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [add,setAdd]=useState("");
    const [addCon,setAddCon]=useState("");
    const [isActiveAdd, setIsActiveAdd] = useState(true);
    const [isActiveAddCon, setIsActiveAddCon] = useState(true);
    const [isActiveDesc, setIsActiveDesc] = useState(true);
    const [login, setLogin] = useState("");
    const [isActiveLogin, setIsActiveLogin] = useState(true);
    const [isActiveEmail, setIsActiveEmail] = useState(true);
    const [isActivePass, setIsActivePass] = useState(true);
    const [name, setName] = useState(null);
    const [isActiveName, setIsActiveName] = useState(true);
    const [eye, setEye] = useState(false);
    const [alert, setAlert] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [isEmail, setIsEmail] = useState(true);
    const [isPass, setIsPass] = useState(true);
    const [isName, setIsName] = useState(true);
    const [isDesc, setIsDesc] = useState(true);
    const [isAdd,setIsAdd]=useState(true);
    const [isAddCon,setIsAddCon]=useState(true);
    const [age,setAge] =useState("");
    const [isAge, setIsAge] =useState(true);
    const [isActiveAge,setIsActiveAge]=useState(true);
    const digits = /^[0-9]*$/;
    const [part, setPart] = useState(1);
    const [files,setFiles]=useState(null);
    const addSkills =()=>{
        if(add) {
            setSkills([...skills, add]);
            setAdd("");
        }
    }
    const addContacts =()=>{
        if(addCon) {
            setContacts([...contacts, addCon]);
            setAddCon("");
        }
    }
    const deleteSkill=(index)=>{
        const newSkills = skills.filter((block, i) => i !== index);
        setSkills(newSkills);
    }
    const deleteContacts=(index)=>{
        const newContacts = contacts.filter((block, i) => i !== index);
        setSkills(newContacts);
    }
    const handleLoginChange = (event) => {
        setIsLogin(true);
        setLogin(event.target.value);
    };
    const handleAddChange = (event) => {
        setIsAdd(true);
        setAdd(event.target.value);
    };
    const handleAddConChange = (event) => {
        setIsAddCon(true);
        setAddCon(event.target.value);
    }
    const handleDescChange = (event) => {
        setIsDesc(true);
        if(event.target.value.length<101) {
            setDesc(event.target.value);
        }
    };
    const handlePassChange = (event) => {
        setIsPass(true);
        setPass(event.target.value);
    };
    const handleName = (event) => {
        setIsName(true);
        setName(event.target.value);
    };
    const handleAge = (event) => {
        if(digits.test(event.target.value))
        {
            setIsAge(true);
            setAge(event.target.value);
        }
    };
    const handleEmailChange = (event) => {
        setIsEmail(true);
        setEmail(event.target.value);
    };
    const [alertTxt, setAlertTxt] = useState("");
    const register = async () => {
        const data = await registerApi(login, email, pass,isPsycho);
        console.log(data.data);
        if (data.data.access) {
            saveToLocalStorage("ACCESS_TOKEN", data.data.access);
            saveToLocalStorage("REFRESH_TOKEN", data.data.refresh);
            setPart(part+1);
        } else {
            setAlertTxt("Email already exists");
            setAlert(true);
        }
    }
    const loginApi = () => {
        setAlert(false);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let emailCheck = emailRegex.test(email);
        const passOnlyDigits = digits.test(pass);
        if(part===2) {
            if (login.length < 4) {
                setIsLogin(false);
                setAlertTxt("Неправильне ім'я.");
                setAlert(true);
            } else if (!emailCheck) {
                setIsEmail(false);
                setAlertTxt("Неправильна електронна адреса.");
                setAlert(true);
            } else if (pass.length < 6 || passOnlyDigits) {
                setIsPass(false);
                setAlertTxt("Неправильний пароль.");
                setAlert(true);
            }
            else{
                register().then();
            }
        }
        else if(!alert) {
            if (part === 3) {
                const perspective = skills.join(', ');
                const contact=contacts.join(', ')
                updatePsycho(name, desc, files, "UNSKILL", perspective, lang, contact,age).then();
            } else if (part === 1 &&(isPsycho === false || isPsycho === true)) {
                setPart(part + 1)
            }
        }
    };

    useEffect(() => {
        if (pass && email) {
            setButton(true);
        } else {
            setButton(false);
        }
    }, [login, pass, email]);
    useEffect(() => {
        if (name&&age&&desc&&contacts&&skills&&lang&&files) {
            setButton3(true);
        } else {
            setButton3(false);
        }
    }, [name,age,desc,contacts,skills,lang,files]);
    useEffect(() => {
        if (isAuth()&&part!==2&&part!==3) {
            window.location.href = "/";
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuth()]);
    function handleFileChange(event) {
        const file = event.target.files[0];
        const maxSizeInBytes = 4 * 1024 * 1024; // 4 МБ
        if (file.size > maxSizeInBytes) {
            setAlertTxt("Розмір файлу занадто великий");
            setAlert(true);
        }
        else{
            setFiles(file);
        }
    }
    const deleteFile=()=>{
        setFiles(null);
    }
    return (
        <>
        <div className="login">
            <div className="login__login">
                <div className="login__block register">
                    <div className="login__block__mini">
                        <div
                            className="login__text__welcome">{part === 1 ? 'Створити акаунт!' : part === 2 ? 'Важливий вибір!' : 'Майже готово!'}</div>
                        {alert && (
                            <div className="login__alert">
                                <span>{alertTxt}</span>
                                <img
                                    src={images.CloseAlert}
                                    onClick={() => {
                                        setAlert(false);
                                    }}
                                    alt={"closeAlert"}
                                />
                            </div>
                        )}
                        <div className="login__dots__Row">
                            <div className="login__dots__active"></div>
                            <div className={part > 1 ? "login__dots__active" : "login__dots__noActive"}></div>
                            <div className={part > 2 ? "login__dots__active" : "login__dots__noActive"}></div>
                        </div>
                        {part === 2 && <>
                            {/* eslint-disable-next-line react/no-unescaped-entities */}
                            <div className="login__text">Ім'я користувача</div>
                            <div
                                className={
                                    isActiveLogin
                                        ? isLogin
                                            ? "login__input__block"
                                            : "login__input__block__false"
                                        : "login__input__block__active"
                                }
                            >
                                <img src={images.LoginName} className="login__input__img" alt="User"/>
                                <input
                                    className="login__input"
                                    onChange={handleLoginChange}
                                    onBlur={() => {
                                        setIsActiveLogin(true);
                                    }}
                                    onClick={() => {
                                        setIsActiveLogin(false);
                                    }}
                                    type="text"
                                    placeholder="Username"
                                />
                            </div>
                            <div className="login__text">Електронна пошта</div>
                            <div
                                className={
                                    isActiveEmail
                                        ? isEmail
                                            ? "login__input__block"
                                            : "login__input__block__false"
                                        : "login__input__block__active"
                                }
                            >
                                <img src={images.MailIcon} className="login__input__img" alt={"MailIcon"}/>
                                <input
                                    className="login__input"
                                    onChange={handleEmailChange}
                                    onBlur={() => {
                                        setIsActiveEmail(true);
                                    }}
                                    onClick={() => {
                                        setIsActiveEmail(false);
                                    }}
                                    type="text"
                                    placeholder="user@email.com"
                                />
                            </div>
                            <div className="login__text">Пароль</div>
                            <div
                                className={
                                    isActivePass
                                        ? isPass
                                            ? "login__input__block"
                                            : "login__input__block__false"
                                        : "login__input__block__active"
                                }
                            >
                                <img src={images.LoginPin} className="login__input__img" alt="Pin"/>
                                <input
                                    className="login__input"
                                    onChange={handlePassChange}
                                    onBlur={() => {
                                        setIsActivePass(true);
                                    }}
                                    onFocus={() => {
                                        setIsActivePass(false);
                                    }}
                                    type={eye ? "text" : "password"}
                                    placeholder="Потрібно 6+ символів"
                                />
                                <img
                                    src={eye ? images.OpenEye : images.CloseEye}
                                    onClick={() => {
                                        setEye(!eye);
                                    }}
                                    className="eye"
                                    alt={"Eye"}
                                />
                            </div>
                            <div
                                onClick={loginApi}
                                className={button ? "login__button" : "login__button__disabled"}
                            ><span>Продовжити</span>
                            </div>
                            <div className="login__account">
                                Вже є аккаунт?
                                <Link to="/login" className="login__account-span">
                                    Авторизуватися
                                </Link>
                            </div>
                            <div className="login__or__block">
                                <span className="login__or__left"></span>
                                <p className="login__text">or</p>
                                <span className="login__or__right"></span>
                            </div>
                            <div className="google__button-login">
                                <GoogleOAuthProvider clientId="298908062102-2p5834iihc65s1qtua2oskkff673u8cn.apps.googleusercontent.com">
                                    <GoogleLogin
                                        size="large"
                                        onSuccess={(response)=>{onSuccess(response,isPsycho);setPart(part+1);}}
                                        onFailure={onFailure}
                                        text="continue_with"
                                        width={isMobile ? 200 : 330}
                                        locale="ukraine"
                                        useOneTap={true}
                                    />
                                </GoogleOAuthProvider>
                            </div>
                        </>}
                        {part === 1 && <>
                            <div className="login__text__sign">Оберіть ким ви будете:</div>
                            <div className="login__india__row">
                                <div
                                    className={isPsycho === true ? "login__india__block__active" : "login__india__block"}
                                    onClick={() => {
                                        setIsPsycho(true)
                                    }}>
                                    <img src={images.India2} alt="India" className="login__india__block__normal"/>
                                    <div className="login__india__block__text">Хочу<br/>допомогти</div>
                                </div>
                                <div
                                    className={isPsycho === false ? "login__india__block__active" : "login__india__block"}
                                    onClick={() => {
                                        setIsPsycho(false)
                                    }}>
                                    <img src={images.India2} alt="India" className="login__india__block__revert"/>
                                    <div className="login__india__block__text">Шукаю<br/>допомоги</div>
                                </div>
                            </div>
                            <div
                                onClick={loginApi}
                                className={isPsycho === false || isPsycho === true ? "login__button" : "login__button__disabled"}
                            ><span>Продовжити</span>
                            </div>
                            <span className="login__footer_2"></span>
                        </>}
                        {
                            part === 3 && isPsycho && <>
                                {/* eslint-disable-next-line react/no-unescaped-entities */}
                                <div className="login__text">Ім'я</div>
                                <div
                                    className={
                                        isActiveName
                                            ? isName
                                                ? "login__input__block"
                                                : "login__input__block__false"
                                            : "login__input__block__active"
                                    }
                                >
                                    <img src={images.LoginName} className="login__input__img" alt="User"/>
                                    <input
                                        className="login__input"
                                        onChange={handleName}
                                        onBlur={() => {
                                            setIsActiveName(true);
                                        }}
                                        onClick={() => {
                                            setIsActiveName(false);
                                        }}
                                        type="text"
                                        placeholder="Ольга Поплавська"
                                    />
                                </div>
                                <div className="login__text">Вік</div>
                                <div
                                    className={
                                        isActiveAge
                                            ? isAge
                                                ? "login__input__block"
                                                : "login__input__block__false"
                                            : "login__input__block__active"
                                    }
                                >
                                    <input
                                        className="login__input"
                                        onChange={(e)=>{handleAge(e)}}
                                        onBlur={() => {
                                            setIsActiveAge(true);
                                        }}
                                        onClick={() => {
                                            setIsActiveAge(false);
                                        }}
                                        type="text"
                                        value={age}
                                        placeholder="18"
                                    />
                                </div>
                                <div className="login__text">Ваш опис</div>
                                <div
                                    className={
                                        isActiveDesc
                                            ? isDesc
                                                ? "login__input__block desc"
                                                : "login__input__block__false desc"
                                            : "login__input__block__active desc"
                                    }
                                >
                                    <textarea
                                        className="login__input descArea"
                                        onChange={(e)=>{handleDescChange(e)}}
                                        onBlur={() => {
                                            setIsActiveDesc(true);
                                        }}
                                        onFocus={() => {
                                            setIsActiveDesc(false);
                                        }}
                                        value={desc}
                                        placeholder="Я Остап Борщевський, пройшов курс..."
                                    />
                                </div>
                                <div className="login__text">Контактні дані</div>
                                {contacts&&contacts.map((contact,index)=>(
                                    <div key={index} className="login__input__block login__skills">
                                        <div className="login__input text__left">{contact}</div>
                                        <img
                                            src={images.Delete}
                                            alt="delete"
                                            className="login__input__img__right"
                                            onClick={() => {
                                                deleteContacts(index);
                                            }}
                                        />
                                    </div>
                                ))
                                }
                                <div
                                    className={
                                        isActiveAddCon
                                            ? isAddCon
                                                ? "login__input__block login__skills"
                                                : "login__input__block__false login__skills"
                                            : "login__input__block__active login__skills"
                                    }>
                                    <input
                                        className="login__input"
                                        onChange={handleAddConChange}
                                        onBlur={() => {
                                            setIsActiveAddCon(true);
                                        }}
                                        onClick={() => {
                                            setIsActiveAddCon(false);
                                        }}
                                        type="text"
                                        placeholder="Telegram:@abc"
                                        value={addCon}
                                    />
                                    <img src={images.Add} alt="add" onClick={addContacts} className="login__input__img__right"/>
                                </div>
                                <div className="login__text">Ваші напрями</div>
                                {skills&&skills.map((skill,index)=>(
                                    <div key={index} className="login__input__block login__skills">
                                        <div className="login__input text__left">{skill}</div>
                                        <img
                                            src={images.Delete}
                                            alt="delete"
                                            className="login__input__img__right"
                                            onClick={() => {
                                                deleteSkill(index);
                                            }}
                                        />
                                    </div>
                                ))
                                }
                                <div
                                    className={
                                        isActiveAdd
                                            ? isAdd
                                                ? "login__input__block login__skills"
                                                : "login__input__block__false login__skills"
                                            : "login__input__block__active login__skills"
                                    }>
                                    <input
                                        className="login__input"
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
                                    <img src={images.Add} alt="add" onClick={addSkills} className="login__input__img__right"/>
                                </div>
                                <div className="login__text">Мови</div>
                                <div className="login__dropdown  drop">
                                    <div
                                        className="login__dropdown"
                                        onClick={() => {
                                            setIsDropdownOpen(!isDropdownOpen);
                                        }}
                                    >
                                        <span>{lang}</span>
                                        <img
                                            src={images.Dropdown}
                                            alt="ArrowDownFilter"
                                            style={{width: 12,height: 7,marginRight:14,marginTop: 16,cursor:"pointer"}}
                                        />
                                    </div>
                                    <div
                                        className={`login__dropdown-cat ${
                                            isDropdownOpen ? "open" : ""
                                        }`}
                                    >{languages.map((language)=> (
                                        <div key={language}
                                            className="login__dropdown-cat-wrapper"
                                            onClick={() => handleOptionClick(language)}
                                        >
                                            <p>{language}</p>
                                        </div>
                                        ))
                                    }
                                    </div>
                                </div>
                                <div className="login__text">Резюме</div>
                                <div className="login__files">
                                <label htmlFor="myfile" className="login__files__label">
                                    <div className="login__files__input__div">
                                        <div className="login__files__div">
                                            <img src={images.Resume} alt="resume"/>
                                        </div>
                                        {files?
                                            <div className="login__input__block login__file">
                                                <div className="login__input text__left">{files.name}</div>
                                                <img
                                                    src={images.Delete}
                                                    alt="doc"
                                                    className="login__input__img__right"
                                                    onClick={() => {
                                                        deleteFile();
                                                    }}
                                                />
                                            </div>:
                                            <div className="login__files__text">
                                                <div className="div__text">
                                                    Перетягніть файл або знайдіть на своєму комп’ютеру
                                                </div>
                                                <div className="div__text">
                                                    Підтримка .pdf максимум 4 Мб
                                                </div>
                                                <div className="div__text">
                                                    Назва файлів підтримується тільки англійською мовою
                                                </div>

                                            </div>
                                        }
                                    </div>
                                    <div className="login__files__button">
                                        {files?'Змінити файл' :'Додати файл'}
                                    </div>
                                    <input
                                        id="myfile"
                                        accept=".pdf"
                                        type="file"
                                        onChange={handleFileChange}
                                    />
                                </label>
                                </div>

                                <div
                                    onClick={loginApi}
                                    className={button3 ? "login__button" : "login__button__disabled"}
                                ><span>Зареєструватися</span>
                                </div>
                                <span className="login__footer_2"></span>
                            </>
                        }
                        {part === 3 && !isPsycho && <>
                            <div>ЯКІ БЛЯТЬ ПРОБЛЕМИ</div>
                            <div>ПИздуй займись собою</div></>}
                    </div>
            </div>
        </div>
    <span className="login__footer"></span>
</div>
        </>
)
    ;
};

export default Register;
