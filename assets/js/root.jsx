import React from 'react';
import ReactDOM from 'react-dom';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import TaskList from './TaskList.jsx';
import UserList from './UserList.jsx';

export default function root_init(node) {
  let tasks = window.tasks;
  ReactDOM.render(<Root tasks={tasks} />, node);
}

const ajaxDefault = {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
}

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: props.tasks
    }
    this.fetch_users();
  }

  fetch_tasks() {
    $.ajax("/api/v1/tasks", {
      ...ajaxDefault,
      success: ({data: tasks}) => this.setState({tasks})
    });
  }

  fetch_users() {
    $.ajax("/api/v1/users", {
      ...ajaxDefault,
      success: ({data: users}) => this.setState({users})
    });
  }

  create_session(username, password) {
    $.ajax("/api/v1/sessions", {
      ...ajaxDefault,
      method: "post",
      data: JSON.stringify({username, password}),
      success: ({data: session}) => this.setState({session})
    });
  }

  render() {
    const {tasks, users} = this.state;
    return (
      <div>
        <Router>
          <div>
            <Header root={this}/>
            <Route path="/" exact={true} render={() => <TaskList tasks={tasks}/>}/>
            <Route path="/users" exact={true} render={() => <UserList users={users}/>}/>
          </div>
        </Router>
      </div>);
  }
}

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
