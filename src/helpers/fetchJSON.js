// @flow

import axios from 'axios';

import {API_URL} from '../constants/api';

let instance = axios.create({
  baseURL: API_URL,
});

function setDefaultHeadersConfiguration(
  key: string,
  value: string,
  type?: string = 'common',
) {
  instance.defaults.headers[type][key] = value;
}

export default instance;
export {setDefaultHeadersConfiguration};
