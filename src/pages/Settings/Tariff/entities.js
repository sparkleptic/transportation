import tariff from './BaseTab/create';
import special from './SpecialTab/create';
import surcharge from './SurchargeTab/create';
import genericList from '../genericList';
import tariffTooltip from './tariffTooltip';

const form = {
  tarif: {
    columnData: [
      {id: 'id', numeric: false, disablePadding: true, label: 'ID'},
      {id: 'origin', numeric: false, disablePadding: true, label: 'Origin'},
      {
        id: 'destination',
        numeric: false,
        disablePadding: true,
        label: 'Destination',
      },
      {id: 'service_code', numeric: false, disablePadding: true, label: 'Service'},
      {id: 'price_1', numeric: false, disablePadding: true, label: 'Tariff'},
      {
        id: 'min_weight',
        numeric: false,
        disablePadding: true,
        label: 'Min Weight',
      },
      {
        id: 'max_weight',
        numeric: true,
        disablePadding: true,
        label: 'Max Weight',
      },
    ],
    statusfield: 'active',
    idfield: 'id',
    listForm: genericList,
    createForm: tariff,
  },
  special_tariff: {
    columnData: [
      {id: 'id', numeric: false, disablePadding: true, label: 'ID'},
      {
        id: 'special_tariff_name',
        numeric: false,
        disablePadding: true,
        label: 'Name',
      },
      {
        id: 'effective_date_from',
        numeric: false,
        disablePadding: true,
        label: 'Effective Date From',
      },
      {
        id: 'effective_date_to',
        numeric: false,
        disablePadding: true,
        label: 'Effective Date To',
        template: tariffTooltip,
      },
    ],
    idfield: 'id',
    listForm: genericList,
    createForm: special,
  },
  surcharges: {
    columnData: [
      {id: 'surcharge_id', numeric: false, disablePadding: true, label: 'ID'},
      {
        id: 'surcharge_name',
        numeric: false,
        disablePadding: true,
        label: 'Name',
      },
      {
        id: 'description',
        numeric: false,
        disablePadding: true,
        label: 'Description',
      },
    ],
    idfield: 'surcharge_id',
    listForm: genericList,
    createForm: surcharge,
  },
};
export default form;
