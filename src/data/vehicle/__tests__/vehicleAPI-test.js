// @flow

import {createVehicleAPI} from '../vehicleAPI';
import createRequestHeaders from '../../../helpers/createRequestHeaders';

describe('vehicleAPI', () => {
  it('should request the correct data based on vehicle ID', async () => {
    let vehicleID = 123;
    let response = {
      data: {
        status: {
          code: 200,
        },
        data: {
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
          type: {
            vehicle_type_id: 1,
            type_name: 'Motorbike',
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
    let VehicleAPI = createVehicleAPI(customFetch);
    let result = await VehicleAPI.getVehicleDetail({vehicleID});
    expect(customFetch.get).toHaveBeenCalledWith(`/vehicle/${vehicleID}`, {});
    expect(result).toEqual(response);
  });

  it('should request activity endpoint with the right params', async () => {
    let request = {
      vehicleID: 123,
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
          manifest_no: 'Deliver Package A',
          created_on: '2018-03-14 01:05:14',
        },
        {
          manifest_no: 'Deliver Package B',
          created_on: '2018-02-28 08:09:13',
        },
      ],
      from: 1,
      last_page: 1,
      next_page_url: null,
      path: 'http://coreapi.skyware.systems/api/vehicle/99999999/activity',
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
    let VehicleAPI = createVehicleAPI(customFetch);
    let result = await VehicleAPI.getVehicleActivities({...request});
    expect(customFetch.get).toHaveBeenCalledWith(
      `/vehicle/${request.vehicleID}/activity`,
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
