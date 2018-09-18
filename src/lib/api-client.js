import axios from 'axios';

const apiUrl = 'https://fcm.googleapis.com/fcm/send';
const serverKey =
	'AAAA7Km8zPY:APA91bHaQmIuOZus4GpyHNPb50X-yeCDcAAlb9VWzpBlPcVwZK3v4q1qJMfpbuVYckUWsJED-eS63lgEYo1_rVSSyJBCaHlROCeZsBHzOTvJtKvxQg_Uoe7CSJb98DFDv7gD9z8C9hgW';
/**
 * Post a notification to fcm
 * @param {Data} An object with notification attributes.
 * @param {userToken} String, the user token to send the notification.
 */
export function postNotification(data = null, userToken) {
	new Promise((resolve, reject) => {
		return axios({
			method: 'post',
			url: apiUrl,
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `key=${serverKey}`
			},
			data: {
				notification: {
					title: 'New Chat Notification',
					body: data.body,
					click_action: data.link,
					icon: 'http://icons.iconarchive.com/icons/custom-icon-design/mono-general-1/256/chat-icon.png'
				},
				to: userToken
			}
		})
			.then((response) => {
				console.log('response:::', response);
				return resolve(response);
			})
			.catch((error) => {
				return reject(error);
			});
	});
}
