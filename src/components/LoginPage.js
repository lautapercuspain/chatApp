import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';
/***
* Render Login Page component.
* @param {startLogin} Function handler for starting the login process.
***/
export const LoginPage = ({ startLogin }) => (
  <div className="box-layout">
    <div className="box-layout__box">
      <h1 className="box-layout__title">Chat App</h1>
      <p>Talk to anyone and create conversation channels</p>
      <button className="login-button" onClick={startLogin}>Login with Github</button>
    </div>
  </div>
);

LoginPage.propTypes = {
  startLogin: React.PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
