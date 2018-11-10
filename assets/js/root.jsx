import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import TaskList from './TaskList.jsx';
import TaskForm from './TaskForm.jsx';
import UserList from './UserList.jsx';
import LoginForm from './LoginForm.jsx';
import api from './api';

export default function root_init(node, store) {
  ReactDOM.render(
    <Provider store={store}>
      <Root tasks={window.tasks} />
    </Provider>, node);
}

const Header = () => (
  <div className="row my-2 justify-content-between">
    <div className="col-4">
      <h1><Link to={"/"} onClick={api.tasks.list}>Task Manager</Link></h1>
    </div>
    <div className="col-2">
      <p><Link to={"/users"} onClick={api.users.list}>Users</Link></p>
    </div>
    <LoginForm />
  </div>);


class Root extends React.Component {
  constructor(props) {
    super(props);
    api.tasks.list();
    api.users.list();
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <Header root={this}/>
            <Route path="/" exact={true} render={() => <TaskList />}/>
            <Route path="/users" exact={true} render={() => <UserList />}/>
            <Route path="/tasks/:task_id" render={({match: {params: {task_id}}}) => <TaskForm task_id={task_id}/>}/>
          </div>
        </Router>
      </div>);
  }
}
