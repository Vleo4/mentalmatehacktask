import { getFromLocalStorage } from "./tokenStorage.js";
import axios from "axios";
import jwtDecode from "jwt-decode";
const url = "https://mentalmate.brainstormingapplication.com/api/";
const accessToken = getFromLocalStorage("ACCESS_TOKEN");
export const updatePsycho = async (name, description, cv, skills, perspective, lang, contacts, age) => {
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
        if (location.pathname === '/register') {
            window.location.href = '/';
        }
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const profileApi = async () => {
    try {
        const userId = jwtDecode(accessToken).user_id;
        const response = await axios.get(url + 'psychos/',{
            headers: {
                Authorization: 'Bearer ' + accessToken
            },
        });
        const data = response.data.filter((psycho) =>psycho.user === userId);
        const prop =await viewPsychoProfileApi(data[0].id)
        return prop;
    } catch (error) {
        console.log(error);
    }
};

export const viewPsychoProfileApi = async (userId) => {
    try {
        const response = await axios.get(url + `psycho/${userId}/`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
export const getProblemsApi = async () => {
    try {
        const response = await axios.get(url + `psycho/problems/`,{
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + accessToken
            },
        });
        return response.data;
    } catch (error) {
       return error;
    }
};
export const getAppliedApi = async () => {
    try {
        const response = await axios.get(url + `psycho/problems/applied/`,{
            headers: {
                Authorization: 'Bearer ' + accessToken
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
export const getProblemPsychoApi = async (id) => {
    try {
        const response = await axios.get(url + `psycho/problem/`+id+'/',{
            headers: {
                Authorization: 'Bearer ' + accessToken
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
export const psychoAnswerAPI = async (id) => {
    try {
        return await axios.post(url + "psycho/answer/"+id+'/', {},{
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + accessToken
            },
        });
    } catch (error) {
        return error.response;
    }
}
export const getJournalApi = async (id) => {
    try {
        const response = await axios.get(url + `psycho/journal/`+id+'/', {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + accessToken,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
