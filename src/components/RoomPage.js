import React from 'react';
import { connect } from 'react-redux';
import { startSendMessage, startLeaveRoom, startJoinRoom, startClearUnread } from '../actions/rooms';
import { fetchAllUsers } from '../actions/users';
import Messages from './Messages';
import PeopleModal from './PeopleModal';

export class RoomPage extends React.Component {
	state = {
		showModal: false
	};

	componentWillMount() {
		this.props.fetchAllUsers();
	}
	roomName = this.props.location.pathname.split('/').slice(-1)[0];

	onSubmit = (e) => {
		e.preventDefault();
		let message = e.target.message.value.trim();
		if (message === '') {
			e.target.submit.diabled = true;
			return;
		}
		this.props.startSendMessage(message, this.roomName);

		e.target.reset();
	};

	handleLeaveRoom = () => {
		this.props.startLeaveRoom(this.roomName);
	};

	showPeople = () => {
		this.setState({ showModal: true });
	};

	closeModal = () => {
		this.setState({ showModal: false });
	};

	onJoinPrivateRoom = (user, roomName) => {
		const data = {
			roomName: roomName,
			id: user.id,
			name: user.name,
			unread: 0
		};

		this.props.startJoinRoom(data, this.showJoinError);
	};

	showJoinError = (joinError) => {
		this.setState({
			joinError
		});
	};

	componentDidUpdate() {
		// const rooms = this.props.rooms;
		// if (rooms.length > 0) {
		// 	const a = rooms.find((room) => {
		// 		if (room.name === this.roomName) {
		// 		}
		// 	});
		// }
	}

	render() {
		const { users, auth } = this.props;
		return (
			<div className="box-layout--messages">
				<div className="room-header">
					<button onClick={this.showPeople} className="button--leave-room">
						Invite People
					</button>
					<div className="room-header__title">{this.props.location.pathname.split('/').slice(-1)[0]}</div>
					<button onClick={this.handleLeaveRoom} className="button--leave-room">
						Leave room
					</button>
				</div>
				<Messages roomName={this.roomName} />
				<form onSubmit={this.onSubmit} autoComplete="off" id="message-form">
					<input type="text" name="message" className="text-input" placeholder="Send message" autoFocus />
					<button name="submit" className="login-button">
						Send
					</button>
				</form>
				<PeopleModal
					allUsers={users}
					auth={auth}
					startJoinPrivateRoom={this.onJoinPrivateRoom}
					roomName={this.roomName}
					showModal={this.state.showModal}
					closeModal={this.closeModal}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	rooms: state.rooms,
	auth: state.auth,
	users: state.users.users
});

const mapDispatchToProps = (dispatch) => ({
	startSendMessage: (message, roomName) => dispatch(startSendMessage(message, roomName)),
	startLeaveRoom: (roomName) => dispatch(startLeaveRoom(roomName)),
	startClearUnread: (roomName) => dispatch(startClearUnread(roomName)),
	startJoinRoom: (data, showJoinError) => dispatch(startJoinRoom(data, showJoinError)),
	fetchAllUsers: () => dispatch(fetchAllUsers())
});

export default connect(mapStateToProps, mapDispatchToProps)(RoomPage);
