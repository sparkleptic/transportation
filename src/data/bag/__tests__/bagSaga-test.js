// @flow

import {call, put, takeEvery, select} from 'redux-saga/effects';
import {cloneableGenerator} from 'redux-saga/utils';

import {bagSagaWatcher, getBagListSaga} from '../bagSaga';
import bagAPI from '../bagAPI';
import convertSnakeCasedToCamelCase from '../../../helpers/convertSnakeCasedToCamelCase';

describe('bagSaga', () => {
  it('Should watch every watcher and run the correct saga', () => {
    let generator = bagSagaWatcher();
    expect(generator.next().value).toEqual(
      takeEvery('GET_BAG_LIST_REQUESTED', getBagListSaga),
    );
  });

  it('should fetch the bag data list', () => {
    let params = {
      search: '',
      limit: 10,
      sortByColumn: '',
      sortOrderType: 'asc',
      page: 1,
      nodeID: 17,
    };
    let action = {
      type: 'GET_BAG_LIST_REQUESTED',
      ...params,
    };

    let response = {
      status: {
        code: 200,
      },
      data: [
        {
          bag_date: null,
          bag_id: 37,
          bag_no: 'CGK123456789211111',
          created_by: null,
          destination: 'jakarta',
          employee: null,
          origin: 'bogor',
          status: 'Close',
          updated_by: null,
          weight: null,
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

    let generator = getBagListSaga(action);
    expect(generator.next().value).toEqual(call(bagAPI.getBagList, params));
    expect(generator.next(response).value).toEqual(
      put({
        type: 'GET_BAG_LIST_SUCCEED',
        data: convertedData,
        nextPageUrl: response.next_page_url,
        prevPageUrl: response.prev_page_url,
        total: response.total,
      }),
    );
  });
});
