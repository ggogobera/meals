import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

const UserName = ({ value, onChange, error }) => (
  <FormControl fullWidth error={!!error}>
    <InputLabel>Username</InputLabel>
    <Input name="userName" value={value} onChange={onChange} />
    {!!error && <FormHelperText>{error}</FormHelperText>}
  </FormControl>
);

export default UserName;
