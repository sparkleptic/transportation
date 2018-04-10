import fetchJSON from '../../helpers/fetchJSON';

export function createBookingAPI(fetch) {
  return {
    getBookingList(params) {
      let {search, rowsPerPage, sort_by, sort_order, page, activeNode} = params;

      let additionalParams = {};

      if (search) {
        additionalParams = {
          ...additionalParams,
          s: search,
        };
      }

      if (sort_by) {
        additionalParams = {
          ...additionalParams,
          sort_by: sort_by,
        };
      }

      if (sort_order) {
        additionalParams = {
          ...additionalParams,
          sort_order: sort_order,
        };
      }

      return fetch
        .get('/transport_book', {
          params: {
            l: rowsPerPage,
            page: page,
            n: activeNode,
            ...additionalParams,
          },
        })
        .then((response) => response.data);
    },
  };
}

export default createBookingAPI(fetchJSON);
