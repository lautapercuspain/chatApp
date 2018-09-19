import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { startClearUnread } from '../actions/rooms';
import ShowUsers from './ShowUsers';

/***
* Render ShowRooms Page component.
* @param {rooms} Array, representing all existing rooms in the DB. 
* @param {auth} Object, representing the current user logged in. 
***/
class ShowRooms extends React.Component {
	showUnread = (room) => {
		const user = this.props.auth;
		if (user) {
			const { uid } = user;
			const person = room.people.find((p) => {
				return uid === p.id;
			});
			return person && person.unread;
		}
	};

	returnRooms = () => {
		const rooms = this.props.rooms;
		if (rooms.length > 0) {
			const roomList = rooms.filter((room) => !room.restricted).map((room, idx) => {
				return (
					<div key={idx} className="room-name-wrapper">
						<button
							className="button--unread-messages"
							onClick={() => this.props.startClearUnread(room.name)}
						>
							{this.showUnread(room)}
						</button>
						<NavLink to={`/room/${room.name}`} activeClassName="room-selected">
							<div className="room-name">{room.name}</div>
						</NavLink>
					</div>
				);
			});
			return roomList;
		}
	};

	render() {
		return (
			<div className="container__left">
				<div className="container__left__text">
					<h3 className="header--user">Public Channels</h3>
					{this.returnRooms()}
					<ShowUsers />
				</div>
			</div>
		);
	}
}

ShowRooms.propTypes = {
	rooms: PropTypes.array.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	rooms: state.rooms,
	auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
	startClearUnread: (roomName) => dispatch(startClearUnread(roomName))
});

export default connect(mapStateToProps, mapDispatchToProps)(ShowRooms);
