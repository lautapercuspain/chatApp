import * as firebase from 'firebase';
console.log('process.env', process.env);
const config = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.FIREBASE_DATABASE_URL,
	projectId: process.env.FIREBASE_PROJECT_ID,
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);
navigator.serviceWorker.register('/firebase-messaging-sw.js').then((registration) => {
	firebase.messaging().useServiceWorker(registration);
});

const database = firebase.database();
const githubAuthProvider = new firebase.auth.GithubAuthProvider();

export { firebase, githubAuthProvider, database as default };
