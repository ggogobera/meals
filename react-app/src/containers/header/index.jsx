import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import HomeIcon from '@material-ui/icons/Home';

import { ROUTES } from '../../constants';
import AuthenticatedMenu from './AuthenticatedMenu';
import UnauthenticatedMenu from './UnauthenticatedMenu';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  anchor: {
    display: 'flex',
    alignItems: 'center',
    margin: '0 25px 0 0',
    padding: '5px 8px',
    color: '#fff',
    textDecoration: 'none',
    opacity: '0.7',
    fontWeight: '500',
    '&.active': {
      opacity: 1
    }
  },
  userPanel: {
    margin: '0 0 0 auto'
  }
}));

const Header = ({ user }) => {
  const classes = useStyles();

  const isAuthenticated = !!user;
  const isModerator = user && user.role === 'moderator';
  const isAdmin = user && user.role === 'admin';

  return (
    <AppBar position="sticky">
      <div className="container">
        <Toolbar className={classes.root}>
          <NavLink exact to={ROUTES.Home} className={classes.anchor}>
            <HomeIcon />
          </NavLink>

          {(isModerator || isAdmin) && (
            <NavLink to={ROUTES.Users} className={classes.anchor}>
              USERS
            </NavLink>
          )}

          <div className={classes.userPanel}>
            {isAuthenticated ? <AuthenticatedMenu user={user} /> : <UnauthenticatedMenu />}
          </div>
        </Toolbar>
      </div>
    </AppBar>
  );
};

const mapStateToProps = ({ auth }) => ({ user: auth.user });

export default connect(mapStateToProps)(Header);
