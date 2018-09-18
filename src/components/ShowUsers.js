import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { startCreateRoom, startJoinRoom } from '../actions/rooms';
import { fetchAllUsers } from '../actions/users';
import { NavLink } from 'react-router-dom';

/***
* ShowUsers Page component.
* @param {auth} Object, the currently logged in user. 
* @param {users}  function handler.
* @param {startClearUnread}  function handler.
* @param {startJoinRoom}  function handler.
* @param {startCreateRoom}  function handler.
***/

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
			this.props.startCreateRoom(room, this.showCreateError);
		}
		if (targetUser) {
			const data = {
				roomName: roomId,
				id: targetUser.uid,
				name: targetUser.name,
				unread: 0
			};
			setTimeout(() => {
				this.props.startJoinRoom(data, this.showJoinError);
			}, 500);
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
						<div className="room-name">
							<NavLink to={`/room/${roomId}`}>
								<button className="button--user" onClick={() => this.createOneToOneChat(roomId, user)}>
									{user.name}
								</button>
							</NavLink>
						</div>
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
		return (
			<div>
				<h3 className="header--user">Logged Users</h3>
				{this.returnUsers()}
			</div>
		);
	}
}

ShowUsers.propTypes = {
	auth: PropTypes.object,
	users: PropTypes.oneOfType([ PropTypes.object, PropTypes.array ]).isRequired,
	fetchAllUsers: PropTypes.func,
	startJoinRoom: PropTypes.func,
	startCreateRoom: PropTypes.func
};

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
