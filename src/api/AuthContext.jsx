import checkIsTokenExpiry from './tokenExpiry';
import {
    clearStorages,
    getFromLocalStorage,
} from './tokenStorage';
import {refresh} from "./apiPublic.js";

export const isAuth = () => {
    const localRefresh = getFromLocalStorage('REFRESH_TOKEN');
    if (!localRefresh) return false;
    const isExpired = checkIsTokenExpiry();
    if (isExpired.refreshToken) {
        clearStorages();
        return false;
    } else if (isExpired.accessToken) {
        refresh().then();
        return true;
    }
    else{
        return true;
    }
};
