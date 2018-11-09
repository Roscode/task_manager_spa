import { LOGIN_FORM, NEW_SESSION, TASK_LIST, USER_LIST } from './constants';

export const taskList = (tasks) => ({
  type: TASK_LIST,
  data: tasks,
});

export const userList = (users) => ({
  type: USER_LIST,
  data: users,
});

export const newSession = (session) => ({
  type: NEW_SESSION,
  data: session,
});

export const changeUsername = (u) => ({
  type: LOGIN_FORM.CHANGE_USERNAME,
  data: u,
});

export const changePassword = (p) => ({
  type: LOGIN_FORM.CHANGE_PASSWORD,
  data: p,
});

export const logout = () => ({
  type: NEW_SESSION,
  data: null,
});
