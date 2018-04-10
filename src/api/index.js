import axios from 'axios';

export const BASE_API = 'http://coreapi.skyware.systems/api/';

export function getEntityList(entity, data) {
  return axios.get(`${BASE_API + entity}`, data);
}
