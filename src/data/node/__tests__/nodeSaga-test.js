// @flow

import {takeEvery, put, call} from 'redux-saga/effects';

import nodeAPI from '../nodeAPI';
import convertSnakeCasedToCamelCase from '../../../helpers/convertSnakeCasedToCamelCase';
import {
  nodeSagaWatcher,
  getNodeDetailSaga,
  getNodeIventoryList,
  getNodeVehicleList,
  getNodeEmployeeList,
} from '../nodeSaga';

describe('nodeSaga', () => {
  it('should run the watcher correctly', () => {
    let generator = nodeSagaWatcher();
    expect(generator.next().value).toEqual(
      takeEvery('GET_NODE_DETAIL_REQUESTED', getNodeDetailSaga),
    );
    expect(generator.next().value).toEqual(
      takeEvery('GET_NODE_INVENTORY_LIST_REQUESTED', getNodeIventoryList),
    );
    expect(generator.next().value).toEqual(
      takeEvery('GET_NODE_VEHICLE_LIST_REQUESTED', getNodeVehicleList),
    );
    expect(generator.next().value).toEqual(
      takeEvery('GET_NODE_EMPLOYEE_LIST_REQUESTED', getNodeEmployeeList),
    );
  });

  it('should get the node detail correctly based on the node ID', () => {
    let nodeID = 123;
    let action = {
      type: 'GET_NODE_DETAIL_REQUESTED',
      nodeID,
    };

    let generator = getNodeDetailSaga(action);

    expect(generator.next().value).toEqual(
      call(nodeAPI.getNodeDetail, {nodeID}),
    );
    let response = {
      status: {
        code: 200,
        description: 'OK',
      },
      data: {
        nodeID: 17,
        nodeName: 'JNE Explore',
        pic: {
          employeeID: 17,
          firstName: 'juli',
          lastName: null,
          nik: 1429758673,
        },
      },
    };
    expect(generator.next(response).value).toEqual(
      put({
        type: 'GET_NODE_DETAIL_SUCCEED',
        nodeID,
        detailInfo: response.data,
      }),
    );
  });

  it('should get the inventory data correctly based on node ID', () => {
    let nodeID = 123;
    let action = {
      type: 'GET_NODE_INVENTORY_LIST_REQUESTED',
      nodeID,
      limit: 5,
      sortByColumn: '',
      sortOrderType: 'asc',
      page: 1,
    };

    let generator = getNodeIventoryList(action);

    expect(generator.next().value).toEqual(
      call(nodeAPI.getNodeInventoryVehicleEmployeeList, {
        nodeID,
        type: 'inventory',
        limit: action.limit,
        sortByColumn: action.sortByColumn,
        sortOrderType: action.sortOrderType,
        page: action.page,
      }),
    );

    let response = {
      status: {
        code: 200,
        description: 'OK',
      },
      current_page: 1,
      data: [
        {
          connote_id: 635,
          connote_number: '000017073000004',
          from_customer_id: 1,
          from_name: 'Adi',
          to_tlc: 'BDO',
          is_insurance: null,
          is_void: 0,
          status_id: 1,
        },
      ],
      from: 1,
      last_page: 3,
      next_page_url:
        'http://coreapi.skyware.systems/api/nodes/17/inventory?page=2',
      path: 'http://coreapi.skyware.systems/api/nodes/17/inventory',
      per_page: 20,
      prev_page_url: null,
      to: 20,
      total: 55,
      bag: 99,
    };

    let convertedResponse = convertSnakeCasedToCamelCase(response);

    expect(generator.next(convertedResponse).value).toEqual(
      put({
        type: 'GET_NODE_INVENTORY_LIST_SUCCEED',
        nodeID,
        data: convertedResponse.data,
        nextPageUrl: convertedResponse.nextPageUrl,
        prevPageUrl: convertedResponse.prevPageUrl,
        total: convertedResponse.total,
        summaryList: [
          {
            key: 'Connotes',
            value: String(convertedResponse.total),
          },
          {
            key: 'Bags',
            value: String(convertedResponse.bag),
          },
        ],
      }),
    );
  });

  it('should get the vehicle data correctly based on node ID', () => {
    let nodeID = 123;
    let action = {
      type: 'GET_NODE_VEHICLE_LIST_REQUESTED',
      nodeID,
      limit: 5,
      sortByColumn: '',
      sortOrderType: 'asc',
      page: 1,
    };

    let generator = getNodeVehicleList(action);

    expect(generator.next().value).toEqual(
      call(nodeAPI.getNodeInventoryVehicleEmployeeList, {
        nodeID,
        type: 'vehicle',
        limit: action.limit,
        sortByColumn: action.sortByColumn,
        sortOrderType: action.sortOrderType,
        page: action.page,
      }),
    );

    let response = {
      status: {
        code: 200,
        description: 'OK',
      },
      current_page: 1,
      data: [
        {
          vehicle_id: 122,
          police_no: 'B 1945 JNE',
          vehicle_status: 'In Use',
          owned_by: 'JNE',
          max_weight: '100',
          max_volume: '3',
          expiry_date: '2019-01-31 00:00:00',
          vehicle_lat: '-6.197353',
          vehicle_lot: '106.761379',
          vehicle_name: 'Motor Pegawai',
          own_date: '2018-02-01 00:00:00',
          node_id: 17,
        },
      ],
      from: 1,
      last_page: 1,
      next_page_url: null,
      path: 'http://coreapi.skyware.systems/api/nodes/17/vehicle',
      per_page: 20,
      prev_page_url: null,
      to: 3,
      total: 3,
      data_group: [
        {
          jumlah: '2',
          type_name: 'Motorbike',
        },
        {
          jumlah: '1',
          type_name: 'Big Truck',
        },
      ],
    };

    let convertedResponse = convertSnakeCasedToCamelCase(response);

    expect(generator.next(convertedResponse).value).toEqual(
      put({
        type: 'GET_NODE_VEHICLE_LIST_SUCCEED',
        nodeID,
        data: convertedResponse.data,
        nextPageUrl: convertedResponse.nextPageUrl,
        prevPageUrl: convertedResponse.prevPageUrl,
        total: convertedResponse.total,
        summaryList: convertedResponse.dataGroup.map((summaryItem) => {
          return {
            key: summaryItem.typeName,
            value: summaryItem.jumlah,
          };
        }),
      }),
    );
  });

  it('should get the employee data correctly based on node ID', () => {
    let nodeID = 123;
    let action = {
      type: 'GET_NODE_EMPLOYEE_LIST_REQUESTED',
      nodeID,
      limit: 5,
      sortByColumn: '',
      sortOrderType: 'asc',
      page: 1,
    };

    let generator = getNodeEmployeeList(action);

    expect(generator.next().value).toEqual(
      call(nodeAPI.getNodeInventoryVehicleEmployeeList, {
        nodeID,
        type: 'employee',
        limit: action.limit,
        sortByColumn: action.sortByColumn,
        sortOrderType: action.sortOrderType,
        page: action.page,
      }),
    );

    let response = {
      status: {
        code: 200,
        description: 'OK',
      },
      current_page: 1,
      data: [
        {
          employee_id: 260,
          first_name: 'OCKTA',
          last_name: 'RIANA',
          nik: null,
          birth_date: null,
          birth_place: null,
          no_ktp: null,
          no_sim: null,
          employement_status: 'ACTIVE',
          user_id: '472',
          position_id: '5',
          phone_number: null,
          gender: 'M',
          work_location: '17',
          employee_lat: null,
          employee_lon: null,
        },
      ],
      from: 1,
      last_page: 1,
      next_page_url: null,
      path: 'http://coreapi.skyware.systems/api/nodes/17/employee',
      per_page: 20,
      prev_page_url: null,
      to: 2,
      total: 2,
      data_group: {
        any_key_1: {
          position_id: '5',
          jumlah: '1',
          status_name: 'Staff',
        },
        any_key_2: {
          position_id: '9',
          jumlah: '1',
          status_name: 'Outbound Manager',
        },
        total: 2,
      },
    };

    let convertedResponse = convertSnakeCasedToCamelCase(response);

    expect(generator.next(convertedResponse).value).toEqual(
      put({
        type: 'GET_NODE_EMPLOYEE_LIST_SUCCEED',
        nodeID,
        data: convertedResponse.data,
        nextPageUrl: convertedResponse.nextPageUrl,
        prevPageUrl: convertedResponse.prevPageUrl,
        total: convertedResponse.total,
        summaryList: [
          {key: 'Staff', value: '1'},
          {key: 'Outbound Manager', value: '1'},
          {key: 'Total', value: '2'},
        ],
      }),
    );
  });
});
