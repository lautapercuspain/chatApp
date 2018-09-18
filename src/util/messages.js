export default (rooms, roomName) => {
	const targetRoom = rooms.filter((room) => room.name === roomName)[0];
	const messages = targetRoom ? targetRoom.messages : 'Loading..';
	return messages;
};
