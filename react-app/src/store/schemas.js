import { schema } from 'normalizr';

const usersScema = new schema.Entity('users', {}, { idAttribute: '_id' });

export default {
  USERS: usersScema,
  USERS_ARRAY: [usersScema]
};
