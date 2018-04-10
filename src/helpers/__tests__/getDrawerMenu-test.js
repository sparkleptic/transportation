// @flow

import getDrawerMenu from '../getDrawerMenu';

describe('getDrawerMenu', () => {
  it('should return the right menu structure with the right order from the permissions', () => {
    let drawerMenuList = [
      {moduleCode: 'POS', route: '/new-transactions'},
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
        moduleCode: 'OtherMenu',
        route: '/other/menu',
      },
    ];

    let permissionList = [
      {
        moduleCode: 'POS',
        moduleName: 'Dashboard',
        orderNo: '1',
      },
      {
        moduleCode: 'Pickup',
        moduleName: 'Pickup Item',
        orderNo: '2',
      },
      {
        moduleCode: 'Pickup.Request',
        moduleName: 'Pickup Request',
        orderNo: '2.2',
      },
      {
        moduleCode: 'Pickup.Overview',
        moduleName: 'Pickup Overview',
        orderNo: '2.1',
      },
      {
        moduleCode: 'OtherMenu',
        moduleName: 'Other Menu Item',
        orderNo: '10',
      },
    ];

    let userDrawerMenuList = getDrawerMenu(drawerMenuList, permissionList);

    expect(userDrawerMenuList).toMatchSnapshot();
  });
});
