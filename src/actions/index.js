import { AUTH, USER } from "../constants/ActionTypes";

export function Auth(accessToken) {
    return { type: AUTH, payload: accessToken}
}
export function User(details) {
    return { type: USER, payload: details}
}

export function updateUser(firstName, lastName) {
    return { type: 'UPDATE_USER', payload: {
        firstName,
        lastName
        }
    }
}