import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { deleteUser } from '../store/users/actions';
import { setSnackbar } from '../store/ui/actions';
import { useRole } from '../providers/RoleProvider';
import Avatar from '../components/Avatar';
import { ROLES } from '../constants';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  max-width: 100%;
  width: 100%;
  min-height: 50px;
  margin: 10px auto;
  padding: 8px 12px;
  border-radius: 8px;
  box-shadow: 0 0 7px rgba(0, 0, 0, 0.2);

  .more-btns {
    align-self: center;

    > button {
      outline: none;
      border: 0;
      background: none;
      cursor: pointer;
    }
  }

  .field {
    position: relative;
    overflow: hidden;
    flex: 25%;
    margin: 0 10px;
    white-space: nowrap;

    &.email {
      flex: 33%;
    }

    span {
      display: block;

      &.field-label {
        margin: 0 0 8px;
        font-weight: bold;
        color: rgba(0, 0, 0, 0.8);
      }
    }
  }

  .avatar {
    width: 50px;
    min-width: 50px;
    height: 50px;
  }

  @media (max-width: 950px) {
    display: block;
    padding: 15px;

    .field {
      margin: 0 0 30px;
      flex: unset;
      white-space: normal;

      .field-label {
        margin: 0 0 2px;
      }
    }

    .more-btns {
      position: absolute;
      top: 15px;
      right: 15px;

      i {
        font-size: 26px;
      }
    }

    .avatar {
      margin: 0 0 35px;
    }
  }
`;

const useStyles = makeStyles(() => ({
  anchorMenuItem: {
    padding: 0
  },
  menuAnchor: {
    display: 'block',
    width: '100%',
    padding: '10px 0',
    textAlign: 'center',
    textDecoration: 'none',
    color: '#000'
  }
}));

const User = ({
  _id: id,
  className,
  userName,
  email,
  fullName,
  dailyCaloriesTarget,
  role: userRole,
  onDelete,
  deleteUser,
  setSnackbar
}) => {
  const role = useRole();
  const classes = useStyles();
  const [deleting, setDeleting] = React.useState(false);
  const [menuAnchor, setMenuAnchor] = React.useState(null);

  const handleMoreClick = event => {
    setMenuAnchor(prevAnchor => (prevAnchor ? null : event.currentTarget));
  };

  const handleClose = () => {
    setMenuAnchor(null);
  };

  const handleDelete = () => {
    if (!deleting) {
      setDeleting(true);

      deleteUser({
        id,
        onSuccess: onDelete,
        onFailure: errors => {
          setDeleting(false);
          setSnackbar(errors.message || 'Something went wrong');
        }
      });
    }
  };

  return (
    <Wrapper className={className || ''}>
      <Avatar name={userName} className="avatar" />

      <div className="userName field">
        <span className="field-label">Username</span>
        <span className="field-value" title={userName}>
          {userName}
        </span>
      </div>

      <div className="email field">
        <span className="field-label">Email</span>
        <span className="field-value" title={email}>
          {email}
        </span>
      </div>

      <div className="fullName field">
        <span className="field-label">Full name</span>
        <span className="field-value" title={fullName}>
          {fullName}
        </span>
      </div>

      <div className="dailyCaloriesTarget field">
        <span className="field-label">Exp. Calories / Day</span>
        <span className="field-value" title={dailyCaloriesTarget}>
          {dailyCaloriesTarget}
        </span>
      </div>

      <div className="role field">
        <span className="field-label">Role</span>
        <span className="field-value" title={userRole}>
          {userRole}
        </span>
      </div>

      <div className="more-btns">
        <button aria-label="More" onClick={handleMoreClick}>
          <i className="material-icons">expand_more</i>
        </button>
        <Menu
          id={`user-${id}-menu`}
          keepMounted
          anchorEl={menuAnchor}
          open={!!menuAnchor}
          onClose={handleClose}
        >
          {role === ROLES.Admin && (
            <MenuItem className={classes.anchorMenuItem}>
              <Link to={`/user/${id}/meals`} className={classes.menuAnchor}>
                MEALS
              </Link>
            </MenuItem>
          )}
          <MenuItem className={classes.anchorMenuItem}>
            <Link to={`/user/${id}/edit`} className={classes.menuAnchor}>
              EDIT
            </Link>
          </MenuItem>
          <MenuItem onClick={handleDelete}>DELETE</MenuItem>
        </Menu>
      </div>
    </Wrapper>
  );
};

export default connect(
  null,
  { deleteUser, setSnackbar }
)(User);
