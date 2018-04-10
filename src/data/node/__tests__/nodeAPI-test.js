// @flow

import {createNodeAPI} from '../nodeAPI';
import createRequestHeaders from '../../../helpers/createRequestHeaders';

describe('nodeAPI', () => {
  it('should request the correct data based on node ID', async () => {
    let nodeID = 123;
    let response = {
      data: {
        status: {
          code: 200,
        },
        data: {
          node_id: 17,
          node_name: 'JNE Explore',
          parent_node_id: 1814,
          node_type_id: 8,
          agent_name: null,
          node_address: 'Jalan Tanjung Duren Raya No.17C',
          subdistrict_id: 39706,
          district_id: 4564,
          city_id: 522,
          province_id: 6,
          zip_code: 11470,
          time_zone_id: 1,
          tariff_code: 'CGK10000',
          remark: null,
          status: 'active',
          node_lat: 584.218,
          node_lon: 54.84513,
          zone_code: 'CGK',
          employee_id: 260,
          allow_special_cargo: null,
          node_code: 'CGK842',
          phone: 2156962425,
          allow_connote: 0,
          is_label: 0,
          entity_id: null,
          pic: {
            employee_id: 17,
            first_name: 'juli',
            last_name: null,
            nik: 1429758673,
            birth_date: null,
            birth_place: null,
            no_ktp: null,
            no_sim: null,
            employement_status: 'ACTIVE',
            user_id: null,
            position_id: null,
            phone_number: null,
            gender: 'M',
            work_location: 197,
            employee_lat: null,
            employee_lon: null,
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
    let NodeAPI = createNodeAPI(customFetch);
    let result = await NodeAPI.getNodeDetail({nodeID});
    expect(customFetch.get).toHaveBeenCalledWith(`/nodes/${nodeID}`, {});
    expect(result).toEqual(response);
  });

  it('should request inventory, vehicle, or employee endpoint based on type', async () => {
    let request = {
      nodeID: 123,
      type: 'inventory',
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
          connote_id: 635,
          connote_number: '000017073000004',
          from_customer_id: 1,
          from_name: 'Adi',
          from_street_address: 'Jl Panjang',
          from_administrative_address: 'Jl Panjang',
          from_email: null,
          from_zip_code: '41113',
          from_tariff_code: 'CGK10000',
          to_customer_id: null,
          to_name: 'Aris',
          to_street_address: 'Jl. Merdeka',
          to_administrative_address: 'bogor',
          to_email: null,
          to_zip_code: '43271',
          to_tariff_code: 'BDO21205',
          service_code: 'REG',
          transaction_id: 510,
          amount_insurance: '10000',
          amount_surcharge: null,
          amount_packing_fee: null,
          amount_discount: null,
          remarks: 'Barang Pecah Belah',
          user_id: 5,
          created_on: '2018-03-15 09:46:59',
          amount_price: 17000,
          description: 'Piring Hias',
          from_phone: '9287232',
          to_phone: '08765487366',
          chargeable_weight: '1',
          is_received: null,
          actual_weight: '1',
          sla_date: null,
          last_node_id: null,
          from_tlc: 'CGK',
          to_tlc: 'BDO',
          is_insurance: null,
          is_void: 0,
          status_id: 1,
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
    let NodeAPI = createNodeAPI(customFetch);
    let result = await NodeAPI.getNodeInventoryVehicleEmployeeList({
      ...request,
    });
    expect(customFetch.get).toHaveBeenCalledWith(
      `/nodes/${request.nodeID}/${request.type}`,
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
