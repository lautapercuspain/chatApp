import * as firebase from 'firebase';

const config = {
	apiKey: 'AIzaSyAfRYUq5b235HdMIbcY_xNqFRqpxzFiaTw',
	authDomain: 'pager-task.firebaseapp.com',
	databaseURL: 'https://pager-task.firebaseio.com',
	projectId: 'pager-task',
	storageBucket: 'pager-task.appspot.com',
	messagingSenderId: '1016460004598'
};

firebase.initializeApp(config);
navigator.serviceWorker.register('/firebase-messaging-sw.js').then((registration) => {
	firebase.messaging().useServiceWorker(registration);
});

const database = firebase.database();
const githubAuthProvider = new firebase.auth.GithubAuthProvider();

export { firebase, githubAuthProvider, database as default };
