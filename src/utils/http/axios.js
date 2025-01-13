import axios from 'axios';
import qs from 'qs';

import useStore from '/@/store/module/use.js';

const service = axios.create({
  baseURL: import.meta.env.VITE_WEB_BASIC_URL_API || window.location.origin,
  timeout: 60 * 1000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
  requestOptions: {
    isTransformResponse: false, // 是否返回不处理的响应数据
  },
});
// 请求拦截
service.interceptors.request.use(
  (config) => {
    const userStore = useStore();
    const token = userStore.getLoginToken;
    // const contentType =
    //   config.headers?.['Content-Type'] || config.headers?.['content-type'];
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${userStore.getLoginToken}`,
      };
    }
    return { ...config };
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截
service.interceptors.response.use(
  (response) => {
    const data = response;
    const options = response.config?.requestOptions;
    if (data.status === 200) {
      const res = data?.data;
      if (!options.isTransformResponse && res.code == '0000') {
        return res.data;
      } else {
        return res;
      }
    } else if (data.status === 401) {
      return Promise.reject(new Error('认证失败!'));
    } else if (data.status == 403) {
      return Promise.reject(new Error('请求被拒绝!'));
    } else if (data.status == 404) {
      return Promise.reject(new Error('请求不存在!'));
    } else if (data.status == 500) {
      return Promise.reject(new Error('服务器错误!'));
    } else if (data.status == 500) {
      return Promise.reject(new Error('服务器系统繁忙!'));
    }
    return Promise.reject(new Error('network err!'));
  },
  (err) => {
    return Promise.reject(err.response);
  }
);

export default service;
