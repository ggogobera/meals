import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { getUsers } from '../store/users/actions';
import { setSnackbar } from '../store/ui/actions';
import Loading from './Loading';

const Wrapper = styled.div`
  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

class UserEdit extends React.PureComponent {
  state = {
    user: null
  };

  componentDidMount() {
    this.props.getUsers({
      id: this.props.userId,
      onSuccess: res => this.setState({ user: res.data[0] }),
      onFailure: errors => this.props.setSnackbar(errors.message || 'Something went wrong')
    });
  }

  render() {
    const { user } = this.state;

    if (!user) {
      return (
        <Wrapper className="loading">
          <Loading delay={700} />
        </Wrapper>
      );
    }

    return <Wrapper></Wrapper>;
  }
}

export default connect(
  null,
  { getUsers, setSnackbar }
)(UserEdit);
