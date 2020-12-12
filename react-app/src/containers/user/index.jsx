import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import RoleRoute from '../../components/RoleRoute';
import { ROUTES, ROLES } from '../../constants';
import UserCreate from './UserCreate';
import UserPage from './UserPage';
import UserEdit from './UserEdit';
import UserMeals from './UserMeals';

const UserContainer = () => (
  <Switch>
    <Route exact path={ROUTES.UserCreate} component={UserCreate} />
    <Route exact path={ROUTES.User} component={UserPage} />
    <Route path={ROUTES.UserEdit} component={UserEdit} />
    <RoleRoute
      allowed={[ROLES.Admin]}
      path={ROUTES.UserMeals}
      newPath={ROUTES.Users}
      component={UserMeals}
    />
    <Redirect to="/404" />
  </Switch>
);

export default UserContainer;
