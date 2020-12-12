import { pick } from 'ramda';
import { CALL_API } from '../middlewares/api';
import Schemas from '../schemas';
import * as ActionTypes from './types';

/**
 * Create User
 */
export const createUser = params => ({
  [CALL_API]: {
    types: [
      ActionTypes.CREATE_USER_REQUEST,
      ActionTypes.CREATE_USER_SUCCESS,
      ActionTypes.CREATE_USER_FAILURE
    ],
    endpoint: 'user',
    method: 'POST',
    body: pick(['userName', 'email', 'fullName', 'role', 'password'])(params || {}),
    meta: pick(['onSuccess', 'onFailure'])(params || {})
  }
});

/**
 * Get Users
 */
export const getUsers = params => ({
  [CALL_API]: {
    types: [
      ActionTypes.GET_USERS_REQUEST,
      ActionTypes.GET_USERS_SUCCESS,
      ActionTypes.GET_USERS_FAILURE
    ],
    endpoint: 'users',
    body: pick(['id'])(params || {}),
    meta: pick(['onSuccess', 'onFailure'])(params || {}),
    schema: params.normalize
      ? {
          data: Schemas.USERS_ARRAY
        }
      : null
  },
  normalize: params.normalize
});

/**
 * Update user
 */
export const updateUser = params => ({
  [CALL_API]: {
    types: [ActionTypes.UPDATE_REQUEST, ActionTypes.UPDATE_SUCCESS, ActionTypes.UPDATE_FAILURE],
    endpoint: 'user',
    method: 'PATCH',
    body: pick(['id', 'userName', 'email', 'fullName', 'dailyCaloriesTarget', 'role', 'password'])(
      params || {}
    ),
    meta: pick(['onSuccess', 'onFailure'])(params || {})
  }
});

/**
 * Delete user
 */
export const deleteUser = params => ({
  [CALL_API]: {
    types: [ActionTypes.DELETE_REQUEST, ActionTypes.DELETE_SUCCESS, ActionTypes.DELETE_FAILURE],
    endpoint: 'user',
    method: 'DELETE',
    body: pick(['id'])(params || {}),
    meta: pick(['onSuccess', 'onFailure'])(params || {})
  }
});
