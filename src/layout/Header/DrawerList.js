// @flow

export type DrawerMenu = {
  moduleCode: string,
  route: string,
};

export const drawerMenuList: Array<DrawerMenu> = [
  {
    moduleCode: 'POS',
    route: '/new-transactions',
  },
  {
    moduleCode: 'Sales.Overview',
    route: '/sales/overview',
  },
  {
    moduleCode: 'Sales.Transaction',
    route: '/sales/transaction/',
  },
  {
    moduleCode: 'Pickup.Overview',
    route: '/pickup/overview',
  },
  {
    moduleCode: 'Pickup.Request',
    route: '/pickup/request',
  },
  {
    moduleCode: 'Pickup.Schedule',
    route: '/pickup/schedule',
  },
  {
    moduleCode: 'Inventory.Overiew',
    route: '/inventory/overview',
  },
  {
    moduleCode: 'Inventory.Item',
    route: '/inventory/item/list',
  },
  {
    moduleCode: 'Inventory.Overview',
    route: '/inventory/item/overview',
  },
  {
    moduleCode: 'Inventory.Bagging',
    route: '/inventory/bagging',
  },
  {
    moduleCode: 'Inventory.Unbagging',
    route: '/inventory/unbagging',
  },
  {
    moduleCode: 'Outbound.Overview',
    route: '/outbound/overview',
  },
  {
    moduleCode: 'Outbound.Packing_Kayu',
    route: '/outbound/packing-kayu',
  },
  {
    moduleCode: 'Outbound.SMU',
    route: '/outbound/smu',
  },
  {
    moduleCode: 'Outbound.Outgoing',
    route: '/outbound/outgoing',
  },
  {
    moduleCode: 'Traffic.Link',
    route: '/traffic/link',
  },
  {
    moduleCode: 'Traffic.Path',
    route: '/traffic/path',
  },
  {
    moduleCode: 'Inbound.Overview',
    route: '/inbound/overview',
  },
  {
    moduleCode: 'Inbound.Incoming',
    route: '/inbound/prealert',
  },
  {
    moduleCode: 'Delivery.Runsheet',
    route: '/delivery/runsheet',
  },
  {
    moduleCode: 'Delivery.POD',
    route: '/delivery/pod',
  },
  {
    moduleCode: 'Settings.Tariff',
    route: '/settings/tariff',
  },
  {
    moduleCode: 'Settings.Geolocation',
    route: '/settings/geolocation',
  },
  {
    moduleCode: 'Settings.Nodes',
    route: '/settings/nodes',
  },
  {
    moduleCode: 'Settings.Links',
    route: '/settings/links',
  },
  {
    moduleCode: 'Settings.Vehicles',
    route: '/settings/vehicles',
  },
  {
    moduleCode: 'Settings.Users',
    route: '/settings/users',
  },
  {
    moduleCode: 'Transport',
    route: '/transport',
  },
  {
    moduleCode: 'Transport.Packing_Kayu',
    route: '/transport/packing_kayu',
  },
  {
    moduleCode: 'Transport.Manifest',
    route: '/transport/manifest',
  },
  {
    moduleCode: 'Transport.Overview',
    route: '/transport/overview',
  },
  {
    moduleCode: 'Transport.Booking',
    route: '/transport/booking',
  },
];
