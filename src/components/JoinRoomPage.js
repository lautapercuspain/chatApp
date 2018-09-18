import React from 'react';
import { connect } from 'react-redux';
import Autocomplete from 'react-autocomplete';
import { startCreateRoom, startJoinRoom } from '../actions/rooms';

import database, { firebase } from '../firebase/firebase';
/***
* Render JoinRoomPage Page component.
* @param {auth} Auth object.
* @param {startCreateRoom} Funtion handler for create a Room.
* @param {startJoinRoom} Funtion handler for joining a Room.
***/
export class JoinRoomPage extends React.Component {
	state = {
		error: '',
		joinError: '',
		inputValue: 'Start typing to search'
	};

	componentWillMount() {
		firebase.auth().onAuthStateChanged((authUser) => {
			if (authUser) {
				this.onSetAuthUser(authUser);
			}
		});
	}

	onSetAuthUser = (user) => {
		const name = user.displayName ? user.displayName : user.email;
		database.ref(`users/${user.uid}`).once('value', (snapshot) => {
			if (!snapshot.val()) {
				database.ref(`users/${user.uid}`).set({
					name,
					uid: user.uid,
					email: user.email
				});
			}
		});
	};

	onCreateRoom = (e) => {
		e.preventDefault();
		const user = this.props.auth;
		const value = e.target.rname.value.trim();
		if (user) {
			const name = user.displayName;
			if (value) {
				this.setState({ error: '' });
				const room = {
					name: value,
					private: false,
					people: {
						id: user.uid,
						name,
						unread: 0,
						lastRead: 0
					}
				};
				this.props.startCreateRoom(room, this.showCreateError);
			} else {
				this.setState({ error: 'Please enter a valid room name!' });
			}
		}
	};

	onCreatePrivateRoom = (e) => {
		e.preventDefault();
		const user = this.props.auth;
		const value = e.target.rname.value.trim();
		if (user) {
			const name = user.displayName;
			if (value) {
				this.setState({ error: '' });
				const room = {
					name: value,
					private: true,
					people: {
						id: user.uid,
						name,
						unread: 0,
						lastRead: 0
					}
				};
				this.props.startCreateRoom(room, this.showCreateError);
			} else {
				this.setState({ error: 'Please enter a valid room name!' });
			}
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

	onJoinRoom = (e) => {
		e.preventDefault();
		const user = this.props.auth;
		const data = {
			roomName: this.state.inputValue,
			id: user.uid,
			name: user.displayName,
			unread: 0
		};
		this.props.startJoinRoom(data, this.showJoinError);
	};
	onChangeValue = (e) => {
		this.setState({
			inputValue: e.target.value
		});
	};
	onSelectValue = (val) => {
		this.setState({
			inputValue: val
		});
	};
	render() {
		const { rooms } = this.props;
		return (
			<div className="box-layout--join">
				<div className="box-layout__box--join">
					<h1 className="box-layout__title">Join a room</h1>
					<form onSubmit={this.onJoinRoom} autoComplete="off">
						<Autocomplete
							className="text-input--join"
							getItemValue={(item) => item.name}
							items={rooms}
							renderItem={(item, isHighlighted) => (
								<div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>{item.name}</div>
							)}
							value={this.state.inputValue}
							onChange={this.onChangeValue}
							onSelect={this.onSelectValue}
						/>

						<button className="button--join">Join</button>
						{this.state.joinError && (
							<p className="message__time" style={{ color: 'black' }}>
								{this.state.joinError}
							</p>
						)}
					</form>
				</div>
				<div className="box-layout__box--join">
					<h1 className="box-layout__title">Create public room</h1>
					<form onSubmit={this.onCreateRoom} autoComplete="off">
						<input className="text-input--join" placeholder="Enter Room name" name="rname" />
						<button className="button--join">Create</button>
						{this.state.error && (
							<p className="message__time" style={{ color: 'black' }}>
								{this.state.error}
							</p>
						)}
					</form>
				</div>
				<div className="box-layout__box--join">
					<h1 className="box-layout__title">Create private room</h1>
					<form onSubmit={this.onCreatePrivateRoom} autoComplete="off">
						<input className="text-input--join" placeholder="Enter Room name" name="rname" />
						<button className="button--join">Create</button>
						{this.state.error && (
							<p className="message__time" style={{ color: 'black' }}>
								{this.state.error}
							</p>
						)}
					</form>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	startCreateRoom: (room, showCreateError) => dispatch(startCreateRoom(room, showCreateError)),
	startJoinRoom: (data, showJoinError) => dispatch(startJoinRoom(data, showJoinError))
});

const mapStateToProps = (state) => ({
	auth: state.auth,
	rooms: state.rooms
});

export default connect(mapStateToProps, mapDispatchToProps)(JoinRoomPage);
