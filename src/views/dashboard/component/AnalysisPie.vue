<template>
  <div class="pie-analysis">
    <div ref="pieEchart" :style="{ width, height }"></div>
  </div>
</template>

<script>
import { defineComponent, onMounted, nextTick, ref, markRaw } from 'vue';
import * as echarts from 'echarts';
import Bus from '/@/utils/bus.js';
export default defineComponent({
  props: {
    width: {
      default: '100%',
    },
    height: {
      default: '300px',
    },
  },
  setup() {
    const pieEchart = ref(null);
    const myPieEchart = ref(null);

    // 初始化pie数据
    const initPieEchart = () => {
      myPieEchart.value = markRaw(echarts.init(pieEchart.value));
      myPieEchart.value.setOption({
        tooltip: {
          trigger: 'item',
        },
        legend: {
          top: 'bottom',
          itemHeight: 12,
          itemWidth: 20,
        },
        series: [
          {
            type: 'pie',
            radius: [20, 110],
            center: ['50%', '45%'],
            roseType: 'area',
            percentPrecision: 2, // 间距
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 2,
              borderRadius: 8,
            },
            data: [
              { value: 40, name: '华为' },
              { value: 38, name: '苹果' },
              { value: 32, name: '小米' },
              { value: 30, name: '三星' },
              { value: 28, name: 'vivo' },
              { value: 26, name: '荣耀' },
              { value: 22, name: '其他' },
            ],
          },
        ],
      });
    };

    Bus.on('update-data', (flag) => {
      if (flag) {
        setTimeout(() => {
          adaptionWidth();
        }, 200);
      } else {
        adaptionWidth();
      }
    });

    // echart自适应
    const adaptionWidth = () => {
      nextTick(() => {
        myPieEchart.value.resize({
          animation: {
            duration: 300,
            easing: 'quadraticIn',
          },
        });
      });
    };
    onMounted(() => {
      initPieEchart();
    });

    return { pieEchart };
  },
});
</script>

<style lang="less" scoped></style>
