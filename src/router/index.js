import { createRouter, createWebHashHistory } from 'vue-router';
import { Modal, notification } from 'ant-design-vue';
import indexRoute from './module';
import useStoreOut from '/@/store/module/use';
import errorRoutes from './module/error';
import { setInitData } from './module/routeGuard';
const Router = createRouter({
  history: createWebHashHistory(),
  strict: true,
  routes: [...indexRoute, ...errorRoutes],
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

Router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title || 'admin';
  await setInitData(to, from, next);
  Modal.destroyAll();
  notification.destroy();
});

Router.afterEach(() => {
  const useStore = useStoreOut();
  setTimeout(() => {
    useStore.setLoadingPage(false);
  }, 1000);
});

export default Router;
