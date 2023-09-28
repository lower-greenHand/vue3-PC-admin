import { loginTimeout } from '../error';

export default [
  {
    url: '/basic-api/login',
    method: 'post',
    timeout: 2000,
    statusCode: 200,
    response: ({ body }) => {
      if (body.usename == 'admin' && body.password == 'admin@123') {
        return {
          code: '0000',
          message: 'ok',
          status: true,
          data: {
            token: 'success_login_1234567898765432',
          },
        };
      } else {
        return {
          code: '4002',
          status: false,
          message: body.usename != 'admin' ? '用户名错误' : '用户密码错误',
        };
      }
    },
  },
  {
    url: '/basic-api/getUsers',
    method: 'get',
    timeout: 500,
    statusCode: 200,
    response: ({ headers }) => {
      if (headers.authorization && headers.authorization.split('Bearer')[1]) {
        return {
          code: '0000',
          message: 'ok',
          status: true,
          data: {
            name: 'New Trainee',
            avator: '',
            loginTime: formatDateTime(new Date()),
            role: 'manager',
            userId: null,
            // 'rows|10': [
            //   {
            //     id: '@guid',
            //     name: '@cname',
            //     'age|20-30': 23,
            //     'job|1': ['前端工程师', '后端工程师', 'UI工程师', '需求工程师'],
            //   },
            // ],
          },
        };
      } else {
        return {
          ...loginTimeout,
        };
      }
    },
  },
  {
    url: '/basic-api/loginOut',
    method: 'get',
    timeout: 3000,
    statusCode: 200,
    response: ({ headers }) => {
      if (headers.authorization && headers.authorization.split('Bearer')[1]) {
        return {
          code: '0000',
          message: 'ok',
          status: true,
          data: null,
        };
      } else {
        return {
          ...loginTimeout,
        };
      }
    },
  },
];

function formatDateTime(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
