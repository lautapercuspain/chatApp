import { FULFILLED } from 'redux-promise-middleware';

const INITIAL_STATE = {
	users: [],
	currentUser: null,
	roles: [],
	currentRole: null
};

const applySetUsers = (state, action) => ({
	...state,
	users: action.payload
});

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case `GET_USERS_${FULFILLED}`:
			return applySetUsers(state, action);
		default:
			return state;
	}
};
