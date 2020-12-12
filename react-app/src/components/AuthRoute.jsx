import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';

const AuthRoute = ({ component: Component, isPrivate, newPath, location, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      render={props =>
        isPrivate ? (
          isAuthenticated ? (
            <Component {...props} {...rest} />
          ) : (
            <Redirect to={{ pathname: newPath, state: { from: location } }} />
          )
        ) : !isAuthenticated ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to={{ pathname: newPath, state: { from: location } }} />
        )
      }
    />
  );
};

export default AuthRoute;
