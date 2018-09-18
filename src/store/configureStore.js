import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import roomsReducer from '../reducers/rooms';
import allRoomsReducer from '../reducers/allRooms';
import usersReducer from '../reducers/users';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
	const store = createStore(
		combineReducers({
			auth: authReducer,
			rooms: roomsReducer,
			allRooms: allRoomsReducer,
			users: usersReducer
		}),
		composeEnhancers(applyMiddleware(promise(), thunk))
	);

	return store;
};
