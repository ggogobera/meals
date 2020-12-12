import React from 'react';
import { connect } from 'react-redux';

const RoleContext = React.createContext();

const RoleComponent = ({ user, ...rest }) => (
  <RoleContext.Provider {...rest} value={user ? user.role : null} />
);

const useRole = () => React.useContext(RoleContext);

const RoleProvider = connect(state => ({ user: state.auth.user }))(RoleComponent);

export { RoleProvider, useRole };
