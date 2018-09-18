const defaultState = [];

export default (state = defaultState, action) => {
	switch (action.type) {
		case 'GET_ROOMS_DB':
			return [ ...state, action.payload ];
		default:
			return state;
	}
};
