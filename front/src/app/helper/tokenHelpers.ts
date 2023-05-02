import { AuthUserInfo, IUser } from "./types/types";

export function parseJwt (token: string) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

function isLocalTokenExpired(token: string): boolean {
    if (!!token) {
        const token_exp: {exp: number} = parseJwt(token);
        const now = Math.floor(Date.now() / 1000);
        return (token_exp.exp - now) < 0
    }
    return true;
}

export function setLocalToken(token: string) {
    localStorage.setItem('token', token)
}

export function removeLocalToken() {
    localStorage.removeItem('token')
}

export function getLocalToken(): string {
    const token: string | null = localStorage.getItem('token')
    return token ? token: '';
}

export function isLocalTokenActual(): boolean {
    const token = getLocalToken();
    const isExpired = isLocalTokenExpired(token);

    return !!token && !isExpired;
}

export function getUserInfoFromLocalToken(): AuthUserInfo {
    const token = getLocalToken();
    const info: AuthUserInfo = {id: null, email: null}
    if (!token) return info
    const user: IUser = parseJwt(token);
    info.id = user.id;
    info.email = user.email;
    return info
}