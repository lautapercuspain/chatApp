import firebase from '../firebase/firebase';

const users = firebase.ref('users');

export const fetchAllUsers = () => {
	return (dispatch) => {
		users.once('value', (snapshot) => {
			if (snapshot.val()) {
				dispatch({
					type: 'GET_USERS',
					payload: new Promise((resolve) => {
						resolve(snapshot.val());
					})
				});
			}
		});
	};
};
