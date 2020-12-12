import { pick } from 'ramda';
import { CALL_API } from '../middlewares/api';
import * as ActionTypes from './types';

/**
 * CREATE
 */
export const addNewMeal = params => ({
  [CALL_API]: {
    types: [
      ActionTypes.CREATE_MEAL_REQUEST,
      ActionTypes.CREATE_MEAL_SUCCESS,
      ActionTypes.CREATE_MEAL_FAILURE
    ],
    endpoint: 'meal',
    method: 'POST',
    body: pick(['userId', 'caption', 'date', 'calories'])(params || {}),
    meta: pick(['onSuccess', 'onFailure'])(params || {})
  }
});

/**
 * READ
 */
export const getMeals = params => ({
  [CALL_API]: {
    types: [
      ActionTypes.READ_MEALS_REQUEST,
      ActionTypes.READ_MEALS_SUCCESS,
      ActionTypes.READ_MEALS_FAILURE
    ],
    endpoint: 'meals',
    body: pick(['userId', 'dateFrom', 'dateTo', 'timeFrom', 'timeTo'])(params || {}),
    meta: pick(['onSuccess', 'onFailure'])(params || {})
  }
});

/**
 * UPDATE
 */
export const updateMeal = params => ({
  [CALL_API]: {
    types: [
      ActionTypes.UPDATE_MEAL_REQUEST,
      ActionTypes.UPDATE_MEAL_SUCCESS,
      ActionTypes.UPDATE_MEAL_FAILURE
    ],
    endpoint: 'meal',
    method: 'PATCH',
    body: pick(['mealId', 'date', 'caption', 'calories'])(params || {}),
    meta: pick(['onSuccess', 'onFailure'])(params || {})
  }
});

/**
 * DELETE
 */
export const deleteMeal = params => ({
  [CALL_API]: {
    types: [
      ActionTypes.DELETE_MEAL_REQUEST,
      ActionTypes.DELETE_MEAL_SUCCESS,
      ActionTypes.DELETE_MEAL_FAILURE
    ],
    endpoint: 'meal',
    method: 'DELETE',
    body: pick(['userId', 'mealId'])(params || {}),
    meta: pick(['onSuccess', 'onFailure'])(params || {})
  }
});
