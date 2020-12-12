import { combineReducers } from 'redux';

import authReducer from './auth/reducer';
import mealsReducer from './meals/reducer';
import usersReducer from './users/reducer';
import uiReducer from './ui/reducer';

const entities = (state = {}, action) => {
  if (action.response && action.response.entities) {
    return Object.assign({}, state, action.response.entities);
  }

  return state;
};

export default combineReducers({
  auth: authReducer,
  entities,
  meals: mealsReducer,
  users: usersReducer,
  ui: uiReducer
});
