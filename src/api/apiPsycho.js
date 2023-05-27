import {getFromLocalStorage} from "./tokenStorage.js";
import axios from "axios";
import jwtDecode from "jwt-decode";
const url = "https://mentalmate.brainstormingapplication.com/api/";
const accessToken = getFromLocalStorage("ACCESS_TOKEN");
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

export const profileApi = async () => {
    try {
        const userId = jwtDecode(accessToken).user_id;
        const response = await axios.get(url + `psycho/${userId}/`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};