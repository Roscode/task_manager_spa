import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import $ from 'jquery';

export default function root_init(node) {
  let tasks = window.tasks;
  ReactDOM.render(<Root tasks={tasks} />, node);
}

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: props.tasks
    }

    // this.fetch_tasks();
  }

  fetch_tasks() {
    $.ajax("/api/v1/tasks", {
      method: "get",
      dataType: "json",
      contenType: "application/json; charset=UTF-8",
      data: "",
      success: (resp) => this.setState({...this.state, tasks: resp.data })
    })
  }

  render() {
    return (
      <div>
        <Header />
        <TaskList tasks={this.state.tasks} />
      </div>);
  }
}

const Header = () => (
  <div className="row my-2 justify-content-between">
    <div className="col-4">
      <h1>Task Manager</h1>
    </div>
    <div className="col-6">
      <div className="form-inline my-2">
        <input type="text" className="form-control" placeholder="username" />
        <input type="password" className="form-control" placeholder="password"/>
        <button className="btn btn-secondary">Login</button>
      </div>
    </div>
  </div>);

const TaskList = ({tasks}) => (
  <div>
    <h2>Tasks</h2>
  <div className="row">
    {_.map(tasks, (task) => <Task key={task.id} {...task} />)}
</div></div>);

const Task = ({title, description, minutes_worked, completed}) => (
  <div className="card col-4">
    <div className="card-body">
      <h3 className="card-title">{title}</h3>
      <p className="card-text">description: {description}<br/>
        time worked: {minutes_worked}<br/>
        completed: {completed ? 'yes' : 'no'}
      </p>
    </div>
  </div>);

