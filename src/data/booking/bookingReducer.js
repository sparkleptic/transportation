const initialState = {
  data: [],
  nextPageUrl: null,
  prevPageUrl: null,
  total: 0,
  rowsPerPage: 5,
  page: 1,
  orderBy: '',
  order: 'asc',
  loading: false,
  search: ''
};

export default function bookingReducer(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_BOOKING': {
      return {
        ...state,
        ...action
      }
    }
    case 'GET_BOOKING_LIST_REQUESTED': {
      return {
        ...state,
        loading: true,
      };
    }
    case 'GET_BOOKING_LIST_SUCCEED': {
      let {data, nextPageUrl, prevPageUrl, total} = action;
      return {
        ...state,
        ...action,
        loading: false,
      };
    }
    case 'RESET_BOOKING_LIST_DATA': {
      return initialState;
    }
    case 'SIGN_OUT_SUCCEED': {
      return initialState;
    }
    default:
      return state;
  }
}
