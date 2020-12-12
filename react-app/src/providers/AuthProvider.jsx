import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Cookies from 'universal-cookie';

import { getUserInfo } from '../store/auth/actions';
import Loading from '../components/Loading';
import { ROUTES } from '../constants';

const token = new Cookies().get('token');

const AuthContext = React.createContext();

const AuthComponent = ({ getUserInfo, history, ...rest }) => {
  const [state, setState] = React.useState({ isAuthenticated: false, loading: !!token });

  React.useEffect(() => {
    if (token) {
      getUserInfo({
        onSuccess: () => setState({ isAuthenticated: true, loading: false }),
        onFailure: () => {
          setState({ isAuthenticated: false, loading: false });
          history.push(ROUTES.Login);
        }
      });
    }
  }, [getUserInfo, history]);

  if (state.loading) {
    return <Loading delay={700} fullPage />;
  }

  const loginCb = () => {
    setState({ isAuthenticated: true, loading: false });
    history.push(ROUTES.Home);
  };

  const logoutCb = () => {
    setState({ isAuthenticated: false, loading: false });
    history.push(ROUTES.Login);
  };

  const registerCb = () => {
    setState({ isAuthenticated: true, loading: false });
    history.push(ROUTES.Home);
  };

  return (
    <AuthContext.Provider
      {...rest}
      value={{ isAuthenticated: state.isAuthenticated, loginCb, logoutCb, registerCb }}
    />
  );
};

const useAuth = () => React.useContext(AuthContext);

const AuthProvider = withRouter(
  connect(
    null,
    { getUserInfo }
  )(AuthComponent)
);

export { AuthProvider, useAuth };
