import axios from 'axios';
import Constants from '../constants/Constants';

/**
create an axios client with defaults

 */
const getBaseUrl = () => {
  return Constants.HOST_URL;
};

export const client = axios.create({
  baseURL: getBaseUrl(),
  timeout: 40000,
  headers: {
    //Authorization: "Bearer 14154151",
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

/**
 *   Request wrapper with default success/error actions
 */

const request = function(options) {
  const onSuccess = function(response) {
    if (response.status == 401) {
      console.log('Invalid token');
    }
    return response.data;
  };

  const onError = function(error) {
    //console.log("---------- error.status ------------ =",error.status)
    //console.log("---------- error.error ------------ =", error.error);
    //  console.log("request failed", error.config);
    console.log('error request==', error);
    if (error.response) {
      //Request was made but server responded with something
      // other than 2xx
      // console.log("Status:", error.response.status);
      // console.log("Data:", error.response.data);
      // console.log("Headers:", error.response.headers);
    } else {
      //Something else happened while setting up the request
      //triggered the error

      console.log('Error message request:', error.message);
    }

    return Promise.reject(error.response || error.message);
  };
  return client(options)
    .then(onSuccess)
    .catch(onError);
};

export default request;
