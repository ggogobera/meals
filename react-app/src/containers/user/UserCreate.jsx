import React from 'react';
import { connect } from 'react-redux';
import { pick } from 'ramda';

import { createUser } from '../../store/users/actions';
import { setSnackbar } from '../../store/ui/actions';
import { ROUTES, ROLES } from '../../constants';
import userCredentialsValidation from '../../utils/userCredentialsValidation';
import UserCredentials from './UserCredentials';

class UserCreate extends React.Component {
  state = {
    isBusy: false,
    role: ROLES.Regular,
    userName: '',
    email: '',
    fullName: '',
    password: '',
    errors: {}
  };

  handleCreate = event => {
    event.preventDefault();

    const { isValid, errors } = userCredentialsValidation({
      role: true,
      userName: true,
      email: true,
      password: true
    })(this.state);

    if (!isValid) {
      this.setState({ errors });
    } else {
      this.props.createUser({
        ...pick(['role', 'userName', 'email', 'fullName', 'password'])(this.state),
        onSuccess: this.handleSuccess,
        onFailure: this.handleFailure
      });
    }
  };

  handleSuccess = () => {
    this.props.history.push(ROUTES.Users);
    this.props.setSnackbar('Success');
  };

  handleFailure = errors => {
    this.setState({ isBusy: false }, () => {
      this.props.setSnackbar(errors.message || 'Something went wrong');
    });
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState(prevState => ({ [name]: value, errors: { ...prevState.errors, [name]: '' } }));
  };

  render() {
    const { isBusy, ...rest } = this.state;

    return (
      <UserCredentials
        {...rest}
        onChange={this.handleInputChange}
        onSubmit={this.handleCreate}
        submitDisabled={isBusy}
      />
    );
  }
}

export default connect(
  null,
  { createUser, setSnackbar }
)(UserCreate);
