import { useEffect, useState } from "react";
import "./Login.css";
import images from "../../../constants/images.js";
import useResizer from "../../../constants/isMobile.js";
import { saveToLocalStorage } from "../../../api/tokenStorage.js";
import { Link } from "react-router-dom";
import { loginApi, onFailure, onSuccess } from "../../../api/apiPublic.js";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { isAuth } from "../../../api/AuthContext.jsx";
import {TopLoader} from "../../../components/index.js";

const Login = () => {
    const [loading,setLoading]=useState(false);
    useEffect(() => {
        if (isAuth()) {
            window.location.href = "/";
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuth()]);
    const isMobile = useResizer();
    const [button, setButton] = useState(false);
    const [pass, setPass] = useState(null);
    const [login, setLogin] = useState(null);
    const [isActiveLogin, setIsActiveLogin] = useState(true);
    const [isActivePass, setIsActivePass] = useState(true);
    const [eye, setEye] = useState(false);
    const [alert, setAlert] = useState(false);

    // -------------------DEFAULT LOGIN-----------------------------
    const handleLogin = (event) => {
        setLogin(event.target.value);
    };
    const handlePass = (event) => {
        setPass(event.target.value);
    };
    useEffect(() => {
        if (login && pass) {
            setButton(true);
        } else {
            setButton(false);
        }
    }, [login, pass]);

    const loginButton = async () => {
        if (login && pass) {
            setAlert(false);
            try {
                const { access, refresh } = await loginApi(login, pass);
                saveToLocalStorage("ACCESS_TOKEN", access);
                saveToLocalStorage("REFRESH_TOKEN", refresh);
                window.location.href = "/";
            } catch (err) {
                setAlert(true);
                setLoading(false);
            }
        }
    };

    return (
        <div className="login">
            {loading?<TopLoader/>:
            <div className="login__login">
                <div className="login__block">
                    <div className="login__block__mini">
                        <div className="login__text__welcome">Ласкаво просимо!</div>
                        <div className="login__text__sign">Увійдіть у свій обліковий запис</div>
                        {alert && (
                            <div className="login__alert">
                                {/* eslint-disable-next-line react/no-unescaped-entities */}
                                Неправильне ім'я або пароль.
                                <img
                                    src={images.CloseAlert}
                                    onClick={() => {
                                        setAlert(false);
                                    }}
                                 alt="Alert"/>
                            </div>
                        )}
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        <div className="login__text">Ім'я користувача</div>
                        <div
                            className={
                                isActiveLogin
                                    ? "login__input__block"
                                    : "login__input__block__active"
                            }
                        >
                            <img src={images.LoginName}  className="login__input__img" alt="User"/>
                            <input
                                className="login__input"
                                onChange={handleLogin}
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
                        <div className="login__text">Пароль</div>
                        <div
                            className={
                                isActivePass
                                    ? "login__input__block"
                                    : "login__input__block__active"
                            }
                        >
                            <img src={images.LoginPin} className="login__input__img" alt="Pin"/>
                            <input
                                className="login__input"
                                onChange={handlePass}
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
                                className={eye?"eye":"eye_margin"}
                             alt="eye"/>
                        </div>
                        <div
                            onClick={()=>{
                                setLoading(true);
                                loginButton();
                            }}
                            className={button ? "login__button" : "login__button__disabled"}
                        >
                        Увійти
                        </div>
                        <div className="login__account">Немає облікового запису?</div>
                        <Link to="/register" className="login__account login__account__text">
                                    Зареєструватися
                        </Link>
                        <div className="login__or__block">
                            <span className="login__or__left"></span>
                            <p className="login__text">or</p>
                            <span className="login__or__right"></span>
                        </div>

                        <div className="google__button-login">
                            <GoogleOAuthProvider clientId="298908062102-2ii5botcaj2d9c00tnfkct6jo72q8qkj.apps.googleusercontent.com">
                                <GoogleLogin
                                    size="large"
                                    onSuccess={onSuccess}
                                    onFailure={onFailure}
                                    text="continue_with"
                                    width={isMobile ? 200 : 330}
                                    locale="english"
                                    useOneTap={true}
                                />
                            </GoogleOAuthProvider>
                        </div>
                    </div>
                </div>
            </div>}
            {alert && <span className="login__footer"></span>}
        </div>
    );
};

export default Login;
