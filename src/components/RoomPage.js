import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { startSendMessage, startLeaveRoom, startJoinRoom, startClearUnread } from '../actions/rooms';
import { fetchAllUsers } from '../actions/users';
import Messages from './Messages';
import PeopleModal from './PeopleModal';

/***
* Render RoomPage Page component.
* @param {startSendMessage} function handler. 
* @param {startLeaveRoom}  function handler.
* @param {startClearUnread}  function handler.
* @param {startJoinRoom}  function handler.
* @param {fetchAllUsers}  function handler.
***/

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

RoomPage.propTypes = {
	rooms: PropTypes.array,
	auth: PropTypes.object,
	startSendMessage:PropTypes.func,
	startLeaveRoom:PropTypes.func,
	startClearUnread:PropTypes.func,
	startJoinRoom:PropTypes.func,
	fetchAllUsers:PropTypes.func
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
