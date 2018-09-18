import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { startClearUnread, getRoomsFromDB } from '../actions/rooms';
import ShowUsers from './ShowUsers';

class ShowRooms extends React.Component {
	componentWillMount() {
		this.props.getRoomsFromDB();
	}

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
		//	const rooms = this.props.rooms;
		const allRooms = this.props.allRooms[0] && this.props.allRooms[0].filter((room) => !room.private);
		if (allRooms && allRooms.length > 0) {
			const a = allRooms.map((room, idx) => {
				return (
					<div key={idx} className="room-name-wrapper">
						<NavLink to={`/room/${room.name}`} activeClassName="room-selected">
							<div className="room-name">{room.name.toUpperCase()}</div>
						</NavLink>
					</div>
				);
			});
			return a;
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

const mapStateToProps = (state) => ({
	rooms: state.rooms,
	allRooms: state.allRooms,
	auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
	startClearUnread: (roomName) => dispatch(startClearUnread(roomName)),
	getRoomsFromDB: () => dispatch(getRoomsFromDB())
});

export default connect(mapStateToProps, mapDispatchToProps)(ShowRooms);
