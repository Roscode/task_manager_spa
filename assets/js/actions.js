import * as c from './constants';

export const taskList = (tasks) => ({
  type: c.TASK_LIST,
  data: tasks,
});

export const userList = (users) => ({
  type: c.USER_LIST,
  data: users,
});

export const newSession = (session) => ({
  type: c.NEW_SESSION,
  data: session,
});

export const updateFormField = (form, field, value) => ({
  type: c.UPDATE_FORM_FIELD,
  data: {form, field, value},
});

export const logout = () => ({
  type: c.NEW_SESSION,
  data: null,
});

export const editTask = (task) => ({
  type: c.EDIT_TASK,
  data: task
});
