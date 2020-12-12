import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';

import { getUserInfo } from '../../store/auth/actions';
import { updateUser } from '../../store/users/actions';
import { setSnackbar } from '../../store/ui/actions';
import Avatar from '../../components/Avatar';
import isAlphanumeric from '../../utils/isAlphanumeric';
import isValidEmail from '../../utils/isValidEmail';
import UserName from './UserName';
import FullName from './FullName';
import Email from './Email';
import DailyCaloriesTarget from './DailyCaloriesTarget';

const Wrapper = styled.div`
  max-width: 400px;
  width: 100%;
  margin: 30px auto 0;

  .avatar {
    margin: 0 auto 40px;
  }

  .form-field {
    margin: 0 auto 35px;
  }

  .blur {
    filter: blur(2px);
  }

  .submit-container {
    margin: 60px 0 0;

    button {
      width: 100%;
    }
  }

  .MuiFormHelperText-root.Mui-error {
    position: absolute;
    bottom: -20px;
  }

  @media (max-width: 500px) {
    padding: 0 20px;
  }
`;

const getCredential = name => user => (user && user[name]) || '';

class Profile extends React.PureComponent {
  state = {
    isBusy: true,
    fullName: getCredential('fullName')(this.props.user),
    userName: getCredential('userName')(this.props.user),
    email: getCredential('email')(this.props.user),
    dailyCaloriesTarget: getCredential('dailyCaloriesTarget')(this.props.user) || 1,
    errors: {}
  };

  componentDidMount() {
    this.fetchCurrentUser();
  }

  fetchCurrentUser = () => {
    this.props.getUserInfo({
      onSuccess: () => this.setState({ isBusy: false }),
      onFailure: () => {
        this.setState({ isBusy: false }, () => {
          this.props.setSnackbar('Error during fetching user. Please refresh the page');
        });
      }
    });
  };

  handleInputChange = event => {
    const { name, value } = event.target;

    if (name === 'dailyCaloriesTarget') {
      return this.setState(prevState => ({
        [name]: value && value < 0 ? 1 : value,
        errors: { ...prevState.errors, [name]: '' }
      }));
    }

    this.setState(prevState => ({
      [name]: value,
      errors: { ...prevState.errors, [name]: '' }
    }));
  };

  handleSubmit = event => {
    event.preventDefault();

    const { userName, email, dailyCaloriesTarget } = this.state;

    if (!userName) {
      return this.setState({
        errors: {
          userName: !userName ? 'Required' : ''
        }
      });
    }

    const isUserNameAlphanumeric = isAlphanumeric(userName);
    const emailValid = isValidEmail(email);

    if (!isUserNameAlphanumeric || (email && !emailValid) || dailyCaloriesTarget < 1) {
      return this.setState({
        errors: {
          userName: !isUserNameAlphanumeric ? 'Use only alphanumeric username [A, a, 0-9]' : '',
          email: !emailValid ? 'Email is invalid' : '',
          dailyCaloriesTarget:
            dailyCaloriesTarget < 1 ? 'Expected calories must be greater than zero' : ''
        }
      });
    }

    this.setState({ isBusy: true }, () => {
      this.props.updateUser({
        id: this.props.user._id,
        userName,
        fullName: this.state.fullName,
        email,
        dailyCaloriesTarget: +dailyCaloriesTarget,
        onSuccess: this.fetchCurrentUser,
        onFailure: errors => {
          this.setState({ isBusy: false }, () => {
            this.props.setSnackbar(errors.message || 'Something went wrong');
          });
        }
      });
    });
  };

  render() {
    const { isBusy, fullName, dailyCaloriesTarget, userName, email, errors } = this.state;

    return (
      <Wrapper>
        <div className={classNames({ blur: isBusy })}>
          <Avatar name={userName} className="avatar" />
        </div>

        <form onSubmit={this.handleSubmit}>
          <div className={classNames('form-field', { blur: isBusy })}>
            <UserName value={userName} error={errors.userName} onChange={this.handleInputChange} />
          </div>

          <div className={classNames('form-field', { blur: isBusy })}>
            <FullName value={fullName} onChange={this.handleInputChange} />
          </div>

          <div className={classNames('form-field', { blur: isBusy })}>
            <Email value={email} error={errors.email} onChange={this.handleInputChange} />
          </div>

          <div className={classNames('form-field', { blur: isBusy })}>
            <DailyCaloriesTarget
              value={dailyCaloriesTarget}
              error={errors.dailyCaloriesTarget}
              onChange={this.handleInputChange}
            />
          </div>

          <div className={classNames('submit-container', { blur: isBusy })}>
            <Button color="primary" type="submit" variant="contained" disabled={isBusy}>
              SAVE
            </Button>
          </div>
        </form>
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ user: auth.user });

export default connect(
  mapStateToProps,
  { getUserInfo, updateUser, setSnackbar }
)(Profile);
