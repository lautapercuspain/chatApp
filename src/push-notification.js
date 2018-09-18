import firebase from 'firebase';
import database from './firebase/firebase';
export const initializeFirebase = () => {
	firebase.initializeApp({
		messagingSenderId: '1016460004598',
		databaseURL: 'https://pager-task.firebaseio.com'
	});
};

export const askForPermissioToReceiveNotifications = async (uid) => {
	try {
		const messaging = firebase.messaging();
		await messaging.requestPermission();
		const token = await messaging.getToken();
		database.ref('users').once('value', (snapshot) => {
			if (snapshot.val()) {
				const users = snapshot.val();
				for (var key in users) {
					if (users.hasOwnProperty(key)) {
						if (key === uid) {
							return database.ref(`users/${uid}`).set({ ...users[key], notificationToken: token });
						}
					}
				}
			}
		});
		console.log('token::', token);
	} catch (error) {
		console.error(error);
	}
};
