<template>
  <Row type="flex" wrap :gutter="[26, 16]" class="mamb-card-ant">
    <Col :xs="24" :sm="24" :md="24" :lg="14" :xl="14">
      <Card title="重要历史(1931.09.18-1945.08.15)">
        <ScrollList :scrollList="historyList" />
      </Card>
    </Col>
    <Col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
      <Card title="品牌">
        <AnalysisPie />
      </Card>
    </Col>
  </Row>
</template>

<script>
import { defineComponent, ref, watch, nextTick, computed } from 'vue';
import useMenuSiderStore from '/@/store/module/useMenuSider.js';
import { Row, Col, Card } from 'ant-design-vue';
import { getHistoryList } from '/@/api/dashboard.js';
import ScrollList from '/@/components/ScrollList/index.vue';
import AnalysisPie from './AnalysisPie.vue';
export default defineComponent({
  components: {
    Row,
    Col,
    Card,
    ScrollList,
    AnalysisPie,
  },
  setup() {
    const useMenuSider = useMenuSiderStore();

    const historyList = ref([]);
    const collapsed = computed(() => {
      return useMenuSider.getMenuCollapsed;
    });
    watch(
      () => collapsed.value,
      () => {
        nextTick(() => {});
      }
    );

    getHistoryList().then((res) => {
      if (res) {
        historyList.value = res.historyList || [];
      }
    });

    return { historyList };
  },
});
</script>

<style lang="less" scoped>
.mamb-card-ant {
  margin-top: 15px;
}
</style>
