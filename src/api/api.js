import axios from "axios";
import { getFromLocalStorage, saveToLocalStorage } from "./tokenStorage";
import jwtDecode from "jwt-decode";

const url = "https://mentalmate.brainstormingapplication.com/api/";
const accessToken = getFromLocalStorage("ACCESS_TOKEN");
const refreshToken = getFromLocalStorage("REFRESH_TOKEN");
let token;
if (accessToken) {
    // eslint-disable-next-line no-unused-vars
    token = jwtDecode(accessToken);
    console.log(token);
}
export const isPsycho = () => {
    return token.is_psycho === true;
}

// --------------- PROFILE ------------------------

export const profileApi = async () => {
    try {
        const userId = jwtDecode(accessToken).user_id;
        console.log(userId);
        const response = await axios.get(url + `psycho/${userId}/`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

// --------------- UPDATE PROFILE ------------------------

export const updatePsycho = async (name, description, cv, skills, perspective, lang, contacts,age) => {
    try {
        console.log(cv);
        const accessToken = getFromLocalStorage("ACCESS_TOKEN");
        const response = await axios.put(url + "psycho/update/", {
            "name": name,
            "description": description,
            "cv": cv,
            "skills": skills,
            "perspective": perspective,
            "lang": lang,
            "contacts": contacts,
            "age": age
        }, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer ' + accessToken
            },

        });
        if(location.pathname==='/register')
        {
            window.location.href='/';
        }
        return response.data;
    } catch (error) {
        console.log(error);
    }
};


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
    console.log("Success:", response);
    sendTokenToBackend(response.credential,is_psycho).then();
};
export const onFailure = (response) => {
    console.log("Failure:", response);
};

export const sendTokenToBackend = async (tokenId,is_psycho) => {
    console.log(is_psycho);
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

