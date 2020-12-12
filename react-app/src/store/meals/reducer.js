import * as ActionTypes from './types';

const initialState = {
  isBusy: false,
  currentlyAddedMeal: null,
  currentlyDeletedMeal: null
};

export default function mealsReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.CREATE_MEAL_REQUEST:
    case ActionTypes.DELETE_MEAL_REQUEST:
      return { ...state, isBusy: true };

    case ActionTypes.CREATE_MEAL_SUCCESS:
      return { ...state, isBusy: false, currentlyAddedMeal: action.response.data };

    case ActionTypes.DELETE_MEAL_SUCCESS:
      return { ...state, isBusy: false, currentlyDeletedMeal: action.response.data };

    case ActionTypes.CREATE_MEAL_FAILURE:
    case ActionTypes.DELETE_MEAL_FAILURE:
      return { ...state, isBusy: false };

    default:
      return state;
  }
}
