// @flow

import convertArrayToMap from './convertArrayToMap';

import type {DrawerMenu} from '../layout/Header/DrawerList';

type Permission = {
  moduleCode: string,
  moduleName: string,
  orderNo: string,
};

export default function getDrawerMenu(
  drawerMenuList: Array<DrawerMenu>,
  permissionList: Array<Permission>,
) {
  let mappedDrawerMenuList = convertArrayToMap(drawerMenuList, 'moduleCode');
  let sortedPermissionList = permissionList.sort((a, b) => {
    let {orderNo: orderNoA} = a;
    let {orderNo: orderNoB} = b;
    if (orderNoA && orderNoB && orderNoA.length < orderNoB.length) {
      return -1;
    } else if (orderNoA && orderNoB && orderNoA.length > orderNoB.length) {
      return 1;
    } else {
      if (orderNoA < orderNoB) {
        return -1;
      } else if (orderNoA > orderNoB) {
        return 1;
      } else {
        return 0;
      }
    }
  });

  let mappedMenu: Map<string, any> = new Map();
  sortedPermissionList.forEach((permittedMenu) => {
    if (permittedMenu.accessAll !== '0') {
      let menu = mappedDrawerMenuList.get(permittedMenu.moduleCode);
      if (menu) {
        let drawerMenu = {...permittedMenu, ...menu};
        let [parentModuleCode, childMenuCode] = menu.moduleCode.split('.');

        if (childMenuCode) {
          let childrenMenu = [];
          let parentMenu = mappedMenu.get(parentModuleCode);

          if (parentMenu) {
            let {nested = []} = parentMenu;
            childrenMenu = [...nested];
          }
          childrenMenu.push(drawerMenu);

          mappedMenu.set(parentModuleCode, {
            ...parentMenu,
            nested: childrenMenu,
          });
        } else {
          mappedMenu.set(parentModuleCode, drawerMenu);
        }
      } else {
        mappedMenu.set(permittedMenu.moduleCode, permittedMenu);
      }
    }
  });
  return [...mappedMenu.values()];
}
