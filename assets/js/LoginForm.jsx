import React from 'react';
import api from './api';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout, changeUsername, changePassword } from './actions';

const LogoutButton = ({onClick}) => (
  <div>
    <p>name here?</p>
    <button onClick={onClick} className="btn btn-secondary">Logout</button>
  </div>);

const LoginForm = ({
  session,
  onChangeUsername,
  onChangePassword,
  onLogout,
  username,
  password,
  onLogin,
  onRegister,
}) => session ? (<LogoutButton onClick={onLogout} />) : (
  <div className="col-6">
    <form onSubmit={(e) => {e.preventDefault(); onLogin();}}>
    <div className="form-inline flex-row-reverse my-2">
      <div className="input-group">
        <input
          onChange={({target: {value}}) => onChangeUsername(value)}
          value={username}
          type="text"
          className="form-control"
          placeholder="username" />
        <input
          onChange={({target: {value}}) => onChangePassword(value)}
          value={password}
          type="password"
          className="form-control"
          placeholder="password"/>
      </div>
      <div className="input-group">
        <button type="submit" className="btn btn-primary">Login</button>
        <button onClick={(e) => { e.preventDefault(); onRegister();}} className="btn btn-secondary">Register</button>
      </div>
    </div>
  </form>
  </div>
 )

export default connect(
  ({session, forms: {login: {username, password}}}) => ({
    username,
    password,
    session,
    onLogin: () => api.session.create(username, password),
    onRegister: () => api.users.register(username, password)
  }),
  dispatch => ({
    onChangeUsername: (val) => dispatch(changeUsername(val)),
    onChangePassword: (val) => dispatch(changePassword(val)),
    onLogout: () => dispatch(logout()),
  }))(LoginForm);
