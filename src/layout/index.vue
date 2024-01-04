<template>
  <Layout class="layout-space">
    <!-- 菜单列表 -->
    <LayoutSider />
    <Layout class="layout-right">
      <!-- 头部 -->
      <LayoutHeader />
      <!-- 内容区 -->
      <LayoutContent />
      <!-- 底部 -->
      <LayoutFooter :style="footerStyle">
        {{ t('index.description') }}
      </LayoutFooter>
    </Layout>
  </Layout>
</template>

<script>
import { defineComponent } from 'vue';
import { Layout } from 'ant-design-vue';
import LayoutSider from './components/LayoutSider.vue';
import LayoutHeader from './components/LayoutHeader.vue';
import LayoutContent from './components/LayoutContent.vue';
import t from '/@/lang/t.js';
export default defineComponent({
  components: {
    Layout,
    LayoutSider,
    LayoutHeader,
    LayoutContent,
    LayoutFooter: Layout.Footer,
  },
  setup() {
    const footerStyle = {
      textAlign: 'center',
      color: '#fff',
      padding: 0,
      height: 50,
      lineHeight: '50px',
      backgroundColor: '#7dbcea',
    };
    return { t, footerStyle };
  },
});
</script>

<style lang="less" scoped>
.layout-space {
  width: 100%;
  height: 100%;
  .layout-right {
    width: calc(100% - 200px);

    ::v-deep(.ant-layout-header) {
      height: auto;
      padding: 0 5px;
    }
  }
}
</style>
