import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';

import { useAuth } from '../../providers/AuthProvider';
import { logout } from '../../store/auth/actions';
import { ROUTES } from '../../constants';

const useStyles = makeStyles(() => ({
  menuItem: {
    padding: '0'
  },
  anchor: {
    display: 'block',
    width: '100%',
    padding: '10px 0',
    textAlign: 'center',
    textDecoration: 'none',
    color: '#000'
  }
}));

const AuthenticatedMenu = ({ user, logout, history }) => {
  const auth = useAuth();
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = !!anchorEl;

  const handleMenuOpen = event => setAnchorEl(event.currentTarget);

  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    logout({ onSuccess: auth.logoutCb });
  };

  return (
    <div>
      <IconButton
        aria-label="Account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenuOpen}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={open}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose} className={classes.menuItem}>
          <Link to={ROUTES.Profile} className={classes.anchor}>
            PROFILE
          </Link>
        </MenuItem>
        <MenuItem onClick={handleLogout}>LOG OUT</MenuItem>
      </Menu>
    </div>
  );
};

export default withRouter(
  connect(
    null,
    { logout }
  )(AuthenticatedMenu)
);
