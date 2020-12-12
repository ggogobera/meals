import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';

import User from '../../components/User';
import { getUsers } from '../../store/users/actions';
import { selectUsers } from '../../store/users/selectors';
import { ROUTES } from '../../constants';

const Wrapper = styled.div`
  .user-create-anchor {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 50px;
    margin: 10px auto;
    padding: 8px 12px;
    border-radius: 8px;
    box-shadow: 0 0 7px rgba(0, 0, 0, 0.2);
  }
`;

class Users extends React.PureComponent {
  componentDidMount() {
    this.props.getUsers({ normalize: true });
  }

  handleUserDelete = () => this.props.getUsers({ normalize: true });

  render() {
    const { users, user: currentUser } = this.props;

    return (
      <Wrapper>
        <Link to={ROUTES.UserCreate} className="user-create-anchor">
          <AddIcon />
        </Link>
        {users.map(user =>
          user._id !== currentUser._id ? (
            <User key={user._id} {...user} onDelete={this.handleUserDelete} />
          ) : null
        )}
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({ users: selectUsers(state), user: state.auth.user });

export default connect(
  mapStateToProps,
  { getUsers }
)(Users);
