import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { editTask } from './actions';
import TaskForm from './TaskForm';

const TaskList = ({users, tasks, editTask}) => (
  <div>
    <h2>Tasks</h2>
    <Link to={"/task/new"} className="btn btn-primary mb-2">
      New Task
    </Link>
  <div className="row">
    {_.map(_.sortBy(tasks, 'title'), (task) => <Task key={task.id} editTask={editTask} task={task} users={users}/>)}
</div></div>);

const Task = ({users, task: {assignee_id, title, description, minutes_worked, completed, id}, editTask}) => {
  return (
    <div className="card col-4">
      <div className="card-body">
        <h3 className="card-title">
          <Link to={`/tasks/${id}`} >{title}</Link></h3>
        <p className="card-text">description: {description}<br/>
          time worked: {minutes_worked}<br/>
          completed: {completed ? 'yes' : 'no'}<br/>
          assigned to: {_.find(users, ['id', assignee_id]) ? _.find(users, ['id', assignee_id]).username : ""}
        </p>
      </div>
    </div>)
};

export default connect(
  s => s,
)(TaskList);
