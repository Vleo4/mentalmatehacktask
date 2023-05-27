import {getFromLocalStorage} from "./tokenStorage.js";
import axios from "axios";
const url = "https://mentalmate.brainstormingapplication.com/api/";
const accessToken = getFromLocalStorage("ACCESS_TOKEN");

export const createProblemAPI = async (title,essence,conclusion,contacts,cat=1) => {
    try {
        return await axios.post(url + "user/problem/create/", {
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
