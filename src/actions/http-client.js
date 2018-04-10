
import axios from 'axios';
export const BASE_API = 'http://coreapi.skyware.systems/api/';

// add session token to all requests
const requestInterceptor = (config) => ({
  ...config,
});

class HttpClient {
  constructor() {
    const options = {baseURL: BASE_API, params: {n: sessionStorage.getItem('userNodeId')}};
    const instance = axios.create(options);

    instance.interceptors.request.use(requestInterceptor);

    axios.interceptors.response.use((response) => {
      // Do something with response data
      return response;
    }, (error) => {
      // Do something with response error
      return Promise.reject(error);
    });

    return instance;
  }
}

export default HttpClient;
