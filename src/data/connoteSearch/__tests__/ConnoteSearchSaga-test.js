import {takeEvery, call, put} from 'redux-saga/effects';
import {
  getConnoteById,
  connoteSearchSagaWatcher,
  getConnotActivitySaga,
} from '../connoteSearchSaga';
import convertSnakeCasedToCamelCase from '../../../helpers/convertSnakeCasedToCamelCase';

import connoteSearchApi from '../connoteSearchAPI';

describe('connoteSearchSaga', () => {
  it('should watch the saga', () => {
    let sagaWatcher = connoteSearchSagaWatcher();
    expect(sagaWatcher.next().value).toEqual(
      takeEvery('GET_CONNOTE_BY_ID_REQUESTED', getConnoteById),
    );
  });
  it('should fetch the data by id', () => {
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

    let action = {
      type: 'GET_CONNOTE_BY_ID_REQUESTED',
      id: 639,
      nodeID: 19,
    };

    let params = {
      id: action.id,
    };

    let connoteSaga = getConnoteById(action);

    expect(connoteSaga.next().value).toEqual(
      call(connoteSearchApi.getConnoteById, params),
    );
    expect(connoteSaga.next(response).value).toEqual(
      put({
        type: 'GET_CONNOTE_BY_ID_SUCCESS',
        data: convertSnakeCasedToCamelCase(response.data),
      }),
    );
  });

  it('should fetch connote activity data correctly with given params', () => {
    let action = {
      type: 'GET_CONNOTE_ACTIVITY_BY_ID_REQUESTED',
      id: 123,
      limit: 5,
      sortByColumn: '',
      sortOrderType: 'asc',
      page: 1,
    };
    let generator = getConnotActivitySaga(action);

    let {type, ...restOfActionParams} = action;

    expect(generator.next().value).toEqual(
      call(connoteSearchApi.getConnoteActivity, {...restOfActionParams}),
    );

    let response = {
      status: {
        code: 200,
      },
      data: [],
    };

    expect(generator.next(response).value).toEqual(
      put({
        type: 'GET_CONNOTE_ACTIVITY_BY_ID_SUCCEED',
        id: action.id,
        data: [],
        total: 0,
      }),
    );
  });
});
