import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const RoleRoute = ({ component: Component, allowed, newPath, user, location, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      allowed && !!user && allowed.includes(user.role) ? (
        <Component {...props} {...rest} />
      ) : (
        <Redirect to={{ pathname: newPath, state: { from: location } }} />
      )
    }
  />
);

const mapStateToProps = ({ auth }) => ({ user: auth.user });

export default connect(mapStateToProps)(React.memo(RoleRoute));
