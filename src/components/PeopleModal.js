import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';

class PeopleModal extends React.Component {
	joinPrivateRoom = (user, roomName) => {
		const data = {
			roomName: roomName,
			id: user.uid,
			name: user.name,
			unread: 0
		};
		this.props.startJoinPrivateRoom(data, roomName);
	};

	returnUsers = (users, auth, roomName) => {
		const { uid } = auth;
		const allUsers = Object.values(users).filter((user) => user.uid !== uid);
		if (allUsers.length > 0) {
			return allUsers.map((user, idx) => {
				return (
					<div key={idx} className="room-name-wrapper">
						<button
							onClick={() => {
								this.joinPrivateRoom(user, roomName);
							}}
						>
							{user.name}
						</button>
					</div>
				);
			});
		}
	};

	render() {
		const { allUsers, auth, rooms, roomName } = this.props;
		return (
			<Modal
				isOpen={this.props.showModal}
				onRequestClose={this.props.closeModal}
				contentLabel="People"
				closeTimeoutMS={200}
				className="modal"
			>
				<h3 className="modal__title">People</h3>
				<div className="modal__body">{this.returnUsers(allUsers, auth, roomName, rooms)}</div>
			</Modal>
		);
	}
}

const mapStateToProps = (state) => ({
	rooms: state.rooms
});

export default connect(mapStateToProps)(PeopleModal);
