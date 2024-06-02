import axios from 'axios';
import Cookies from 'js-cookie';

axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post["Content-Type"] = 'application/json';

export const getAuthToken = () => {
    return Cookies.get('auth_token');
}

export const setAuthToken = (token) => {
    const expirationMinutes = 240;
    const expirationDays = expirationMinutes / (24 * 60); // Convert minutes to fraction of a day
    Cookies.set('auth_token', token, { expires: expirationDays });
}


export const removeAuthToken = () => {
    Cookies.remove('auth_token');
}

export const request = (method, url, data) => {
    let headers = {};
    const authToken = getAuthToken();
    if (authToken) {
        headers = {"Authorization": `Bearer ${authToken}`};
    }

    return axios({
        method: method,
        headers: headers,
        url: url,
        data: data
    });
};
