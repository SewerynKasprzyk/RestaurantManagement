import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post["Content-Type"] = 'application/json';

export const getAuthToken = () => {
    return Cookies.get('auth_token');
}

export const setAuthToken = (token) => {
    Cookies.set('auth_token', token, { expires: 7 }); // expires in 7 days
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
