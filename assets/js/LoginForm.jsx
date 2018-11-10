import React from 'react';
import api from './api';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateFormField, logout } from './actions';
import { LOGIN_FORM } from './constants';

const LogoutButton = ({onClick, user}) => (
  <div className="col-4">
    <h3>Welcome: <strong>{user ? user.username : ""}</strong></h3>
    <button onClick={onClick} className="btn btn-secondary">Logout</button>
  </div>);

const LoginForm = ({
  session,
  onLogout,
  username,
  password,
  onLogin,
  onRegister,
  user,
  updateField,
}) => session ? console.log(session, user) || (<LogoutButton onClick={onLogout} user={user} />) : (
  <div className="col-6">
    <form onSubmit={(e) => {e.preventDefault(); onLogin();}}>
    <div className="form-inline flex-row-reverse my-2">
      <div className="input-group">
        <input
          onChange={({target: {value}}) => updateField('username', value)}
          value={username}
          type="text"
          className="form-control"
          placeholder="username" />
        <input
          onChange={({target: {value}}) => updateField('password', value)}
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
  ({session, users,  forms: {[LOGIN_FORM]: form}}) => ({
    ...form,
    session,
    onLogin: () => api.session.create(form.username, form.password),
    onRegister: () => api.users.register(form.username, form.password),
    user: _.find(users, (u) => session && session.user_id === u.id)
  }),
  dispatch => ({
    updateField: (field, val) => dispatch(updateFormField(LOGIN_FORM, field, val)),
    onLogout: () => dispatch(logout()),
  }))(LoginForm);
