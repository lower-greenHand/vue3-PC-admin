import service from './axios';

class requestHttp {
  constructor() {}
  get(url, data, config) {
    return this.request('GET', url, { params: data }, config);
  }
  post(url, data, config) {
    return this.request('POST', url, { data }, config);
  }
  put(url, data, config) {
    return this.request('PUT', url, { data }, config);
  }
  delete(url, data, config) {
    return this.request('DELETE', url, { params: data }, config);
  }
  request(method = 'GET', url, data, config) {
    return new Promise((resolve, reject) => {
      service({ method, url, ...data, ...config })
        .then((res) => {
          try {
            resolve(res);
          } catch (err) {
            reject(err || new Error('request error!'));
          }
        })
        .catch((e) => reject(e || new Error('request error!')));
    });
  }
}

export default new requestHttp();
