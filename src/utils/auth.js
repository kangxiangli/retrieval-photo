import Cookies from "js-cookie";

const TokenKey = "token";
const SessionKey = "SESSION_V1PK";

export function getToken() {
    return Cookies.get(TokenKey);
}

export function setToken(token) {
    return Cookies.set(TokenKey, token, {
        expires: 1
    });
}

export function removeToken() {
    return Cookies.remove(TokenKey);
}

export function getSession() {
    return Cookies.get(SessionKey);
}

export function setSession(session) {
    return Cookies.set(SessionKey, session, {
        expires: 1
    });
}

export function removeSession() {
    return Cookies.remove(SessionKey);
}