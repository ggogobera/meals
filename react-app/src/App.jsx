import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import { handleUnauthorized } from './store/auth/actions';
import { setSnackbar } from './store/ui/actions';
import PageTitle from './components/PageTitle';
import { useAuth } from './providers/AuthProvider';
import AuthRoute from './components/AuthRoute';
import RoleRoute from './components/RoleRoute';
import Snackbar from './components/Snackbar';
import Header from './containers/header';
import Home from './containers/home';
import { ROUTES, ROLES } from './constants';
import { AsyncAuth, AsyncProfile, AsyncUsers, AsyncUser } from './containers';

const App = ({ handleUnauthorized, setSnackbar, dispatchUnauthorized }) => {
  const { logoutCb } = useAuth();

  React.useEffect(() => {
    if (dispatchUnauthorized) {
      logoutCb();
      handleUnauthorized();
      setSnackbar('Unauthorized request or token expired');
    }
  }, [handleUnauthorized, logoutCb, setSnackbar, dispatchUnauthorized]);

  return (
    <>
      <Header />
      <div className="container">
        <PageTitle />
        <Switch>
          <AuthRoute exact isPrivate path={ROUTES.Home} newPath={ROUTES.Login} component={Home} />
          <AuthRoute path={ROUTES.Auth} newPath={ROUTES.Home} component={AsyncAuth} />
          <AuthRoute
            isPrivate
            path={ROUTES.Profile}
            newPath={ROUTES.Login}
            component={AsyncProfile}
          />
          <RoleRoute
            allowed={[ROLES.Admin, ROLES.Moderator]}
            path={ROUTES.Users}
            newPath="/404"
            component={AsyncUsers}
          />
          <RoleRoute
            allowed={[ROLES.Admin, ROLES.Moderator]}
            path={ROUTES.User}
            newPath="/404"
            component={AsyncUser}
          />
          <Route component={() => null} />
        </Switch>
      </div>
      <Snackbar />
    </>
  );
};

const mapStateToProps = ({ auth }) => ({ dispatchUnauthorized: auth.dispatchUnauthorized });

export default connect(
  mapStateToProps,
  { handleUnauthorized, setSnackbar }
)(React.memo(App));
