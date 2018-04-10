// @flow

import {createConnoteAPI} from '../connoteAPI';
import createRequestHeaders from '../../../helpers/createRequestHeaders';

describe('ConnoteAPI', () => {
  it('should fetch connote data list', async () => {
    let params = {
      search: 'some search input',
      limit: 10,
      sortByColumn: 'name',
      sortOrderType: 'asc',
      page: 1,
      nodeID: 17,
    };
    let response = {
      data: {
        status: {
          code: 200,
        },
        data: [
          {
            connote_id: 601,
            connote_number: '000017059000002',
            from_customer_id: 6,
            from_name: 'Akai',
            from_street_address: 'Jl Panjang',
            from_administrative_address: 'Jl Panjang',
            from_email: null,
          },
        ],
        from: 1,
        last_page: 13,
        next_page_url: 'http://coreapi.skyware.systems/api/connote?n=17&page=2',
        path: 'http://coreapi.skyware.systems/api/connote',
        per_page: 20,
        prev_page_url: null,
        to: 20,
        total: 245,
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
    let ConnoteAPI = createConnoteAPI(customFetch);
    let result = await ConnoteAPI.getConnoteList(params);
    expect(customFetch.get).toHaveBeenCalledWith('/connote', {
      params: {
        s: 'some search input',
        l: 10,
        sort_by: 'name',
        sort_order: 'asc',
        page: 1,
        n: 17,
      },
    });
    expect(result).toEqual(response);
  });

  it('should not pass the params that is an empty string', async () => {
    let params = {
      search: '',
      limit: 10,
      sortByColumn: 'name',
      sortOrderType: 'asc',
      page: 1,
      nodeID: 17,
    };
    let response = {
      data: {
        status: {
          code: 200,
        },
        data: [
          {
            connote_id: 601,
            connote_number: '000017059000002',
            from_customer_id: 6,
            from_name: 'Akai',
            from_street_address: 'Jl Panjang',
            from_administrative_address: 'Jl Panjang',
            from_email: null,
          },
        ],
        from: 1,
        last_page: 13,
        next_page_url: 'http://coreapi.skyware.systems/api/connote?n=17&page=2',
        path: 'http://coreapi.skyware.systems/api/connote',
        per_page: 20,
        prev_page_url: null,
        to: 20,
        total: 245,
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
    let ConnoteAPI = createConnoteAPI(customFetch);
    let result = await ConnoteAPI.getConnoteList(params);
    expect(customFetch.get).toHaveBeenCalledWith('/connote', {
      params: {
        l: 10,
        sort_by: 'name',
        sort_order: 'asc',
        page: 1,
        n: 17,
      },
    });
    expect(result).toEqual(response);
  });
});
