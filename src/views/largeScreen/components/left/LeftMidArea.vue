<template>
  <div class="container">
    <BorderBox12>
      <div class="completion_title">
        <ModuleTitle title="监控组成部分" />
      </div>
      <div class="part-echart">
        <div ref="partEchartRef" :style="{ width, height }"></div>
      </div>
    </BorderBox12>
  </div>
</template>

<script>
import { defineComponent, onMounted, markRaw, ref } from 'vue';
import { BorderBox12 } from '@kjgl77/datav-vue3';
import ModuleTitle from '../ModuleTitle.vue';
import * as echarts from 'echarts';
export default defineComponent({
  name: 'LeftMidArea',
  components: {
    BorderBox12,
    ModuleTitle,
  },
  props: {
    width: {
      default: '100%',
    },
    height: {
      default: '320px',
    },
  },
  setup() {
    const partEchartRef = ref(null); // 图表
    const partEchart = ref(null);

    onMounted(() => {});

    return { partEchartRef };
  },
});
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  .completion_title {
    padding: 15px 30px;
  }
  .part-echart {
    margin: 0 25px;
    height: 320px;
  }
}
</style>
