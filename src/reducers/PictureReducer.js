
const initialState = {
    pictures: []
}

export default (state = initialState.pictures, action) => {
	switch (action.type) {
		case 'ALL_PICTURES':
			return action.payload;
		case 'DELETE_PICTURES':
			return state.filter(({ id }) => id !== action.payload);
		case 'ADD_PICTURES':
			return {...state, pictures: action.payload};	 
		default:
	 		return state;
	}
}
