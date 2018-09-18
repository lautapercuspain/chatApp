import React from 'react';
import { connect } from 'react-redux';
import { startCreateRoom, startJoinRoom } from '../actions/rooms';
import { fetchAllUsers } from '../actions/users';
import { NavLink } from 'react-router-dom';

class ShowUsers extends React.Component {
	state = {
		error: '',
		joinError: ''
	};

	componentWillMount() {
		this.props.fetchAllUsers();
	}

	createOneToOneChat = (roomId, targetUser) => {
		const user = this.props.auth;
		console.log('createOneToOneChat::', user);
		if (roomId) {
			const name = user.displayName;
			const room = {
				name: roomId,
				private: true,
				people: {
					id: user.uid,
					name,
					unread: 0,
					lastRead: 0
				}
			};
			console.log('Room object::', room);
			this.props.startCreateRoom(room, this.showCreateError);
		}
		if (targetUser) {
			const data = {
				roomName: roomId,
				id: targetUser.uid,
				name: targetUser.name,
				unread: 0
			};
			console.log('target user data', targetUser);
			this.props.startJoinRoom(data, this.showJoinError);
		}
	};
	returnUsers = () => {
		const { uid } = this.props.auth;

		const users = Object.values(this.props.users).filter((user) => user.uid !== uid);

		if (users.length > 0) {
			const userList = users.map((user, idx) => {
				const userId = user.uid;
				const roomId = `${uid}-${userId}`;
				return (
					<div key={idx} className="room-name-wrapper">
						<NavLink to={{ pathname: `/chat/${uid}-${userId}`, params: { roomId: `${uid}-${userId}` } }}>
							<div className="room-name">
								<button className="button--user" onClick={() => this.createOneToOneChat(roomId, user)}>
									{user.name}
								</button>
							</div>
						</NavLink>
					</div>
				);
			});
			return userList;
		}
	};

	showCreateError = (error) => {
		this.setState({
			error
		});
	};
	showJoinError = (joinError) => {
		this.setState({
			joinError
		});
	};

	render() {
		return <div>{this.returnUsers()}</div>;
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	users: state.users.users
});
const mapDispatchToProps = (dispatch) => ({
	startCreateRoom: (room, showCreateError) => dispatch(startCreateRoom(room, showCreateError)),
	startJoinRoom: (data, showJoinError) => dispatch(startJoinRoom(data, showJoinError)),
	fetchAllUsers: () => dispatch(fetchAllUsers())
});
export default connect(mapStateToProps, mapDispatchToProps)(ShowUsers);
