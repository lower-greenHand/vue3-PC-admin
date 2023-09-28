import requestHttp from '/@/utils/http/request';

const Api = {
  Login: '/basic-api/login',
  GetUserInfo: '/basic-api/getUsers',
  GetMenuList: '/basic-api/getMenu',
  LoginOut: '/basic-api/loginOut',
};

export const login = (data) => {
  return requestHttp.post(Api.Login, data);
};

export const getUserInfo = () => {
  return requestHttp.get(Api.GetUserInfo);
};

export const getMenuList = () => {
  return requestHttp.get(Api.GetMenuList);
};

export const loginOut = () => {
  return requestHttp.get(Api.LoginOut);
};
