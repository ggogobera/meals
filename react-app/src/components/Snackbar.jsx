import React from 'react';
import { connect } from 'react-redux';
import MSnackbar from '@material-ui/core/Snackbar';
import { resetSnackbar } from '../store/ui/actions';

const Snackbar = ({ message, resetSnackbar }) => (
  <MSnackbar
    key={new Date().getTime()}
    open={!!message}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    onClose={resetSnackbar}
    message={message}
    autoHideDuration={3 * 1000}
  />
);

export default connect(
  ({ ui }) => ({ message: ui.snackbar.message }),
  { resetSnackbar }
)(Snackbar);
