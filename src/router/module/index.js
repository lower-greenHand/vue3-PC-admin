const indexRouters = [
  {
    path: '/login',
    name: 'login',
    component: () => import('/@/views/sys/login/login.vue'),
    meta: {
      title: '登录',
      keepAlive: false,
    },
  },
];

export default indexRouters;
