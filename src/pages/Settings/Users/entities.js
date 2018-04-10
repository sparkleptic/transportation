import users from './UserTab/create';
import roles from './RoleTab/create';
import permission from './Permission/list';
import genericList from '../genericList';
import nodeColumn from './templates/nodeColumn';
const form = {
  users: {
    columnData: [
      {
        id: 'username',
        numeric: false,
        disablePadding: false,
        label: 'Username',
      },
      {id: 'email', numeric: false, disablePadding: true, label: 'Email'},
      {
        id: 'nodes',
        numeric: false,
        disablePadding: true,
        label: 'Node',
        template: nodeColumn,
      },
      {
        id: 'usergroup',
        key: 'role',
        key2: 'role_name',
        numeric: false,
        disablePadding: true,
        label: 'Roles',
      },
    ],
    postData: ['name', 'username', 'email', 'password', 'phone', 'node_id', 'role_id'],
    idfield: 'user_id',
    listForm: genericList,
    createForm: users,
  },
  usergroups: {
    columnData: [
      {id: 'role_id', numeric: false, disablePadding: false, label: 'ID'},
      {id: 'role_name', numeric: false, disablePadding: true, label: 'Roles'},
    ],
    idfield: 'role_id',
    listForm: genericList,
    createForm: roles,
  },
  permission: {
    columnData: [
      {id: 'role_id', numeric: false, disablePadding: false, label: 'ID'},
      {id: 'role_name', numeric: false, disablePadding: true, label: 'Roles'},
    ],
    idfield: 'role_id',
    listForm: permission,
  },
};
export default form;
