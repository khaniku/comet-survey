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

export function addPictures(pictures) {
    return { type: 'ADD_PICTURES', payload: pictures}
}

export function addNewPicture(active, data) {
    return { type: 'ADD_NEW_PICTURE', payload: {
        active,
        data
    }}
}