const errorRoutes = [
  // 404页面
  {
    path: '/:pathMatch(.*)*',
    component: () => import('/@/layout/index.vue'),
    meta: {
      title: 'ErrorPage',
    },
    hidden: true,
    children: [
      {
        path: '/:pathMatch(.*)*',
        meta: {
          title: 'Admin',
        },
        hidden: true,
        component: () => import('/@/views/sys/error/index.vue'),
      },
    ],
  },
];

export default errorRoutes;
