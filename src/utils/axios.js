

import axios from 'axios';
import qs from 'qs';




const instance = axios.create({
    method:'post',
    baseURL:'http://www.young1024.com:666',
    transformRequest: [function (data, headers) {
        
        return qs.stringify(data);
    }]
})


instance.interceptors.request.use(function (config) {
    // console.log(config)
    config.url = config.url+'?time='+Date.now()
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
export default instance;

