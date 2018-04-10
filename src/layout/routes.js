import React from 'react';

import Header from './Header';

import NewTransactions from '../pages/Home';
import TransactionList from '../pages/TransactionList';


import Users from '../pages/Settings/Users';
import Vehicles from '../pages/Settings/Vehicles';
import Tariff from '../pages/Settings/Tariff';
import Geolocation from '../pages/Settings/Geolocation';
import Nodes from '../pages/Settings/Nodes';
import Links from '../pages/Settings/Links';

import GeolocationCreate from '../pages/Settings/Geolocation/create';
import GeolocationEdit from '../pages/Settings/Geolocation/edit';

import UsersCreate from '../pages/Settings/Users/create';
import UsersEdit from '../pages/Settings/Users/edit';

import VehiclesCreate from '../pages/Settings/Vehicles/create';
import VehiclesEdit from '../pages/Settings/Vehicles/edit';

import NodeCreate from '../pages/Settings/Nodes/create';
import NodeEdit from '../pages/Settings/Nodes/edit';

import TransportBooking from '../pages/Transport/Booking';
import TransportBookingCreate from '../pages/Transport/Booking/form';
import TransportBookingEdit from '../pages/Transport/Booking/form/edit';

import TransportPackingKayu from '../pages/Transport/PackingKayu';

//<<<<<<< HEAD
import TransportOverview from '../pages/Transport/Overview/overview';
import InboundOverview from '../pages/Inbound/Overview/overview';
import PickUpOverview from '../pages/PickUp/Overview/overview';
import SalesOverview from '../pages/Sales/Overview/overview';

/*import PickUpRequestCreate from '../pages/PickUp/Request/form';
import PickUpRequestEdit from '../pages/PickUp/Request/form/edit';*/

import DeliveryOrder from '../pages/Delivery/Runsheet/runsheet';
import NewDeliveryCreate from '../pages/Delivery/Runsheet/form';
import NewDeliveryEdit from '../pages/Delivery/Runsheet/form/edit';

import MenifestCreate from '../pages/Transport/Manifest/form';
import MenifestEdit from '../pages/Transport/Manifest/form/edit';
//=======
//Pickup
import PickUpRequest            from  '../pages/PickUp/Request'; 
import PickUpRequestCreate      from  '../pages/PickUp/Request/form';
import PickUpRequestEdit        from  '../pages/PickUp/Request/form/edit';

import  PickUpScheduleList      from  '../pages/PickUp/Schedule';
import  PickUpScheduleCreate    from  '../pages/PickUp/Schedule/sub/index'
import  PickUpScheduleEdit      from  '../pages/PickUp/Schedule/sub/index'
               
//>>>>>>> origin/dev_ps

import TariffCreate from '../pages/Settings/Tariff/create';
import TariffEdit from '../pages/Settings/Tariff/edit';
import TariffView from '../pages/Settings/Tariff/view';
import LinksCreate from '../pages/Settings/Links/create';
import LinksEdit from '../pages/Settings/Links/edit';

import MyProfile from  '../pages/MyProfile';
import ImageEdit from  '../pages/ImageEdit';
import ProfileEdit from  '../pages/ProfileEdit';
import ResetPassword from  '../pages/ResetPassword';

import ConNoteList from '../pages/Sales/Connote';
import Transaction from '../pages/Sales/Transaction';
import InventoryItemList from '../pages/Inventory/Item/ItemScene';
import InventoryBaggingList from '../pages/Inventory/Bagging/BaggingList';
import UnbaggingMenuScene from '../pages/Inventory/Unbagging/MenuScene';
import UnbaggingBagOnlyScene from '../pages/Inventory/Unbagging/UnbaggingBagOnlyScene';
import UnbaggingBagConnoteScene from '../pages/Inventory/Unbagging/UnbaggingBagConnoteScene';

import TransportManifestList from '../pages/Transport/Manifest/ManifestList';
import InboundPrealertList from '../pages/Inbound/Prealert/Prealert';
import InboundPrealertEditList from '../pages/Inbound/Prealert/PrealertEdit/PrealertEdit';

import EmployeeDetail from '../pages/Employee/EmployeeDetail';

import TransactionComplete from '../pages/Sales/Transaction/Complete';
import VehicleDetail from '../pages/Vehicle/VehicleDetail';
import NodeDetail from '../pages/Node/NodeDetail';
import ConnoteSearchDetail from '../pages/Connote/ConnoteDetail';

import ErrorPage from '../pages/Error/ErrorPage';


export const routes = [
  {
    exact: true,
    pathName: '/',
    Component: NewTransactions,
    headerComponent: Header,
  },
  {
    exact: true,
    pathName: '/new-transactions',
    Component: NewTransactions,
    headerComponent: Header,
  },
  {
    pathName: '/sales/overview',
    Component: SalesOverview,
    headerComponent: Header,
  },
  {
    pathName: '/delivery/runsheet',
    Component: DeliveryOrder,
    headerComponent: Header,
  },
  {
    pathName: '/sales/transaction',
    exact: true,
    Component: TransactionList,
    headerComponent: Header,
  },
  {
    pathName: '/sales/connote/:id',
    Component: ConNoteList,
    headerComponent: Header,
  },
  {
    pathName: '/sales/transaction/:id',
    Component: Transaction,
    exact: true,
    headerComponent: Header,
  },
  {
    pathName: '/transaction/complete/:id',
    Component: TransactionComplete,
    exact: true,
    headerComponent: Header,
  },
  {
    pathName: '/transport/booking',
    Component: TransportBooking,
    exact: true,
    headerComponent: Header,
  },
  {
    pathName: '/transport/booking/create',
    Component: TransportBookingCreate,
    exact: true,
    headerComponent: Header,
  },
  {
    pathName: '/transport/booking/edit/:id',
    Component: TransportBookingEdit,
    headerComponent: Header,
  },
  {
    pathName: '/transport/overview',
    Component: TransportOverview,
    headerComponent: Header,
  },
  {
    pathName: '/inbound/overview',
    Component: InboundOverview,
    headerComponent: Header,
  },
  {
    pathName: '/inbound/prealert',
    Component: InboundPrealertList,
    headerComponent: Header,
    exact: true,
  },
  {
    pathName: '/inbound/prealert/edit/:id',
    Component: InboundPrealertEditList,
    headerComponent: Header,
  },
  {
    pathName: '/transport/packingkayu',
    Component: TransportPackingKayu,
    headerComponent: Header,
  },
  {
    pathName: '/pickup/overview',
    Component: PickUpOverview,
    headerComponent: Header,
  },
  {
    pathName: '/pickup/request',
    Component: PickUpRequest,
    exact: true,
    headerComponent: Header,
  },
  {
    pathName: '/pickup/request/create',
    Component: PickUpRequestCreate,
    exact: true,
    headerComponent: Header,
  },
  {
    pathName: '/pickup/request/edit/:id',
    Component: PickUpRequestEdit,
    exact: true,
    headerComponent: Header,
  },
  {
    pathName: '/delivery/runsheet/create',
    Component: NewDeliveryCreate,
    exact: true,
    headerComponent: Header,
  },
  {
    pathName: '/pickup/schedule/',
    Component: PickUpScheduleList,
    exact: true,
    headerComponent: Header,
  },
  {

    pathName: '/delivery/runsheet/edit/:id',
    Component: NewDeliveryEdit,
    exact: true,
    headerComponent: Header,
  },  
  {
    pathName: '/transport/manifest/create',
    Component: MenifestCreate,
    exact: true,
    headerComponent: Header,
  },
  {

    pathName: '/pickup/schedule/create',
    Component: PickUpRequestCreate,

    exact: true,
    headerComponent: Header,
  },
  {
    pathName: '/transport/manifest/edit/:id',
    Component: MenifestEdit,
    exact: true,
    headerComponent: Header,
  },
  {
    pathName: '/pickup/schedule/edit/:id',
    Component: PickUpScheduleEdit,

    exact: true,
    headerComponent: Header,
  },
  {
    pathName: '/settings/users',
    Component: Users,
    exact: true,
    headerComponent: Header,
  },
  {
    pathName: '/settings/users/:entity/create',
    Component: UsersCreate,
    exact: true,
    headerComponent: Header,
  },
  {
    pathName: '/settings/users/:entity/edit/:id',
    Component: UsersEdit,
    exact: true,
    headerComponent: Header,
  },
  {
    pathName: '/settings/vehicles',
    Component: Vehicles,
    exact: true,
    headerComponent: Header,
  },
  {
    pathName: '/settings/vehicles/:entity/create',
    Component: VehiclesCreate,
    exact: true,
    headerComponent: Header,
  },
  {
    pathName: '/settings/vehicles/:entity/edit/:id',
    Component: VehiclesEdit,
    exact: true,
    headerComponent: Header,
  },
  {
    pathName: '/settings/tariff',
    Component: Tariff,
    exact: true,
    headerComponent: Header,
  },
  {
    pathName: '/settings/tariff/:entity/create',
    Component: TariffCreate,
    exact: true,
    headerComponent: Header,
  },
  {
    pathName: '/settings/tariff/:entity/edit/:id',
    Component: TariffEdit,
    exact: true,
    headerComponent: Header,
  },
  {
    pathName: '/settings/tariff/:entity/view/:id',
    Component: TariffView,
    exact: true,
    headerComponent: Header,
  },
  {
    pathName: '/settings/geolocation',
    Component: Geolocation,
    exact: true,
    headerComponent: Header,
  },
  {
    pathName: '/settings/geolocation/:entity/create',
    Component: GeolocationCreate,
    exact: true,
  },
  {
    pathName: '/settings/geolocation/:entity/edit/:id',
    Component: GeolocationEdit,
    exact: true,
    headerComponent: Header,
  },
  {
    pathName: '/settings/nodes',
    Component: Nodes,
    exact: true,
    headerComponent: Header,
  },
  {
    pathName: '/settings/nodes/:entity/create',
    Component: NodeCreate,
    exact: true,
    headerComponent: Header,
  },
  {
    pathName: '/settings/nodes/:entity/edit/:id',
    Component: NodeEdit,
    exact: true,
    headerComponent: Header,
  },
  {
    pathName: '/settings/links',
    Component: Links,
    exact: true,
    headerComponent: Header,
  },
  {
    pathName: '/settings/links/create',
    Component: LinksCreate,
    exact: true,
    headerComponent: Header,
  },
  {
    pathName: '/settings/links/edit/:id',
    Component: LinksEdit,
    exact: true,
    headerComponent: Header,
  },
  {
    pathName: '/inventory/item/list',
    Component: InventoryItemList,
    exact: true,
    headerComponent: Header,
  },
  {
    pathName: '/inventory/bagging/:bagID',
    Component: InventoryBaggingList,
    exact: true,
    headerComponent: Header,
  },
  {
    pathName: '/inventory/bagging',
    Component: InventoryBaggingList,
    exact: true,
    headerComponent: Header,
  },
  {

    pathName: '/transport/manifest',
    Component: TransportManifestList,
    exact: true,
    headerComponent: Header,
  },
  {

    pathName: '/employee/:id',
    Component: EmployeeDetail,
    exact: true,
    headerComponent: Header,
  },
  {

    pathName: '/user/:id',
    Component: EmployeeDetail,
    exact: true,
    headerComponent: Header,
  },
  {
    pathName: '/vehicle/:id',
    Component: VehicleDetail,

    exact: true,
    headerComponent: Header,
  },
  {

    pathName: '/nodes/:id',
    Component: NodeDetail,

    exact: true,
    headerComponent: Header,
  },

  {
    pathName: '/connote/:id',
    Component: ConnoteSearchDetail,
    exact: true,
    headerComponent: Header,
  },
  {
    pathName: '/myprofile',
    Component: MyProfile,
    exact: true,
    headerComponent: Header,
  },
  {
    pathName: '/error/:errorCode',
    Component: ErrorPage,
    exact: true,
  },
  {
    pathName: '/myprofile/edit',
    Component: ProfileEdit,
    exact: true,
    headerComponent: Header,
  },
  {
    pathName: '/myprofile/resetpassword',
    Component: ResetPassword,
    exact: true,
    headerComponent: Header,
  },
  {
    pathName: '/myprofile/editimage',
    Component: ImageEdit,
    exact: true,
    headerComponent: Header,
  },

  // {
  //   pathName: '*',
  //   Component: NewTransactions,
  //   headerComponent: Header,
  // },

  {
    pathName: '/inventory/unbagging',
    Component: UnbaggingMenuScene,
    exact: true,
    headerComponent: Header,
  },
  {
    pathName: '/inventory/unbagging/bag-only',
    Component: UnbaggingBagOnlyScene,
    exact: true,
    headerComponent: Header,
  },
  {
    pathName: '/inventory/unbagging/bag-connote',
    Component: UnbaggingBagConnoteScene,
    exact: true,
    headerComponent: Header,
  },
  {
    pathName: '/inventory/unbagging',
    Component: UnbaggingMenuScene,
    exact: true,
    headerComponent: Header,
  },
  {
    pathName: '/inventory/unbagging/bag-only',
    Component: UnbaggingBagOnlyScene,
    exact: true,
    headerComponent: Header,
  },
  {
    pathName: '/inventory/unbagging/bag-connote',
    Component: UnbaggingBagConnoteScene,
    exact: true,
    headerComponent: Header,
  },
  {
    pathName: '/',
    Component: NewTransactions,
    headerComponent: Header,
  },

];
