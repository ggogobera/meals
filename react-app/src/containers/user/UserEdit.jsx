import React from 'react';
import { connect } from 'react-redux';
import { pick } from 'ramda';

import { updateUser, getUsers } from '../../store/users/actions';
import { setSnackbar } from '../../store/ui/actions';
import { ROUTES, ROLES } from '../../constants';
import userCredentialsValidation from '../../utils/userCredentialsValidation';
import UserCredentials from './UserCredentials';

class UserEdit extends React.Component {
  state = {
    isBusy: true,
    role: ROLES.Regular,
    userName: '',
    email: '',
    fullName: '',
    password: '',
    errors: {}
  };

  componentDidMount() {
    const onSuccess = res => {
      this.setState({
        isBusy: false,
        ...pick(['userName', 'email', 'fullName', 'role'])(res.data[0])
      });
    };

    const onFailure = errors => {
      this.props.history.push(ROUTES.Users);
      this.props.setSnackbar(errors.message || 'Something went wrong');
    };

    this.props.getUsers({
      id: this.props.match.params.id,
      onSuccess,
      onFailure
    });
  }

  handleCreate = event => {
    event.preventDefault();

    const { isValid, errors } = userCredentialsValidation({
      role: true,
      userName: true,
      email: !!this.state.email,
      password: !!this.state.password
    })(this.state);

    if (!isValid) {
      this.setState({ errors });
    } else {
      this.props.updateUser({
        ...pick(['role', 'userName', 'email', 'fullName', 'password'])(this.state),
        id: this.props.match.params.id,
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
  { updateUser, getUsers, setSnackbar }
)(UserEdit);
