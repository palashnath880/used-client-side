import { useCookies } from "react-cookie";

const useCookie = (token) => {
    const [cookies, setCookie, removeCookie] = useCookies(token);
    return { cookies, setCookie, removeCookie };
}

export default useCookie;