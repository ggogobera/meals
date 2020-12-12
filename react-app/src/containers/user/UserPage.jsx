import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { getUsers } from '../../store/users/actions';
import User from '../../components/User';
import Loading from '../../components/Loading';
import { ROUTES } from '../../constants';

const Wrapper = styled.div`
  padding: 20px 0 0;
  text-align: ${({ isBusy }) => (isBusy ? 'center' : 'initial')};

  > svg {
    margin: 150px auto 0;
    width: 80px;
    height: 80px;
  }
`;

class UserPage extends React.PureComponent {
  state = {
    isBusy: true,
    user: null
  };

  componentDidMount() {
    this.props.getUsers({
      id: this.props.match.params.id,
      onSuccess: res => this.setState({ isBusy: false, user: res.data[0] }),
      onFailure: () => this.props.history.push(ROUTES.Users)
    });
  }

  render() {
    const { isBusy, user } = this.state;

    if (isBusy) {
      return (
        <Wrapper isBusy>
          <Loading delay={700} />
        </Wrapper>
      );
    }

    return (
      <Wrapper>
        <User {...user} />
      </Wrapper>
    );
  }
}

export default connect(
  null,
  { getUsers }
)(UserPage);
