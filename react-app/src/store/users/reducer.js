import * as ActionTypes from './types';

const initialState = {
  isBusy: false,
  userIds: []
};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.GET_USERS_REQUEST:
      return { ...state, isBusy: true };

    case ActionTypes.GET_USERS_SUCCESS: {
      if (action.normalize) {
        return {
          ...state,
          isBusy: false,
          userIds: action.response.result.data
        };
      }

      return { ...state, isBusy: false };
    }

    case ActionTypes.GET_USERS_FAILURE:
      return { ...state, isBusy: false };

    default:
      return state;
  }
}
