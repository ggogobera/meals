import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

const FullName = ({ value, onChange }) => (
  <FormControl fullWidth>
    <InputLabel>Full name</InputLabel>
    <Input name="fullName" value={value} onChange={onChange} />
  </FormControl>
);

export default FullName;
