import connoteSearchReducer from '../connoteSearchReducer';

describe('connoteSearchReducer', () => {
  it('should return new state with the given data', () => {
    let mockData = [
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
    ];

    let mockInitState = {
      connoteID: null,
      detailInfo: null,
      fetchLoading: false,
      activity: {
        list: [],
        total: 0,
        isLoading: false,
      },
    };

    let getConnoteByIdRequested = {
      type: 'GET_CONNOTE_BY_ID_REQUESTED',
      id: 639,
    };

    let getConnoteByIdSuccess = {
      type: 'GET_CONNOTE_BY_ID_SUCCESS',
      data: mockData,
    };

    let newState = connoteSearchReducer(mockInitState, {});
    expect(newState).toEqual(mockInitState);

    // fetch requested
    newState = connoteSearchReducer(newState, getConnoteByIdRequested);
    expect(newState).toEqual({
      connoteID: 639,
      detailInfo: null,
      fetchLoading: true,
      activity: {
        list: [],
        total: 0,
        isLoading: false,
      },
    });

    // after fetch done
    newState = connoteSearchReducer(newState, getConnoteByIdSuccess);
    expect(newState).toEqual({
      connoteID: 639,
      detailInfo: mockData,
      fetchLoading: false,
      activity: {
        list: [],
        total: 0,
        isLoading: false,
      },
    });
  });
});
