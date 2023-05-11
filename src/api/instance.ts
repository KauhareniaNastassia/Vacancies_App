import axios, {InternalAxiosRequestConfig} from "axios";
import {AuthResponseType} from "../redux/authReducer";


export const instance = axios.create({
    baseURL: 'https://startup-summer-2023-proxy.onrender.com/2.0',
    headers: {
        'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
    },
})

export const customInstance = axios.create({
    baseURL: 'https://startup-summer-2023-proxy.onrender.com/2.0',
    headers: {
        'x-secret-key': 'GEU4nvd3rej*jeh.eqp'
    },
})

const requestHandler = (request: InternalAxiosRequestConfig) => {

    const access_token = localStorage.getItem('access_token')
    const token_type = localStorage.getItem('token_type')

    if (access_token && token_type) {
        const accessToken = JSON.parse(access_token)
        const tokenType = JSON.parse(token_type)

        request.headers.Authorization = `${tokenType} ${accessToken}`
    }

    request.headers.set('X-Api-App-Id', 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948')

    return request;
};

const errorHandler = (error: any) => {
    return Promise.reject(error);
};

customInstance.interceptors.request.use(
    (request) => requestHandler(request),
    (error) => errorHandler(error)
);


