
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
		case 'ADD_NEW_PICTURE':
			const {active, data} = action.payload
			let newState = {...state}
			newState.pictures[active].unshift(data);
			return newState;	 
		default:
	 		return state;
	}
}
