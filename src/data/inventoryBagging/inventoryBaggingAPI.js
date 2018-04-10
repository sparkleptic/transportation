// @flow

import fetchJSON from '../../helpers/fetchJSON';

import type {Bag} from '../inventoryBagging/InventoryBagging-type';

type PutConnoteInBagParams = {
  nodeID: number,
  activeBag: ?Bag,
  connoteNumber: string,
};

type CloseBagParams = {
  bagID: number,
  nodeID: number,
};

export function createInventoryBaggingAPI(fetch: Fetch) {
  return {
    putConnoteInBag(params: PutConnoteInBagParams) {
      let {nodeID, connoteNumber, activeBag} = params;

      let fetchParams = {};
      if (activeBag && activeBag.bagID) {
        fetchParams = {
          ...fetchParams,
          bag_id: activeBag.bagID,
        };
      }
      return fetch
        .post('/bag', {
          n: nodeID,
          value_no: connoteNumber,
          ...fetchParams,
        })
        .then((response) => response.data);
    },
    closeBag(params: CloseBagParams) {
      let {bagID, nodeID} = params;
      return fetch
        .put(`/bag/status/${bagID}`, {n: nodeID})
        .then((response) => response.data);
    },
  };
}

export default createInventoryBaggingAPI(fetchJSON);
