import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { askForPermissioToReceiveNotifications } from '../push-notification';
import { startLogout } from '../actions/auth';
/***
* Render Chat Page component.
* @param {auth} Auth object.
* @param {startLogout} Funtion handler for logout.
***/
export const Header = ({ auth, startLogout }) => (
	<header className="header">
		<div className="content-container">
			<div className="header__content">
				<Link className="header__title" to="/join">
					<h1>Chat App</h1>
				</Link>
				<button
					className="button--join"
					onClick={() => {
						askForPermissioToReceiveNotifications(auth.uid);
					}}
				>
					Get notifications
				</button>
				<button className="button button--link" onClick={startLogout}>
					Logout
				</button>
			</div>
		</div>
	</header>
);

const mapStateToProps = (state) => ({
	auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
	startLogout: () => dispatch(startLogout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
