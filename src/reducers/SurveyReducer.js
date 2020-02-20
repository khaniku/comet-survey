const initialState = {
	surveys: {},
}
export default (state = initialState, action) => {
	switch (action.type) {
		case "MAIN":
			return {...state, surveys: action.payload.surveys};

		default:
	 		return state;
	}
}