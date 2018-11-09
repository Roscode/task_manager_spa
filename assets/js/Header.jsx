import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({root}) => (
  <div className="row my-2 justify-content-between">
    <div className="col-4">
      <h1><Link to={"/"} onClick={root.fetch_tasks.bind(root)}>Task Manager</Link></h1>
    </div>
    <div className="col-2">
      <p><Link to={"/users"} onClick={root.fetch_users.bind(root)}>Users</Link></p>
    </div>
    <div className="col-6">
      <div className="form-inline my-2">
        <input type="text" className="form-control" placeholder="username" />
        <input type="password" className="form-control" placeholder="password"/>
        <button className="btn btn-secondary">Login</button>
      </div>
    </div>
  </div>);

export default Header;
