import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { login } from '../../store/auth/actions';
import { setSnackbar } from '../../store/ui/actions';
import { useAuth } from '../../providers/AuthProvider';
import { ROUTES } from '../../constants';
import IconContainer from './IconContainer';

const Wrapper = styled.div`
  position: relative;
  flex: 1;
  padding: 0 50px;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    left: -100px;
    bottom: -85px;
    transform: rotate(20deg);
    width: 150%;
    height: 200px;
    background: #3f51b5;
    pointer-events: none;
  }

  .submit-container {
    position: relative;
    margin: 30px auto 0;
    text-align: center;
  }
`;

const useStyles = makeStyles((theme) => ({
  formField: { margin: '0 auto 20px' },
  submitBtn: { width: '150px', height: '36px' },
  adornmentBtn: { padding: 0 },
  fab: { position: 'absolute', right: '25px', bottom: '35px' },
}));

const initialState = {
  entries: { userName: '', password: '' },
  errors: { userName: '', password: '' },
};

const fieldsReducer = (state, action) => {
  switch (action.type) {
    case 'inputChange':
      return {
        ...state,
        entries: { ...state.entries, [action.name]: action.value },
        errors: { ...state.errors, [action.name]: '' },
      };
    case 'setErrors':
      return {
        ...state,
        errors: { userName: action.userName, password: action.password },
      };
    default:
      return state;
  }
};

const Login = ({ login, isAuthBusy, history, setSnackbar }) => {
  const auth = useAuth();
  const classes = useStyles();

  const [showPassword, toggleShowPassword] = React.useState(false);
  const [fields, dispatch] = React.useReducer(fieldsReducer, initialState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    dispatch({ type: 'inputChange', name, value });
  };

  const handleLogin = (event) => {
    event.preventDefault();

    const { userName, password } = fields.entries;

    if (userName && password) {
      login({
        userName,
        password,
        onSuccess: auth.loginCb,
        onFailure: (errors) => setSnackbar(errors.message),
      });
    } else {
      dispatch({
        type: 'setErrors',
        userName: !userName ? 'Field must not be empty' : '',
        password: !password ? 'Field must not be empty' : '',
      });
    }
  };

  return (
    <Wrapper>
      <IconContainer />
      <h2>LOGIN</h2>
      <form onSubmit={handleLogin}>
        {/* Username */}
        <FormControl fullWidth className={classes.formField} error={!!fields.errors.userName}>
          <InputLabel>Username</InputLabel>
          <Input name="userName" onChange={handleInputChange} />
          {!!fields.errors.userName && <FormHelperText>{fields.errors.userName}</FormHelperText>}
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
                  onMouseDown={(e) => e.preventDefault()}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          {!!fields.errors.password && <FormHelperText>{fields.errors.password}</FormHelperText>}
        </FormControl>

        <div className="submit-container">
          <Button
            variant="outlined"
            color="primary"
            type="submit"
            className={classes.submitBtn}
            disabled={isAuthBusy}
          >
            {isAuthBusy ? <CircularProgress size={15} /> : 'Login'}
          </Button>
        </div>
      </form>
      <Fab
        color="secondary"
        aria-label="Register"
        className={classes.fab}
        onClick={() => history.push(ROUTES.Register)}
      >
        <AddIcon />
      </Fab>
    </Wrapper>
  );
};

const mapStateToProps = ({ auth }) => ({ isAuthBusy: auth.isBusy });

export default connect(mapStateToProps, { login, setSnackbar })(Login);
