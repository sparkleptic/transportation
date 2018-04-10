// @flow

import {call, put, takeEvery, select} from 'redux-saga/effects';
import {cloneableGenerator} from 'redux-saga/utils';

import {connoteSagaWatcher, getConnoteListSaga} from '../connoteSaga';
import connoteAPI from '../connoteAPI';
import convertSnakeCasedToCamelCase from '../../../helpers/convertSnakeCasedToCamelCase';

describe('connoteSaga', () => {
  it('Should watch every watcher and run the correct saga', () => {
    let generator = connoteSagaWatcher();
    expect(generator.next().value).toEqual(
      takeEvery('GET_CONNOTE_LIST_REQUESTED', getConnoteListSaga),
    );
  });

  it('should fetch the connote data list', () => {
    let params = {
      search: '',
      limit: 10,
      sortByColumn: '',
      sortOrderType: 'asc',
      page: 1,
      nodeID: 17,
    };
    let action = {
      type: 'GET_CONNOTE_LIST_REQUESTED',
      ...params,
    };

    let response = {
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
      next_page_url: 'http://nextpage.com',
      path: 'http://coreapi.skyware.systems/api/connote',
      per_page: 20,
      prev_page_url: 'http://prevpage.com',
      to: 20,
      total: 245,
    };

    let convertedData = response.data.map((datum) =>
      convertSnakeCasedToCamelCase(datum),
    );

    let generator = getConnoteListSaga(action);
    expect(generator.next().value).toEqual(
      call(connoteAPI.getConnoteList, params),
    );
    expect(generator.next(response).value).toEqual(
      put({
        type: 'GET_CONNOTE_LIST_SUCCEED',
        data: convertedData,
        nextPageUrl: response.next_page_url,
        prevPageUrl: response.prev_page_url,
        total: response.total,
      }),
    );
  });
});
