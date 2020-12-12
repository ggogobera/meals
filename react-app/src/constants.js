export const ROLES = {
  Admin: 'admin',
  Moderator: 'moderator',
  Regular: 'regular'
};

export const ROUTES = {
  Home: '/',

  Auth: '/auth',
  Login: '/auth/login',
  Register: '/auth/register',

  Profile: '/profile',

  Users: '/users',

  UserCreate: '/user/create',
  User: '/user/:id',
  UserEdit: '/user/:id/edit',
  UserMeals: '/user/:id/meals'
};
