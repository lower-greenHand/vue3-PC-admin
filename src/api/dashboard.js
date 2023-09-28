import requestHttp from '/@/utils/http/request';

const Api = {
  HistoryList: '/basic-api/history',
  BasicData: '/basic-api/dashboardBasic',
};

export const getHistoryList = () => {
  return requestHttp.get(Api.HistoryList, null, {
    requestOptions: { isTransformResponse: false },
  });
};

export const getBasicData = () => {
  return requestHttp.get(Api.BasicData);
};
