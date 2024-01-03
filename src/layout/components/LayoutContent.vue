<template>
  <div class="vue-sys-content">
    <Content class="sys-ant-content">
      <Spin
        size="large"
        :spinning="spinning"
        :wrapperClassName="
          spinning ? 'no-spin-scroll' : 'no-spin-scroll spin-scroll'
        "
      >
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component
              :is="Component"
              v-if="routes.meta.keepAlive"
              :key="routes.path"
            />
          </keep-alive>
          <component
            :is="Component"
            v-if="!routes.meta.keepAlive"
          /> </router-view
      ></Spin>
    </Content>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from 'vue';
import { Layout, Spin } from 'ant-design-vue';
import { useRoute } from 'vue-router';
import useStoreOut from '/@/store/module/use';
export default defineComponent({
  components: {
    Content: Layout.Content,
    Spin,
  },
  setup() {
    const routes = useRoute();
    const useStore = useStoreOut();
    const spinning = computed(() => {
      return useStore.getLoadingPage || false;
    });
    return { routes, spinning };
  },
});
</script>

<style lang="less" scoped>
.vue-sys-content {
  height: calc(100vh - 101px);
  width: 100%;
  .sys-ant-content {
    height: calc(100vh - 101px);
    width: 100%;
    padding: 12px 0 12px 12px;
    overflow-y: scroll;
    background: @all-bg-color;
    .no-spin-scroll {
      overflow: hidden;
      height: 100%;
      width: 100%;
    }
    .spin-scroll {
      height: 100%;
      overflow-y: scroll;
    }
    ::v-deep(.ant-spin-container) {
      height: 100%;
    }
    ::v-deep(.ant-spin-nested-loading > div > .ant-spin) {
      max-height: none;
    }
  }
}
</style>
