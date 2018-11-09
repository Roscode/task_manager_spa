import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

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

export default connect(s => s)(TaskList);
