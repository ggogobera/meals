import Cookies from 'universal-cookie';
import { normalize } from 'normalizr';
import { isNil } from 'ramda';
import config from '../../config';

const cookies = new Cookies();

const defaultHeaders = {
  'Content-Type': 'application/json',
  lang: 'en-US'
};

async function callApi(endpoint, schema, method, headers = {}, body, meta) {
  const token = cookies.get('token');

  let init = {
    method,
    credentials: 'include',
    headers: {
      ...defaultHeaders,
      ...headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }
  };

  let query = '';

  if (body) {
    Object.keys(body).forEach(key => {
      if (isNil(body[key])) delete body[key];
    });
  }

  if (body && init.headers['Content-Type'] === 'application/json') {
    init = { ...init, body: JSON.stringify(body) };
  } else if (body) {
    init = { ...init, body };
  }

  if (method === 'GET' && body) {
    query = Object.keys(body)
      .map(key => `${key}=${encodeURIComponent(body[key])}`)
      .join('&');
    if (query) {
      query = `?${query}`;
    }
    delete init.body;
  }

  const BASE_URL = process.env.BASE_URL || config.BASE_URL;

  const response = await fetch(`${BASE_URL}/api/${endpoint}${query}`, init).catch(e => {
    console.log(e);
    throw new Error('Internal server error');
  });

  try {
    const json = await response.json();

    if (response.status === 401) {
      return {
        responseError: { message: 'Unauthorized', status: 401 }
      };
    }

    if (!response.ok) {
      return {
        responseError: Object.assign(json, { status: response.status })
      };
    }

    return {
      response: schema ? Object.assign({}, normalize(json, schema)) : json
    };
  } catch (err) {
    return {
      responseError: { message: err, status: response.status }
    };
  }
}

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('Call API');

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => async action => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  let { endpoint } = callAPI;
  const { schema, types, body, headers, meta } = callAPI;
  const method = callAPI.method || 'GET';

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }

  if (!types.every(t => typeof t === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  }

  const [requestType, successType, failureType] = types;
  next(actionWith({ type: requestType }));

  try {
    const { response, responseError } = await callApi(
      endpoint,
      schema,
      method,
      headers,
      body,
      meta
    );

    if (response) {
      // ############## SUCCESS ############## //
      next(actionWith({ type: successType, response }));
      if (meta && meta.onSuccess) meta.onSuccess(response);
      // ############## ::/SUCCESS ############## //
    } else if (responseError) {
      // ############## FAILURE ############## //
      next(
        actionWith({
          type: failureType,
          errors: responseError || { message: 'Something went wrong' },
          status: responseError.status,
          data: responseError.data
        })
      );

      if (meta && meta.onFailure) {
        meta.onFailure(responseError);
      }
      // ############## ::/FAILURE ############## //
    }
  } catch (error) {
    // ############## FAILURE ############## //
    next(
      actionWith({ type: failureType, errors: { message: 'Something went wrong' }, status: 500 })
    );
    if (meta.onFailure) {
      meta.onFailure({ errors: { message: 'Something went wrong' }, status: 500 });
    }
    // ############## ::/FAILURE ############## //
  }

  if (meta && meta.callback) {
    meta.callback();
  }

  return true;
};
