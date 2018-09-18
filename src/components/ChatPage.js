import React from 'react';
import { connect } from 'react-redux';
import { startSendMessage, startLeaveRoom, startClearUnread } from '../actions/rooms';
import Messages from './Messages';

export class ChatPage extends React.Component {
	state = {};

	componentDidUpdate() {
		//Thi is in case of reloading the page.
		const urlHash = this.props.location.pathname.split('/').slice(-1)[0];
		const roomName = (this.props.location.params && this.props.location.params.roomId) || urlHash;
		const { rooms } = this.props;
		if (rooms.length > 0) {
			const a = rooms.find((room) => {
				return room.name === roomName;
				// const roomPath = a.id;
				// this.props.startClearUnread(this.roomName);
			});
		}
	}

	onSubmit = (e) => {
		e.preventDefault();
		const message = e.target.message.value.trim();
		const roomId = this.props.location.params;

		if (message === '') {
			e.target.submit.diabled = true;
			return;
		}

		this.props.startSendMessage(message, roomId);
		e.target.reset();
	};

	handleLeaveRoom = () => {
		this.props.startLeaveRoom(this.roomName);
	};

	render() {
		const roomId = this.props.location.params;
		return (
			<div className="box-layout--messages">
				<div className="room-header">
					<div className="room-header__title">{this.props.location.pathname.split('/').slice(-1)[0]}</div>
					<button onClick={this.handleLeaveRoom} className="button--leave-room">
						Leave room
					</button>
				</div>
				<Messages roomName={roomId} />
				<form onSubmit={this.onSubmit} autoComplete="off" id="message-form">
					<input type="text" name="message" className="text-input" placeholder="Send message" autoFocus />
					<button name="submit" className="login-button">
						Send
					</button>
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	rooms: state.rooms
});

const mapDispatchToProps = (dispatch) => ({
	startSendMessage: (message, roomName) => dispatch(startSendMessage(message, roomName)),
	startLeaveRoom: (roomName) => dispatch(startLeaveRoom(roomName)),
	startClearUnread: (roomName) => dispatch(startClearUnread(roomName))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
