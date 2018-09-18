import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getRoomsFromDB } from '../actions/rooms';
import ShowUsers from './ShowUsers';

/***
* Render ShowRooms Page component.
* @param {allRooms} Array, representing all existing rooms in the DB. 
* @param {auth} Object, representing the current user logged in. 
* @param {getRoomsFromDB} Function, A handler to fetch all the rooms. 
***/
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
		const allRooms = this.props.allRooms[0] && this.props.allRooms[0].filter((room) => !room.private);
		if (allRooms && allRooms.length > 0) {
			const rooms = allRooms.map((room, idx) => {
				return (
					<div key={idx} className="room-name-wrapper">
						<NavLink to={`/room/${room.name}`} activeClassName="room-selected">
							<div className="room-name">{room.name.toUpperCase()}</div>
						</NavLink>
					</div>
				);
			});
			return rooms;
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
	allRooms: PropTypes.array.isRequired,
	auth: PropTypes.object.isRequired,
	getRoomsFromDB: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	allRooms: state.allRooms,
	auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
	getRoomsFromDB: () => dispatch(getRoomsFromDB())
});

export default connect(mapStateToProps, mapDispatchToProps)(ShowRooms);
