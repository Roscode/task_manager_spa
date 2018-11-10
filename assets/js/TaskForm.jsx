import React from "react";
import { connect } from "react-redux";
import { updateFormField } from './actions';
import { TASK_FORM } from './constants';
import api from './api';


class TaskForm extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadTask()
  }

  render(){
    const {
      users = [],
      session = null,
      assignee_id = null,
      title = "",
      description = "",
      minutes_worked = 0,
      completed = false,
      updateField,
      onSubmit} = this.props;

    return (
      <form onSubmit={(e) => {e.preventDefault(); onSubmit();}}className="col-6">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input value={title}
            onChange={({target: {value}}) => updateField('title', value)}
            id="title"
            type="text"
            className="form-control"
            placeholder="Task Title"></input>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea value={description}
            onChange={({target: {value}}) => updateField('description', value)}
            className="form-control"
            id="description"
            rows="5"></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="minutes_worked">Minutes Worked</label>
          <input value={minutes_worked}
            disabled={!(session && assignee_id === session.id)}
            onChange={({target: {value}}) => updateField('minutes_worked', value)}
            type="number"
            step="15"
            className="form-control"
            id="minutes_worked"></input>
        </div>
        <div className="form-check my-2">
          <input value={completed}
            onChange={({target: {value}}) => updateField('completed', value)}
            type="checkbox"
            className="form-check-input"
            id="completed"></input>
          <label className="form-check-label" htmlFor="completed">Completed</label>
        </div>
        <div className="form-group-inline d-flex flex-row">
          <label htmlFor="assignee">Assigned To:</label>
          <div className="input-group mx-2">
            <select value={assignee_id || ""} onChange={({target: {value}}) => 
                console.log(value) || updateField('assignee_id', value)}>
              <option>Assign</option>
              {_.map(users, ({id, username}) => (
                <option key={id} value={id}>{username}</option>
              ))}
            </select>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Save</button>
      </form>);
  }
}

export default connect(
  (state, {task_id}) => (
  ({session, users, forms: {[TASK_FORM]: form}}) => ({
    ...form,
    users,
    session,
    onSubmit: () => api.tasks.upsert(form),
    loadTask: () => api.tasks.edit(task_id)
  }))(state),
  dispatch => ({
    updateField: (field, val) => dispatch(updateFormField(TASK_FORM, field, val))
  }))(TaskForm);
