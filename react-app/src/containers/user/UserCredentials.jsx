import React from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import { ROLES } from '../../constants';

const Wrapper = styled.div`
  display: flex;
  max-width: 450px;
  width: 100%;
  margin: 0 auto;
  padding: 35px 50px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.05);

  .submit-container {
    margin: 30px auto 0;
    text-align: center;
  }

  .MuiFormHelperText-root {
    position: absolute;
    bottom: -20px;
  }

  .password-helper {
    color: rgb(184, 107, 0);

    &.Mui-error {
      color: rgb(244, 67, 54);
    }
  }

  @media (max-width: 500px) {
    padding: 20px 30px;

    .password-helper {
      bottom: -30px;
    }
  }
`;

const useStyles = makeStyles(theme => ({
  formField: { margin: '0 auto 25px' },
  submitBtn: { width: '200px' },
  adornmentBtn: { padding: 0 }
}));

const UserCredentials = ({
  onSubmit,
  submitDisabled,
  onChange,
  role,
  userName,
  email,
  fullName,
  password,
  errors
}) => {
  const classes = useStyles();
  const [showPassword, toggleShowPassword] = React.useState(false);

  return (
    <Wrapper>
      <form onSubmit={onSubmit}>
        {/* Role */}
        <FormControl fullWidth className={classes.formField}>
          <Select displayEmpty name="role" value={role} onChange={onChange}>
            <MenuItem value={ROLES.Regular}>Regular</MenuItem>
            <MenuItem value={ROLES.Moderator}>Moderator</MenuItem>
            <MenuItem value={ROLES.Admin}>Admin</MenuItem>
          </Select>
        </FormControl>

        {/* Username */}
        <FormControl fullWidth className={classes.formField} error={!!errors.userName}>
          <InputLabel>Username</InputLabel>
          <Input name="userName" value={userName} onChange={onChange} />
          {!!errors.userName && <FormHelperText>{errors.userName}</FormHelperText>}
        </FormControl>

        {/* Email */}
        <FormControl fullWidth className={classes.formField} error={!!errors.email}>
          <InputLabel>Email</InputLabel>
          <Input type="email" name="email" value={email} onChange={onChange} />
          {!!errors.email && <FormHelperText>{errors.email}</FormHelperText>}
        </FormControl>

        {/* FullName */}
        <FormControl fullWidth className={classes.formField}>
          <TextField label="Full name" name="fullName" value={fullName} onChange={onChange} />
        </FormControl>

        {/* Password */}
        <FormControl fullWidth className={classes.formField} error={!!errors.password}>
          <InputLabel>Password</InputLabel>
          <Input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={password}
            onChange={onChange}
            autoComplete="current-password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  className={classes.adornmentBtn}
                  onClick={() => toggleShowPassword(!showPassword)}
                  onMouseDown={e => e.preventDefault()}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText classes={{ root: 'password-helper' }}>
            Password must contain [a-z, A-Z, 0-9] with length of 8 ~ 20
          </FormHelperText>
        </FormControl>

        <div className="submit-container">
          <Button
            variant="outlined"
            color="primary"
            type="submit"
            className={classes.submitBtn}
            disabled={submitDisabled}
          >
            SUBMIT
          </Button>
        </div>
      </form>
    </Wrapper>
  );
};

export default UserCredentials;
