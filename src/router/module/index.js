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
  {
    path: '/preview-pdf',
    name: 'PreViewPdf',
    component: () => import('/@/views/fun/pdf/previewPdf.vue'),
    meta: {
      title: 'pdf预览',
      keepAlive: false,
    },
  },
  {
    path: '/large-screen',
    name: 'LargeScreen',
    component: () => import('/@/views/largeScreen/index.vue'),
    meta: {
      title: '可视化大屏',
      keepAlive: false,
    },
  },
];

export default indexRouters;
