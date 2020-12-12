import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconContainer from './IconContainer';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import FormHelperText from '@material-ui/core/FormHelperText';
import CloseIcon from '@material-ui/icons/Close';

import { useAuth } from '../../providers/AuthProvider';
import { register } from '../../store/auth/actions';
import { setSnackbar } from '../../store/ui/actions';
import userCredentialsValidation from '../../utils/userCredentialsValidation';
import { ROUTES } from '../../constants';

const Wrapper = styled.div`
  position: relative;
  flex: 1;
  min-height: 800px;
  padding: 0 50px 167px;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    left: -100px;
    bottom: -85px;
    transform: rotate(20deg);
    width: 150%;
    height: 200px;
    background: #f50057;
    pointer-events: none;
  }

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
`;

const useStyles = makeStyles(theme => ({
  formField: { margin: '0 auto 25px' },
  submitBtn: { width: '200px' },
  adornmentBtn: { padding: 0 },
  fab: { position: 'absolute', right: '25px', bottom: '35px' }
}));

const initialState = {
  entries: {
    userName: '',
    email: '',
    fullName: '',
    password: '',
    confirmPassword: ''
  },
  errors: {}
};

const fieldsReducer = (state, action) => {
  switch (action.type) {
    case 'inputChange':
      return {
        ...state,
        entries: { ...state.entries, [action.name]: action.value },
        errors: { ...state.errors, [action.name]: '' }
      };
    case 'setErrors':
      return { ...state, errors: action.payload };
    default:
      return state;
  }
};

const Register = ({ history, register, setSnackbar }) => {
  const auth = useAuth();
  const classes = useStyles();
  const [showPassword, toggleShowPassword] = React.useState(false);
  const [fields, dispatch] = React.useReducer(fieldsReducer, initialState);

  const handleRegister = event => {
    event.preventDefault();

    const { isValid, errors } = userCredentialsValidation({
      userName: true,
      email: true,
      password: true,
      confirmPassword: true
    })(fields.entries);

    if (isValid) {
      register({
        ...fields.entries,
        onSuccess: auth.registerCb,
        onFailure: errors => setSnackbar(errors.message)
      });
    } else {
      dispatch({ type: 'setErrors', payload: errors });
    }
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    dispatch({ type: 'inputChange', name, value });
  };

  return (
    <Wrapper>
      <Fab
        color="primary"
        aria-label="Login"
        className={classes.fab}
        onClick={() => history.push(ROUTES.Login)}
      >
        <CloseIcon />
      </Fab>
      <IconContainer />

      <h2>REGISTER</h2>

      <form onSubmit={handleRegister}>
        {/* Username */}
        <FormControl fullWidth className={classes.formField} error={!!fields.errors.userName}>
          <InputLabel>Username</InputLabel>
          <Input name="userName" onChange={handleInputChange} />
          {!!fields.errors.userName && <FormHelperText>{fields.errors.userName}</FormHelperText>}
        </FormControl>

        {/* Email */}
        <FormControl fullWidth className={classes.formField} error={!!fields.errors.email}>
          <InputLabel>Email</InputLabel>
          <Input type="email" name="email" onChange={handleInputChange} />
          {!!fields.errors.email && <FormHelperText>{fields.errors.email}</FormHelperText>}
        </FormControl>

        {/* FullName */}
        <FormControl fullWidth className={classes.formField}>
          <TextField label="Full name" name="fullName" onChange={handleInputChange} />
        </FormControl>

        {/* Password */}
        <FormControl fullWidth className={classes.formField} error={!!fields.errors.password}>
          <InputLabel>Password</InputLabel>
          <Input
            type={showPassword ? 'text' : 'password'}
            name="password"
            autoComplete="current-password"
            onChange={handleInputChange}
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

        {/* Confirm Password */}
        <FormControl
          fullWidth
          className={classes.formField}
          error={!!fields.errors.confirmPassword}
        >
          <InputLabel>Confirm Password</InputLabel>
          <Input
            type="password"
            name="confirmPassword"
            onChange={handleInputChange}
            onPaste={e => e.preventDefault()}
          />
          {!!fields.errors.confirmPassword && (
            <FormHelperText>{fields.errors.confirmPassword}</FormHelperText>
          )}
        </FormControl>

        <div className="submit-container">
          <Button variant="outlined" color="secondary" type="submit" className={classes.submitBtn}>
            CREATE ACCOUNT
          </Button>
        </div>
      </form>
    </Wrapper>
  );
};

export default connect(
  null,
  { register, setSnackbar }
)(Register);
