import { combineReducers } from 'redux';
import * as c from './constants';

const simpleUpdateReducer = (actionType, initState) =>
  (state = initState, {type, data}) => {
    switch (type) {
      case actionType:
        return data;
      default:
        return state;
    }
}

const tasks = simpleUpdateReducer(c.TASK_LIST, []);
const users = simpleUpdateReducer(c.USER_LIST, []);
const session = simpleUpdateReducer(c.NEW_SESSION, null);

const forms = (state = {}, {type, data}) => {
  switch (type) {
    case c.UPDATE_FORM_FIELD:
      const {form, field, value} = data;
      const newState = {
        ...state,
        [form]: {...state[form], [field]: value}
      };
      return newState;
    case c.EDIT_TASK:
      return {
        ...state,
        [c.TASK_FORM]: data
      };
    default:
      return state
  }
}

export const rootReducer = (state, action) =>
  combineReducers({
    tasks,
    users,
    session,
    forms,
  })(state, action)


export default rootReducer;


