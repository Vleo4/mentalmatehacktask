import {getFromLocalStorage} from "./tokenStorage.js";
import axios from "axios";
const url = "https://mentalmate.brainstormingapplication.com/api/user/";
const accessToken = getFromLocalStorage("ACCESS_TOKEN");

export const createProblemAPI = async (title,essence,conclusion,contacts,cat=1) => {
    try {
        return await axios.post(url + "problem/create/", {
            "title": title,
            "essence": essence,
            "conclusion": conclusion,
            "contacts": contacts,
            "cat": cat
        },{
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + accessToken
            },
        });
    } catch (error) {
        return error.response;
    }
}
export const editProblemAPI = async (title,essence,conclusion,contacts,id) => {
    try {
        return await axios.put(url + "problem/update/"+id+'/', {
            "title": title,
            "essence": essence,
            "conclusion": conclusion,
            "contacts": contacts,
        },{
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + accessToken
            },
        });
    } catch (error) {
        return error.response;
    }
}
export const closeProblemAPI = async (id) => {
    try {
        return await axios.put(url + "problem/close/"+id+'/', {},{
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + accessToken
            },
        });
    } catch (error) {
        return error.response;
    }
}
export const getPendingPatientApi = async () => {
    try {
        const response = await axios.get(url + `problem/pending/`,{
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + accessToken
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
export const getMyProblemsApi = async () => {
    try {
        const response = await axios.get(url + `problems/`,{
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + accessToken
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};