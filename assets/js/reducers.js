import { combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';
import {LOGIN_FORM, USER_LIST, TASK_LIST, NEW_SESSION} from './constants';

const simpleUpdateReducer = (actionType, initState) =>
  (state = initState, {type, data}) => {
    switch (type) {
      case actionType:
        return data;
      default:
        return state;
    }
}

const tasks = simpleUpdateReducer(TASK_LIST, []);
const users = simpleUpdateReducer(USER_LIST, []);
const session = simpleUpdateReducer(NEW_SESSION, null);
const login = (state = {username: "", password: ""}, {type, data}) => {
  switch (type) {
    case LOGIN_FORM.CHANGE_USERNAME:
      return {...state, username: data};
    case LOGIN_FORM.CHANGE_PASSWORD:
      return {...state, password: data};
    case NEW_SESSION:
      return {username: "", password: ""};
    default:
      return state;
  }
}

export const rootReducer = (state, action) =>
  deepFreeze(
    combineReducers({
      tasks,
      users,
      session,
      forms: combineReducers({
        login
      }),
    })(state, action))


export default rootReducer;


