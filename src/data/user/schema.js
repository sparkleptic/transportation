// @flow

import {schema} from 'normalizr';

const node = new schema.Entity('nodeList', {}, {idAttribute: 'node_id'});
const permission = new schema.Entity(
  'permissionList',
  {},
  {idAttribute: 'module_id'},
);

export const userProfile = new schema.Entity(
  'user',
  {
    node: [node],
    permission: [permission],
  },
  {idAttribute: 'user_id'},
);
