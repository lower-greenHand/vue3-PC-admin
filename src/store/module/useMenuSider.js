import { defineStore } from 'pinia';
import { getMenuList } from '/@/api/sys/user';
import { isArray } from '/@/utils/is';
import { message } from 'ant-design-vue';
import { setLocCache, getLocCache } from '/@/utils/localCache/index';
import { cacheKey } from '/@/common/constant';
const useMenuSiderStore = defineStore('useMenuSider', {
  state: () => ({
    collapsed: false, // menu collapsed
    menuList: [], // menu list
  }),
  getters: {
    getMenuCollapsed() {
      return this.collapsed;
    },

    getRoutesList() {
      return this.menuList;
    },
  },

  actions: {
    setMenuCollapsed(flag) {
      this.collapsed = flag;
    },
    setRoutesList(list) {
      this.menuList = list || [];
      // setLocCache(cacheKey.USER_MENU_LIST, list);
    },

    /**
     * @description build menu routes
     */
    async buildMenuRoutes(unload) {
      let routes = [];
      let routeList = [];
      if (unload) {
        message.loading({
          content: '菜单加载中。。。',
          key: 'updatable',
        });
      }
      try {
        const data = await getMenuList();
        routeList = await this.handleMenuList(data);
        routeList = await this.convertChildPath(routeList);
        if (routeList && routeList.length > 1) {
          const routeRediect = {
            path: '/',
            redirect: routeList[0].path,
            name: 'Layout',
            meta: {
              title: 'Redirect',
            },
            component: () => import('/@/layout/index.vue'),
            children: [...routeList],
          };
          routes = [routeRediect];
          this.setRoutesList(routeList);
          // setLocCache(cacheKey.USER_MENU_LIST, routeList);
        } else {
          routes = [];
        }
      } catch (error) {
        console.error(error);
      }

      return routes;
    },

    // handle menu list
    async handleMenuList(menuLists) {
      if (!isArray(menuLists)) return [];
      const list = await Promise.all(
        menuLists.map(async (item) => {
          const route = {
            key: item.key,
            parentKey: item.parentKey,
            component:
              item.component != 'Layout'
                ? await this.tranformToRoute(item.component)
                : null,
            sort: item.sort,
            path: item.path,
            name: item.name,
            redirect: item.redirect,
            icon: item.icon,
            disabled: item.disabled,
            isHideChildMenu: item?.isHideChildMenu || true, // 收起当前菜单外的其他展开菜单列表
            meta: {
              title: item.title,
              keepAlive: item.keepAlive,
            },
            children: [],
          };
          if (item.children && item.children.length > 0) {
            route.children = await this.handleMenuList(item.children);
          }
          return route;
        })
      );
      return list;
    },

    // Convert component
    async tranformToRoute(component) {
      const list = import.meta.glob('../../views/**/*.{vue,jsx}');
      const routeKeys = Object.keys(list);
      const mateKey = routeKeys.filter((item) => {
        const _r = item.replace('../..', '');
        const startSign = component.startsWith('/');
        const endSign =
          component.endsWith('.vue') || component.endsWith('.jsx');
        const startIndex = startSign ? 0 : 1;
        const endIndex = endSign ? _r.length : _r.lastIndexOf('.');
        return _r.substring(startIndex, endIndex) === component;
      });

      if (mateKey?.length == 1) {
        return list[mateKey[0]];
      } else if (mateKey?.length > 1) {
        console.warn(
          'Please do not create `.vue` and `.JSX` files with the same file name in the same hierarchical directory under the views folder. This will cause dynamic introduction failure'
        );
        return;
      } else {
        console.warn(
          '在src/views/下找不到`' +
            component +
            '.vue` 或 `' +
            component +
            '.jsx`, 请自行创建!'
        );
        return;
      }
    },
    // convert children path
    convertChildPath(list) {
      if (!isArray(list)) return [];
      const routerMap = list.map((item) => {
        if (item.children && item.children.length) {
          item.children = item.children.map((route) => {
            route.path = `${item.path || ''}${
              route.path
                ? route.path[0] == '/'
                  ? route.path
                  : '/' + route.path
                : ''
            }`;
            route.path =
              route.path.indexOf('//') != -1
                ? route.path.replace(/\/\//g, '/')
                : route.path;
            route.path = route.path[0] == '/' ? route.path : '/' + route.path;

            return route;
          });
          item.redirect = item.children[0].path;
        }
        return item;
      });
      return routerMap;
    },
  },
});

export default useMenuSiderStore;
