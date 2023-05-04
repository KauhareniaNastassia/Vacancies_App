import axios from "axios";


export const instance = axios.create({
    baseURL: 'https://startup-summer-2023-proxy.onrender.com/2.0',
    headers: {
        'x-secret-key': 'GEU4nvd3rej*jeh.eqp'
    },
})