import * as ActionTypes from './types';

export const setSnackbar = message => dispatch => {
  dispatch(resetSnackbar());

  dispatch({
    type: ActionTypes.SET_SNACKBAR,
    message
  });
};

export const resetSnackbar = () => ({
  type: ActionTypes.RESET_SNACKBAR
});
