import { defineStore } from 'pinia';
import { login, getUserInfo, loginOut } from '/@/api/sys/user';
import router from '/@/router';
import { pagePath, cacheKey } from '/@/common/constant';
import useMenuSiderStore from './useMenuSider';
import { getLocCache, setLocCache } from '/@/utils/localCache';

const useStoreOut = defineStore('user', {
  state: () => ({
    token: '',
    pageLoading: false,
    userInfo: {},
  }),
  getters: {
    getLoginToken() {
      return this.token || getLocCache(cacheKey.LOGIN_TOKEN);
    },
    getUserInfo() {
      return this.userInfo || getLocCache(cacheKey.USER_INFO);
    },
    getLoadingPage() {
      return this.pageLoading;
    },
  },
  actions: {
    setLoginToken(data) {
      this.token = data || '';
      setLocCache(cacheKey.LOGIN_TOKEN, data);
    },

    setUserInfo(info) {
      this.userInfo = info || {};
      setLocCache(cacheKey.USER_INFO, info);
    },

    setLoadingPage(flag) {
      this.pageLoading = flag;
    },

    /**
     * @description: 登录
     */
    async login(data) {
      try {
        const res = await login(data);
        const { token = '' } = res;
        this.setLoginToken(token);
        setLocCache(cacheKey.LOGIN_TOKEN, token);
        await this.afterLoginAction(true);
      } catch (error) {
        Promise.reject(error);
      }
    },

    /**
     * @description: 获取用户信息
     */
    async afterLoginAction(goHome = true) {
      const useMenuSider = useMenuSiderStore();
      try {
        if (!this.getLoginToken) return;
        const userInfo = await getUserInfo();
        this.setUserInfo(userInfo);
        setLocCache(cacheKey.USER_INFO, userInfo);
        const routes = await useMenuSider.buildMenuRoutes(goHome);
        routes.forEach((route) => {
          router.addRoute(route);
        });
        goHome && router.replace(pagePath.BASE_HOME);
      } catch (error) {
        Promise.reject(error);
      }
    },

    /**
     * @description: 登出，清空缓存
     */
    async loginOut(goLogin = false) {
      if (this.getLoginToken) {
        try {
          await loginOut();
        } catch {
          Promise.reject('注销Token失败');
        }
      }
      this.setLoginToken('');
      this.setUserInfo(null);
      localStorage.clear();
      sessionStorage.clear();
      goLogin && router.replace(pagePath.BASE_LOGIN);
    },
  },
});

export default useStoreOut;
