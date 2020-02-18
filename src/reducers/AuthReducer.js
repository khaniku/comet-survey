import { AUTH } from "../constants/ActionTypes";

export default (state = null, action) => {
	switch (action.type) {
		case AUTH:
			return action.payload;
		default:
	 		return state;
	}
}