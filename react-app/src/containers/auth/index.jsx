import React from 'react';
import styled from 'styled-components';
import { Switch, Route, Redirect } from 'react-router-dom';

import { ROUTES } from '../../constants';
import Login from './Login';
import RegisterView from './Register';

const Wrapper = styled.section`
  margin: 20px auto 0;
  padding: 20px;
  opacity: 0;
  animation: 0.4s fadeIn ease-out forwards;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .box {
    display: flex;
    max-width: 450px;
    width: 100%;
    min-height: 700px;
    margin: 0 auto;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.05);
  }
`;

const Register = () => (
  <Wrapper>
    <div className="box">
      <Switch>
        <Redirect exact from={ROUTES.Auth} to={ROUTES.Login} />
        <Route path={ROUTES.Login} component={Login} />
        <Route path={ROUTES.Register} component={RegisterView} />
        <Redirect to="/oops" />
      </Switch>
    </div>
  </Wrapper>
);

export default Register;
