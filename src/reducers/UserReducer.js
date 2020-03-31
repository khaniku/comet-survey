import { USER } from "../constants/ActionTypes";

export default (state = null, action) => {
	switch (action.type) {
		case USER:
			return action.payload;
		case 'UPDATE_USER':
			return {...state, firstName: action.payload.firstName, lastName: action.payload.lastName};
		default:
	 		return state;
	}
}