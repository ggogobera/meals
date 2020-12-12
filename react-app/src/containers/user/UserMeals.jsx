import React from 'react';
import { connect } from 'react-redux';

import UserMeals from '../../components/user-meals';
import Loading from '../../components/Loading';
import { getUsers } from '../../store/users/actions';
import { setSnackbar } from '../../store/ui/actions';
import { ROUTES } from '../../constants';

class UserMealsComponent extends React.PureComponent {
  state = {
    isBusy: true,
    user: null
  };

  componentDidMount() {
    this.props.getUsers({
      id: this.props.match.params.id,
      onSuccess: res => this.setState({ isBusy: false, user: res.data[0] }),
      onFailure: errors => {
        this.props.history.push(ROUTES.Users);
        this.props.setSnackbar(errors.message || 'Something went wrong');
      }
    });
  }

  render() {
    const { isBusy, user } = this.state;

    if (isBusy) return <Loading delay={700} />;

    return <UserMeals {...user} />;
  }
}

export default connect(
  null,
  { getUsers, setSnackbar }
)(UserMealsComponent);
