import axios from "axios";

import NProgress from "nprogress"; // 顶部进度条
import "nprogress/nprogress.css";


const service = axios.create({
  timeout: 30000
});

service.interceptors.request.use(
  function(config) {
    NProgress.start();
    let value = config.params;
    if (value) {
      //  todo 删除对象中为空的属性，以防接口报错
      if (value instanceof Object) {
        for (let item in value) {
          if (value[item] === "") {
            delete value[item];
          }
        }
      }
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  function(response) {
    NProgress.done();
    return Promise.resolve(response.data);
  },
  function(error) {
    NProgress.done();
    return Promise.reject(error.response);
  }
);

export default service;
