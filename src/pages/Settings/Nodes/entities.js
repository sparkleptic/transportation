import nodes from './NodesTab/create';
import nodetype from './TypeTab/create';
import genericList from '../genericList';

const form = {
  nodes: {
    columnData: [
      {id: 'node_id', numeric: false, disablePadding: true, label: 'ID'},
      {id: 'node_code', numeric: false, disablePadding: true, label: 'Code'},
      {id: 'node_name', numeric: false, disablePadding: true, label: 'Name'},
      {id: 'zone_code', numeric: false, disablePadding: true, label: 'Address'},
      {id: 'phone', numeric: false, disablePadding: true, label: 'Phone'},
      {id: 'pic', numeric: false, disablePadding: true, label: 'PIC'},
      {id: 'remark', numeric: true, disablePadding: true, label: 'Remark'},
    ],
    idfield: 'node_id',
    listForm: genericList,
    createForm: nodes,
  },
  nodetype: {
    columnData: [
      {id: 'node_type_id', numeric: false, disablePadding: true, label: 'ID'},
      {
        id: 'node_description',
        numeric: false,
        disablePadding: true,
        label: 'Description',
      },
    ],
    idfield: 'node_type_id',
    listForm: genericList,
    createForm: nodetype,
  },
};
export default form;
