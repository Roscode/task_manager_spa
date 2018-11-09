import store from './store';
import { newSession, taskList, userList } from './actions';

const ajaxDefaults = {
  method: "get",
  dataType: "json",
  contentType: "application/json; charset=UTF-8",
  data: "",
};

const get = (path, success) => {
  $.ajax(`/api/v1${path}`, {
      ...ajaxDefaults,
      success,
    });
};

const post = (path, data, success) => {
  $.ajax(`/api/v1${path}`, {
    ...ajaxDefaults,
    method: "post",
    data: JSON.stringify(data),
    success,
  });
};

const session = {
    create: (username, password) => {
      post(
        "/sessions",
        {username, password},
        ({data}) => store.dispatch(newSession(data)))
    },
};

const users = {
    list: () => {
      get("/users", ({data}) => store.dispatch(userList(data)))
    },
    register: (username, password) => {
      post("/users", {user: {username, password}}, ({data}) => {
        return session.create(username, password);
      });
    }
};

const tasks = {
    list: () => get("/tasks", ({data}) => store.dispatch(taskList(data)))
};

const api = {
  tasks,
  users,
  session,
};

export default api;
