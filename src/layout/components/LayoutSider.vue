<template>
  <Sider
    :style="siderStyle"
    :width="200"
    class="sider-class"
    collapsedWidth="80"
    v-model:collapsed="isCollapsed"
    :trigger="null"
    collapsible
  >
    <div class="sys-title">
      <SvgIcon name="vite" size="22" style="margin-right: 5px" />
      {{ !isCollapsed ? sys_name : '' }}
    </div>
    <LayoutMenu class="layout-menu" />
    <div class="sys-title">{{ sys_frame }}</div>
  </Sider>
</template>

<script>
import { computed, defineComponent, ref } from 'vue';
import { Layout } from 'ant-design-vue';
import LayoutMenu from './LayoutMenu.vue';
import SvgIcon from '/@/components/SvgIcon/index.vue';
import useMenuSiderStore from '/@/store/module/useMenuSider.js';
export default defineComponent({
  components: {
    Layout,
    LayoutMenu,
    SvgIcon,
    Sider: Layout.Sider,
  },
  setup() {
    const sys_name = import.meta.env.VITE_SYSTEM_NAME;
    const sys_frame = import.meta.env.VITE_SYS_FRAME;
    const siderStyle = {
      textAlign: 'center',
      minHeight: '100vh',
      maxHeight: '100vh',
      color: '#fff',
      backgroundColor: '#3ba0e9',
    };
    const isCollapsed = computed(() => {
      return useMenuSiderStore().getMenuCollapsed;
    });
    return { siderStyle, sys_name, sys_frame, isCollapsed };
  },
});
</script>

<style lang="less" scoped>
.sider-class {
  height: 100vh;
  overflow: hidden;

  ::v-deep(.ant-layout-sider-children) {
    display: flex;
    flex-direction: column;
  }

  .sys-title {
    height: @common-height;
    display: flex;
    align-items: center;
    justify-content: center;
    // line-height: @common-height;
  }
  .layout-menu {
    flex: 1;
    background: #fff;
    color: #000000;
  }
}
</style>
