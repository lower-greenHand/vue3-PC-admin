<template>
  <Header :style="headerStyle" class="layout-header">
    <div class="header-left">
      <menu-unfold-outlined
        v-if="collapsed"
        class="trigger"
        @click="handleCollapsed"
      />
      <menu-fold-outlined v-else class="trigger" @click="handleCollapsed" />
    </div>
    <!-- 中间区域 -->
    <div style="flex: auto; margin: 0 10px"></div>
    <div class="header-right">
      <!-- 可视化大屏 -->
      <div class="large-screen" @click="jumpVisualLarerScreen">
        <SvgIcon name="large_screen" />
      </div>
      <!-- 语种 -->
      <Language />
      <Dropdown
        destroyPopupOnHide
        :getPopupContainer="getPopupContainer"
        placement="bottom"
      >
        <div class="header-avatar">
          <Avatar :src="avatorImg">
            <template #icon><UserOutlined /></template>
          </Avatar>
          <span class="title">Mamba</span>
        </div>
        <template #overlay>
          <Menu @click="handleItem">
            <MenuItem v-for="item in itemList" :key="item.key">
              <SvgIcon :name="item.icon" />
              {{ item.title }}
            </MenuItem>
          </Menu>
        </template>
      </Dropdown>
      <ForgetPassword ref="forgetPwd" />
    </div>
  </Header>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { Layout, Avatar, Dropdown, Menu, Modal } from 'ant-design-vue';
import {
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons-vue';
import useMenuSiderStore from '/@/store/module/useMenuSider.js';
import SvgIcon from '/@/components/SvgIcon/index.vue';
import Language from './Language.vue';
import avatorImg from '/@/assets/images/avatar.png';
import { itemList } from '../data';
import useStoreOut from '/@/store/module/use.js';
import ForgetPassword from './ForgetPassword.vue';
import { useRouter } from 'vue-router';
export default defineComponent({
  components: {
    Header: Layout.Header,
    Avatar,
    Language,
    UserOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    Dropdown,
    Menu,
    MenuItem: Menu.Item,
    SvgIcon,
    ForgetPassword,
  },
  setup() {
    const userStore = useStoreOut();
    const router = useRouter();
    const collapsed = ref(false);
    const forgetPwd = ref(null);
    const headerStyle = {
      height: 50,
      lineHeight: '50px',
      borderBottom: '1px solid #D9D9D9',
      backgroundColor: '#fff',
    };
    // 菜单收起展开
    const handleCollapsed = () => {
      collapsed.value = !collapsed.value;
      useMenuSiderStore().setMenuCollapsed(collapsed.value);
    };

    const getPopupContainer = (trigger) => {
      return trigger.parentNode ?? document.body;
    };

    // 跳转可视化大屏
    const jumpVisualLarerScreen = () => {
      const route = router.resolve('/large-screen');
      window.open(route.href, '_blank');
    };

    // 点击头像选择功能：修改密码，退出登录
    const handleItem = (item) => {
      if (item.key == 'loginOut') {
        Modal.confirm({
          title: '提示',
          content: '确定退出登录？',
          onOk: async () => {
            await userStore.loginOut(true);
          },
        });
      } else {
        forgetPwd.value.openModal();
      }
    };

    return {
      headerStyle,
      collapsed,
      avatorImg,
      itemList,
      forgetPwd,
      handleCollapsed,
      handleItem,
      getPopupContainer,
      jumpVisualLarerScreen,
    };
  },
});
</script>

<style lang="less" scoped>
.layout-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .trigger {
    font-size: 16px;
    color: #666;
    cursor: pointer;
    transition: color 0.3s;
  }
  .header-right {
    padding: 0 15px;
    color: #000000;
    display: flex;
    .large-screen {
      margin-right: 10px;
      cursor: pointer;
    }

    .header-avatar {
      display: flex;
      align-items: center;
      cursor: pointer;
      .title {
        margin-left: 10px;
      }
    }
    ::v-deep(.ant-dropdown) {
      min-width: 120px !important;
    }
  }
}
</style>
