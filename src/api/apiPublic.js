import axios from "axios";
import { getFromLocalStorage, saveToLocalStorage } from "./tokenStorage";
import jwtDecode from "jwt-decode";

const url = "https://mentalmate.brainstormingapplication.com/api/";
const accessToken = getFromLocalStorage("ACCESS_TOKEN");
const refreshToken = getFromLocalStorage("REFRESH_TOKEN");
let token;
export const isPsycho = () => {
    if(accessToken) {
        token = jwtDecode(accessToken);
        return token.is_psycho === true;
    }
}

export const registerApi = async (username, email, password, is_psycho) => {
    try {
        return await axios.post(url + "register/", {
            username: username,
            email: email,
            password: password,
            is_psycho: is_psycho
        });
    } catch (error) {
        return error.response;
    }
};
export const loginApi = async (username, password) => {
    try {
        const response = await axios.post(url + "token/", {
            username: username,
            password: password,
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};


export const refresh = async () => {
    try {
        const response = await axios.post(url + "token/refresh/", {
            refresh: refreshToken,
        });
        saveToLocalStorage("ACCESS_TOKEN", response.data.access);
    } catch (error) {
        console.log(error);
    }
};


// --------------- GOOGLE LOGIN ------------------------

export const onSuccess = (response,is_psycho) => {
    sendTokenToBackend(response.credential,is_psycho).then();
};
export const onFailure = () => {};

export const sendTokenToBackend = async (tokenId,is_psycho) => {
    if(is_psycho===undefined){
        is_psycho=false;
    }
    try {
        console.log(tokenId);
        const response = await axios.post(
            url + "google_login/",
            {
                token: tokenId,
                is_psycho:is_psycho
                },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const data = response.data;
        saveToLocalStorage("ACCESS_TOKEN", data.access);
        saveToLocalStorage("REFRESH_TOKEN", data.refresh);
        if(location.pathname==='/login')
        {
            window.location.href='/';
        }
    } catch (error) {
        console.error("Error while sending token to backend:", error);
    }
};

