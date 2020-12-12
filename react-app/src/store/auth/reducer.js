import * as ActionTypes from './types';

const initialState = {
  isBusy: false,
  user: null,
  dispatchUnauthorized: false
};

export default function authReducer(state = initialState, action) {
  if (action.status && action.status === 401) {
    return { ...state, dispatchUnauthorized: true };
  }

  switch (action.type) {
    case ActionTypes.LOGIN_REQUEST:
    case ActionTypes.LOGOUT_REQUEST:
    case ActionTypes.REGISTER_REQUEST:
    case ActionTypes.GET_USER_INFO_REQUEST:
      return { ...state, isBusy: true };

    case ActionTypes.LOGIN_SUCCESS:
      return { ...state, isBusy: false, user: action.response.data };

    case ActionTypes.LOGOUT_SUCCESS:
      return { ...state, isBusy: false, user: null };

    case ActionTypes.GET_USER_INFO_SUCCESS:
      return { ...state, isBusy: false, user: action.response.data };

    case ActionTypes.REGISTER_SUCCESS:
      return { ...state, isBusy: false, user: action.response.data };

    case ActionTypes.LOGIN_FAILURE:
    case ActionTypes.LOGOUT_FAILURE:
    case ActionTypes.REGISTER_FAILURE:
    case ActionTypes.GET_USER_INFO_FAILURE:
      return { ...state, isBusy: false };

    case ActionTypes.HANDLE_UNAUTHORIZED:
      return initialState;

    default:
      return state;
  }
}
