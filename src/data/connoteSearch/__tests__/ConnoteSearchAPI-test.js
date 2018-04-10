// @flow

import createRequestHeaders from '../../../helpers/createRequestHeaders';
import {createConnoteSearchAPI} from '../connoteSearchAPI';

describe('Connote Search API', () => {
  it('should fetch the connote 639', async () => {
    let response = {
      status: {
        code: 200,
      },
      data: {
        connote_id: 639,
        connote_number: '000017073001004',
        from_customer_id: null,
        from_name: 'Fidel',
        from_street_address: 'Jakarta asasa asasa asasa sasa sasa s',
        from_administrative_address: 'Jakarta asasa asasa asasa sasa sasa s',
        from_email: null,
        from_zip_code: '12345',
        from_tariff_code: 'CGK10000',
        to_customer_id: null,
        to_name: 'Fidel',
        to_street_address: 'a',
        to_administrative_address: null,
        to_email: null,
        to_zip_code: null,
        to_tariff_code: null,
        service_code: 'REG',
        transaction_id: 514,
        amount_insurance: '10000',
        amount_surcharge: null,
        amount_packing_fee: null,
        amount_discount: null,
        remarks: 'Hewan',
        user_id: 1,
        created_on: '2018-03-15 14:09:11',
        amount_price: 12000,
        description: 'Kucing',
        from_phone: '12345',
        to_phone: '12345',
        chargeable_weight: '12',
        is_received: null,
        actual_weight: '11',
        sla_date: null,
        last_node_id: null,
        from_tlc: 'CGK',
        to_tlc: null,
        is_insurance: null,
        is_void: 0,
        status_id: 1,
        node_position: {
          connote_id: 639,
          node_id: 17,
          updated_on: '2018-03-15 14:09:11',
          updated_by: null,
          node_detail: {
            node_id: 17,
            node_name: 'JNE Explore',
            parent_node_id: 1814,
            node_type_id: 8,
            agent_name: null,
            node_address: 'Jalan Tanjung Duren Raya No.17C',
            subdistrict_id: '39706',
            district_id: '4564',
            city_id: '522',
            province_id: '6',
            zip_code: '11470',
            time_zone_id: '1',
            tariff_code: 'CGK10000',
            remark: null,
            status: 'ACTIVE',
            node_lat: '584.218',
            node_lon: '54.84513',
            zone_code: 'CGK',
            employee_id: '260',
            allow_special_cargo: null,
            node_code: 'CGK842',
            phone: '2156962425',
            allow_connote: '0',
            is_label: '0',
            entity_id: null,
          },
        },
      },
    };
    let params = {
      id: 639,
      nodeID: 19,
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
    let connoteSearchAPI = createConnoteSearchAPI(customFetch);
    let result = await connoteSearchAPI.getConnoteById(params);

    expect(result).toEqual(response);
  });
  it('should hit the correct endpoint and pass correct params to fetch connote activity', async () => {
    let response = {
      status: {
        code: 200,
      },
      data: [
        {
          connote_tracking_id: 23,
          connote_number: '000017074000001',
          employee_id: null,
          internal: 0,
          type_id: 1,
          link: null,
          created_on: '2018-03-16 00:05:02',
          updated_on: '2018-03-16 00:05:02',
          description: 'Connote Created',
          connote_id: null,
          connote_tlc: null,
          node: {
            node_id: 17,
            node_code: 'CGK842',
            pic: {
              employee_id: 17,
              first_name: 'juli',
              last_name: null,
              nik: '1429758673',
              birth_date: null,
              birth_place: null,
              no_ktp: null,
              no_sim: null,
              employement_status: 'ACTIVE',
              user_id: null,
              position_id: null,
              phone_number: null,
              gender: 'M',
              work_location: '197',
              employee_lat: null,
              employee_lon: null,
            },
          },
        },
      ],
    };
    let params = {
      id: 639,
      limit: 5,
      page: 1,
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
    let connoteSearchAPI = createConnoteSearchAPI(customFetch);
    let result = await connoteSearchAPI.getConnoteActivity(params);
    expect(customFetch.get).toHaveBeenCalledWith(
      `/connote/${params.id}/activity`,
      {params: {l: 5, page: 1}},
    );
    expect(result).toEqual(response);
  });
});
