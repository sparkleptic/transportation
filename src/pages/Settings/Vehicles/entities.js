import vehicles from './VehicleTab/create';
import vehicletype from './VehicleTypeTab/create';
import genericList from '../genericList';

const form = {
  vehicle: {
    columnData: [
      {id: 'vehicle_id', numeric: false, disablePadding: true, label: 'ID'},
      {
        id: 'type',
        key: 'type_name',
        numeric: false,
        disablePadding: true,
        label: 'Type',
      },
      {
        id: 'owned_by',
        numeric: false,
        disablePadding: true,
        label: 'Owned By',
      },
      {id: 'vehicle_name', numeric: false, disablePadding: true, label: 'Name'},
      {
        id: 'police_no',
        numeric: false,
        disablePadding: true,
        label: 'Registration No.',
      },
      {
        id: 'max_weight',
        numeric: false,
        disablePadding: true,
        label: 'Max Weight',
        suffix: 'kg',
      },
      {
        id: 'max_volume',
        numeric: false,
        disablePadding: true,
        label: 'Max Volume',
        suffix: 'm3',
      },
      {
        id: 'expiry_date',
        numeric: false,
        disablePadding: true,
        label: 'Expiry Date',
        type: 'date',
      },
      {
        id: 'location',
        numeric: false,
        disablePadding: true,
        label: 'Current Location',
      },
    ],
    postData: ['vehicle_name'],
    statusfield: 'vehicle_status',
    idfield: 'vehicle_id',
    listForm: genericList,
    createForm: vehicles,
  },
  vehicletype: {
    columnData: [
      {
        id: 'vehicle_type_id',
        numeric: false,
        disablePadding: false,
        label: 'ID',
      },
      {id: 'type_name', numeric: false, disablePadding: true, label: 'Name'},
      {
        id: 'mode',
        key: 'mode_description',
        numeric: false,
        disablePadding: true,
        label: 'Mode',
      },
    ],
    postData: ['vehicle_type_id', 'type_name', 'mode_id'],
    idfield: 'vehicle_type_id',
    listForm: genericList,
    createForm: vehicletype,
  },
};
export default form;
