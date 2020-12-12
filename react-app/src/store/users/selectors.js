export const selectUsers = ({ users, entities }) =>
  (users.userIds || []).map(id => entities.users[id]);

export const selectUser = id => ({ entities }) => (entities.users && entities.users[id]) || null;
