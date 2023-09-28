import useStoreOut from '/@/store/module/use';
import router from '/@/router';
import { pagePath } from '/@/common/constant';
// Initialized Data
export const setInitData = async (to, from, next) => {
  const useStore = useStoreOut();

  if (!useStore.getLoginToken && to.name !== 'login') {
    useStore.setLoginToken('');
    useStore.setUserInfo(null);
    // localStorage.clear();
    // sessionStorage.clear();
    router.replace(pagePath.BASE_LOGIN);
    next();
    return;
  }
  useStore.setLoadingPage(true);
  if (useStore.getLoginToken && from.path == '/' && to.name == undefined) {
    await useStore.afterLoginAction(false);
    // Refresh Page Load
    const redirectPath = from.query.redirect || to.path;
    const redirect = decodeURIComponent(redirectPath);
    const nextData =
      to.path === redirect ? { ...to, replace: true } : { path: redirect };
    next(nextData);
    return;
  }

  next();
};
