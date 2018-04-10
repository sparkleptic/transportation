// @flow

import {createEmployeeAPI} from '../employeeAPI';
import createRequestHeaders from '../../../helpers/createRequestHeaders';

describe('employeeAPI', () => {
  it('should request the correct data based on employee ID', async () => {
    let employeeID = 123;
    let response = {
      data: {
        status: {
          code: 200,
        },
        data: {
          employee_id: 522,
          first_name: 'EKAMULAT',
          last_name: null,
          nik: null,
          birth_date: null,
          birth_place: null,
          no_ktp: null,
          no_sim: null,
          work_location: '461',
          employement_status: 'ACTIVE',
          user_id: '734',
          position_id: '4',
          phone_number: null,
          gender: 'M',
          position: {
            position_id: 4,
            status_name: 'Courier',
          },
          node_location: {
            node_id: 461,
            node_name: 'BDO, *AGEN PADASUKA CIMAHI',
            parent_node_id: 263,
            node_type_id: 2,
            agent_name: 'AGEN',
            node_address: null,
            subdistrict_id: null,
            district_id: null,
            city_id: null,
            province_id: null,
            zip_code: null,
            time_zone_id: null,
            tariff_code: 'BDO10000',
            remark: null,
            status: 'active',
            node_lat: null,
            node_lon: null,
            zone_code: 'BDO',
            employee_id: '522',
            allow_special_cargo: null,
            node_code: 'BDO199',
            phone: null,
            allow_connote: '1',
            is_label: '0',
          },
        },
      },
    };
    let mockResponse = {
      headers: createRequestHeaders([
        ['Content-Type', 'application/json; UTF=888'],
      ]),
      data: response,
      ok: true,
      status: 200,
    };
    let customFetch = {
      get: jest.fn(() => Promise.resolve(mockResponse)),
      post: jest.fn(() => Promise.resolve(mockResponse)),
      put: jest.fn(() => Promise.resolve(mockResponse)),
    };
    let EmployeeAPI = createEmployeeAPI(customFetch);
    let result = await EmployeeAPI.getEmployeeDetail({employeeID});
    expect(customFetch.get).toHaveBeenCalledWith(`/employee/${employeeID}`, {});
    expect(result).toEqual(response);
  });

  it('should request activity endpoint with the right params', async () => {
    let request = {
      employeeID: 123,
      limit: 5,
      page: 1,
    };
    let response = {
      status: {
        code: 200,
        description: 'OK',
      },
      current_page: 1,
      data: [
        {
          rn: '1',
          timestamp_action: '2018-03-06 16:10:21',
          user_id: '5',
          ip_address: '::1',
          activity: 'created Geolocation',
          record_id: '60757',
        },
        {
          rn: '2',
          timestamp_action: '2018-03-06 15:12:41',
          user_id: '5',
          ip_address: '::1',
          activity: 'created Role',
          record_id: null,
        },
        {
          rn: '3',
          timestamp_action: '2018-02-28 08:09:13',
          user_id: '5',
          ip_address: '::1',
          activity: 'created Role',
          record_id: null,
        },
      ],
      from: 1,
      last_page: 1,
      next_page_url: null,
      path: 'http://coreapi.skyware.systems/api/employee/99999999/activity',
      per_page: 20,
      prev_page_url: null,
      to: 3,
      total: 3,
    };

    let mockResponse = {
      headers: createRequestHeaders([
        ['Content-Type', 'application/json; UTF=888'],
      ]),
      data: response,
      ok: true,
      status: 200,
    };
    let customFetch = {
      get: jest.fn(() => Promise.resolve(mockResponse)),
      post: jest.fn(() => Promise.resolve(mockResponse)),
      put: jest.fn(() => Promise.resolve(mockResponse)),
    };
    let EmployeeAPI = createEmployeeAPI(customFetch);
    let result = await EmployeeAPI.getEmployeeActivities({...request});
    expect(customFetch.get).toHaveBeenCalledWith(
      `/employee/${request.employeeID}/activity`,
      {
        params: {
          l: request.limit,
          page: request.page,
        },
      },
    );
    expect(result).toEqual(response);
  });
});
