import React from 'react';
import { Link, withRouter, matchPath } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { ROUTES } from '../../constants';

const UnauthenticatedMenu = ({ location }) => {
  const isLoginPage = !!matchPath(location.pathname, {
    path: ROUTES.Login
  });

  return (
    <div>
      {isLoginPage ? (
        <Link to={ROUTES.Register} style={{ color: '#fff', textDecoration: 'none' }}>
          <Button color="inherit">REGISTER</Button>
        </Link>
      ) : (
        <Link to={ROUTES.Login} style={{ color: '#fff', textDecoration: 'none' }}>
          <Button color="inherit">LOGIN</Button>
        </Link>
      )}
    </div>
  );
};

export default withRouter(UnauthenticatedMenu);
