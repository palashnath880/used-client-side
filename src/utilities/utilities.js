import axios from "axios"
import useCookie from "../hooks/useCookie";

export const CreateJWT = (uid, callback) => {
    const { setCookie } = useCookie(['used_access_token']);
    return axios.post('https://used-server.vercel.app/used-jwt', { uid })
        .then((res) => {
            const data = res?.data;
            if (data?.token) {
                setCookie('used_access_token', data?.token);
                callback(null);
            }
        })
        .catch(err => {
            callback(err);
            console.error(err);
        });
}