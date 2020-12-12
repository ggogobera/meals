import * as ActionTypes from './types';

const initialState = {
  snackbar: { message: null }
};

export default function uiReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SET_SNACKBAR:
      return { ...state, snackbar: { message: action.message } };

    case ActionTypes.RESET_SNACKBAR:
      return { ...state, snackbar: { message: null } };

    default:
      return state;
  }
}
