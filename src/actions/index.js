import { AUTH } from "../constants/ActionTypes";

export function Auth(accessToken) {
    return { type: AUTH, payload: accessToken}
}