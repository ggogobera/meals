import { pick } from 'ramda';
import { CALL_API } from '../middlewares/api';
import * as ActionTypes from './types';

/**
 * Get User Info
 */
export const getUserInfo = params => ({
  [CALL_API]: {
    types: [
      ActionTypes.GET_USER_INFO_REQUEST,
      ActionTypes.GET_USER_INFO_SUCCESS,
      ActionTypes.GET_USER_INFO_FAILURE
    ],
    endpoint: 'user/current',
    meta: pick(['onSuccess', 'onFailure'])(params || {})
  }
});

/**
 * LOGIN
 */
export const login = params => ({
  [CALL_API]: {
    types: [ActionTypes.LOGIN_REQUEST, ActionTypes.LOGIN_SUCCESS, ActionTypes.LOGIN_FAILURE],
    endpoint: 'login',
    method: 'POST',
    body: pick(['userName', 'password'])(params || {}),
    meta: pick(['onSuccess', 'onFailure'])(params || {})
  }
});

/**
 * LOGOUT
 */
export const logout = params => ({
  [CALL_API]: {
    types: [ActionTypes.LOGOUT_REQUEST, ActionTypes.LOGOUT_SUCCESS, ActionTypes.LOGOUT_FAILURE],
    endpoint: 'logout',
    method: 'POST',
    meta: pick(['onSuccess', 'onFailure'])(params || {})
  }
});

/**
 * REGISTER
 */
export const register = params => ({
  [CALL_API]: {
    types: [
      ActionTypes.REGISTER_REQUEST,
      ActionTypes.REGISTER_SUCCESS,
      ActionTypes.REGISTER_FAILURE
    ],
    endpoint: 'register',
    method: 'POST',
    body: pick(['email', 'userName', 'fullName', 'password', 'confirmPassword'])(params || {}),
    meta: pick(['onSuccess', 'onFailure'])(params || {})
  }
});

/**
 * 401
 */
export const handleUnauthorized = () => ({
  type: ActionTypes.HANDLE_UNAUTHORIZED
});
