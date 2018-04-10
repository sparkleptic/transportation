// @flow

import inventoryBaggingReducer from '../inventoryBaggingReducer';

describe('inventoryBaggingReducer', () => {
  it('should only update destination and service if it is not exist before', () => {
    let state = {
      activeBag: {
        bagID: 123,
        bagNumber: 'BAG 123xxx',
      },
      baggingItemList: [],
      isValidating: false,
      isLoading: false,
      error: null,
      service: '',
      destination: '',
    };

    let action = {
      type: 'BAG_CONNOTE_SUCCEED',
      item: {
        id: '999',
        type: 'CON',
      },
      additionalBagInfo: {
        service: 'some service',
        destination: 'some destination',
      },
    };

    let newState = inventoryBaggingReducer(state, action);

    expect(newState.service).toBe('some service');
    expect(newState.destination).toBe('some destination');

    action = {
      type: 'BAG_CONNOTE_SUCCEED',
      item: {
        id: '999',
        type: 'CON',
      },
      additionalBagInfo: {
        service: 'other service',
        destination: 'other destination',
      },
    };

    let latestState = inventoryBaggingReducer(newState, action);

    expect(latestState.service).toBe('some service');
    expect(latestState.destination).toBe('some destination');
  });
});
