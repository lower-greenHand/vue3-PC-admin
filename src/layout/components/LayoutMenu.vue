<template>
  <div class="menu-list">
    <Menu
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      class="vue-sys-menu"
      style="width: 100%"
      mode="inline"
    >
      <template v-for="item in menuList" :key="item.key">
        <template v-if="item.children && item.children.length > 0">
          <SubMenu :key="item.key">
            <template #icon>
              <SvgIcon :name="item.icon" size="17" />
              <!-- <AppstoreOutlined /> -->
            </template>
            <!-- <SvgIcon :name="item.icon" /> -->
            <template #title>{{ item.meta.title }}</template>
            <MenuItem
              v-for="obj in item.children"
              :key="obj.key"
              :disabled="obj.disabled"
            >
              <router-link :to="obj.path">
                <span>{{ obj.meta.title }}</span>
              </router-link>
            </MenuItem>
          </SubMenu>
        </template>
        <template v-else>
          <MenuItem :key="item.key" :disabled="item.disabled">
            <template #icon>
              <SvgIcon :name="item.icon" size="17" />
            </template>
            <router-link :to="item.path">
              <span>{{ item.meta.title }}</span>
            </router-link>
          </MenuItem>
        </template>
      </template>
    </Menu>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';
import { Menu, SubMenu } from 'ant-design-vue';
import SvgIcon from '/@/components/SvgIcon/index.vue';
import {
  MailOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from '@ant-design/icons-vue';
import { useRoute } from 'vue-router';
import useMenuSiderStore from '/@/store/module/useMenuSider.js';
import { isArray } from '/@/utils/is';
export default defineComponent({
  components: {
    Menu,
    SubMenu,
    MenuItem: Menu.Item,
    SvgIcon,
    MailOutlined,
    CalendarOutlined,
    AppstoreOutlined,
    SettingOutlined,
  },
  setup() {
    const routes = useRoute();
    const useMenuSider = useMenuSiderStore();
    const selectedKeys = ref([]);
    const openKeys = ref([]);
    const collapsed = ref(false);
    const menuList = ref(useMenuSider.getRoutesList);

    // 监听路由变化

    const querySelectedKeys = (path, arrList) => {
      if (!isArray(arrList)) return;
      arrList.forEach((item) => {
        if (item.path == path) {
          selectedKeys.value = Array(item.key);
          if (item.isHideChildMenu) openKeys.value = [];
        } else {
          if (item.children && item.children.length > 0) {
            const arr = item.children.find((el) => el.path == path);
            if (arr) {
              selectedKeys.value = Array(arr.key);
              openKeys.value = Array(item.key);
            }
          }
        }
      });
    };

    watch(
      () => routes.path,
      (newValue) => {
        querySelectedKeys(newValue, menuList.value);
      },
      {
        immediate: true,
      }
    );

    return { selectedKeys, collapsed, openKeys, menuList };
  },
});
</script>

<style lang="less" scoped>
.menu-list {
  .vue-sys-menu {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .vue-sys-menu::-webkit-scrollbar {
    width: 0;
  }
  ::v-deep(.ant-menu-inline .ant-menu-item) {
    margin-top: 0;
  }

  ::v-deep(.ant-menu-inline > .ant-menu-item) {
    height: 45px;
    line-height: 45px;
  }
}
</style>
