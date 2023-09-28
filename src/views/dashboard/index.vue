<template>
  <div class="data-board" id="data-board">
    <CardListInfo />
    <EchartModule />
    <AnalysisData />
    <BackTop :target="getDocEle" :visibilityHeight="100" />
  </div>
</template>

<script>
import {
  defineComponent,
  ref,
  onUnmounted,
  onMounted,
  watch,
  computed,
} from 'vue';
import CardListInfo from './component/CardListInfo.vue';
import EchartModule from './component/EchartModule.vue';
import AnalysisData from './component/AnalysisData.vue';
import Bus from '/@/utils/bus.js';
import useMenuSiderStore from '/@/store/module/useMenuSider.js';
import { BackTop } from 'ant-design-vue';
export default defineComponent({
  components: {
    CardListInfo,
    EchartModule,
    AnalysisData,
    BackTop,
  },
  setup() {
    const useMenuSider = useMenuSiderStore();
    const screenWidth = ref(
      window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth
    );

    const collapsed = computed(() => {
      return useMenuSider.getMenuCollapsed;
    });

    watch(
      () => collapsed.value,
      () => {
        Bus.emit('update-data', true);
      }
    );

    watch(
      () => screenWidth.value,
      () => {
        Bus.emit('update-data', false);
      }
    );

    onMounted(() => {
      window.onresize = () => {
        return (() => {
          screenWidth.value =
            window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth;
        })();
      };
    });
    // 移除
    onUnmounted(() => {
      window.onresize = null;
    });

    const getDocEle = () => {
      return document.getElementById('data-board');
    };
    return { getDocEle };
  },
});
</script>

<style lang="less" scoped>
.data-board {
  height: calc(100vh - 125px);
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
}
</style>
