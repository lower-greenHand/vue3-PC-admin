<template>
  <div class="compete-area">
    <div ref="completeEchartRef" :style="{ width, height }"></div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, markRaw, onUnmounted } from 'vue';
import * as echarts from 'echarts';
export default defineComponent({
  name: 'CompleteEchart',
  props: {
    dataValue: {
      default: 0,
    },
    textTips: {
      default: '',
    },
    width: {
      default: '100%',
    },

    height: {
      default: '130px',
    },
  },
  setup(props) {
    const completeEchartRef = ref(null);
    const completeEchart = ref(null);
    const angle = ref(0);
    const timeInterval = ref(null);

    const onInitEchart = () => {
      completeEchart.value = markRaw(echarts.init(completeEchartRef.value));
      timeInterval.value = setInterval(() => {
        angle.value += 2;
        completeEchart.value.setOption({
          // backgroundColor: '#002837',
          title: {
            text: `{v|${props.dataValue}}{unit|%}\n{t|${props.textTips || ''}}`,
            x: 'center',
            y: 'center',
            textStyle: {
              rich: {
                v: { fontSize: 22, color: '#28edf2' },
                unit: { fontSize: 14, color: '#28edf2', padding: [0, 0, 0, 2] },
                t: { fontSize: 14, color: '#28edf2', padding: [3, 0, 0, 0] },
              },
            },
          },
          series: [
            /** 绘制内部圆弧-1 <right-top> */
            {
              type: 'custom',
              coordinateSystem: 'none',
              renderItem: (params, api) => {
                return {
                  type: 'arc',
                  shape: {
                    cx: api.getWidth() / 2,
                    cy: api.getHeight() / 2,
                    r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.76,
                    startAngle: ((270 + angle.value) * Math.PI) / 180,
                    endAngle: ((360 + angle.value) * Math.PI) / 180,
                  },
                  style: {
                    fill: 'transparent',
                    stroke: 'rgba(1, 248, 68, 0.4)',
                    lineWidth: 2,
                  },
                  silent: true,
                };
              },
              data: [0],
            },
            /** 绘制内部圆弧-2 <left-bottom> */
            {
              type: 'custom',
              coordinateSystem: 'none',
              renderItem: (params, api) => {
                return {
                  type: 'arc',
                  shape: {
                    cx: api.getWidth() / 2,
                    cy: api.getHeight() / 2,
                    r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.76,
                    startAngle: ((90 + angle.value) * Math.PI) / 180,
                    endAngle: ((180 + angle.value) * Math.PI) / 180,
                  },
                  style: {
                    fill: 'transparent',
                    stroke: 'rgba(1, 248, 68, 0.4)',
                    lineWidth: 2,
                  },
                  silent: true,
                };
              },
              data: [0],
            },
            /** 绘制外部圆弧-1 <right-bottom> */
            {
              type: 'custom',
              coordinateSystem: 'none',
              renderItem: (params, api) => {
                return {
                  type: 'arc',
                  shape: {
                    cx: api.getWidth() / 2,
                    cy: api.getHeight() / 2,
                    r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.87,
                    startAngle: ((355 + -angle.value) * Math.PI) / 180,
                    endAngle: ((120 + -angle.value) * Math.PI) / 180,
                  },
                  style: {
                    fill: 'transparent',
                    stroke: 'rgba(1, 248, 68, 0.4)',
                    lineWidth: 2.6,
                  },
                  silent: true,
                };
              },
              data: [0],
            },
            /** 绘制外部圆弧-2 <left-top> */
            {
              type: 'custom',
              coordinateSystem: 'none',
              renderItem: (params, api) => {
                return {
                  type: 'arc',
                  shape: {
                    cx: api.getWidth() / 2,
                    cy: api.getHeight() / 2,
                    r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.87,
                    startAngle: ((175 + -angle.value) * Math.PI) / 180,
                    endAngle: ((300 + -angle.value) * Math.PI) / 180,
                  },
                  style: {
                    fill: 'transparent',
                    stroke: 'rgba(1, 248, 68, 0.4)',
                    lineWidth: 2.6,
                  },
                  silent: true,
                };
              },
              data: [0],
            },
            /** 绘制外部圆弧-1-开始圆点 <right-bottom> */
            {
              type: 'custom',
              coordinateSystem: 'none',
              renderItem: (params, api) => {
                let x0 = api.getWidth() / 2;
                let y0 = api.getHeight() / 2;
                let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.87;
                return {
                  type: 'circle',
                  shape: {
                    /** 角度355° 外弧1开始角度 */
                    cx:
                      x0 + r * Math.cos(((355 + -angle.value) * Math.PI) / 180),
                    cy:
                      y0 + r * Math.sin(((355 + -angle.value) * Math.PI) / 180),
                    r: 4,
                  },
                  style: {
                    fill: 'rgba(1, 248, 68, 0.4)',
                    stroke: 'rgba(1, 248, 68, 0.4)',
                  },
                  silent: true,
                };
              },
              data: [0],
            },
            /** 绘制外部圆弧-2-开始圆点 <left-top> */
            {
              type: 'custom',
              coordinateSystem: 'none',
              renderItem: (params, api) => {
                let x0 = api.getWidth() / 2;
                let y0 = api.getHeight() / 2;
                let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.87;
                return {
                  type: 'circle',
                  shape: {
                    /** 角度175° 外弧2开始角度 */
                    cx:
                      x0 + r * Math.cos(((175 + -angle.value) * Math.PI) / 180),
                    cy:
                      y0 + r * Math.sin(((175 + -angle.value) * Math.PI) / 180),
                    r: 4,
                  },
                  style: {
                    fill: 'rgba(1, 248, 68, 0.4)',
                    stroke: 'rgba(1, 248, 68, 0.4)',
                  },
                  silent: true,
                };
              },
              data: [0],
            },
            /** 刻度仪表盘 */
            {
              type: 'gauge',
              center: ['50%', '50%'],
              radius: '110%', // 错位调整此处
              startAngle: 0,
              endAngle: 360,
              axisLine: { show: false },
              splitLine: { show: false },
              axisTick: {
                splitNumber: 10,
                // length: 8,  // 刻度长度
                length: '8%',
                lineStyle: {
                  color: 'rgba(1, 248, 68, 0.4)',
                  width: 1.5,
                },
              },
              axisLabel: { show: false },
            },
            /** 内心圆 */
            {
              type: 'custom',
              coordinateSystem: 'none',
              renderItem: (params, api) => {
                return {
                  type: 'circle',
                  shape: {
                    cx: api.getWidth() / 2,
                    cy: api.getHeight() / 2,
                    r: (Math.min(api.getWidth(), api.getHeight()) / 2.3) * 0.55,
                    startAngle: ((175 + angle.value) * Math.PI) / 180,
                    endAngle: ((300 + angle.value) * Math.PI) / 180,
                  },
                  style: {
                    fill: 'transparent',
                    stroke: '#00374C80',
                    lineWidth: 2.6,
                  },
                  silent: true,
                };
              },
              data: [0],
            },
            /** 饼图 */
            {
              name: '已完成',
              type: 'pie',
              startAngle: 90,
              z: 0,
              label: {
                position: 'center',
              },
              radius: ['65%', '49%'],
              silent: true,
              animation: false, // 关闭饼图动画
              data: [
                {
                  value: props.dataValue,
                  itemStyle: {
                    color: {
                      type: 'linear',
                      x: 0,
                      y: 0.2,
                      x2: 1,
                      y2: 0,
                      colorStops: [
                        { offset: 0, color: '#01f74420' },
                        { offset: 1, color: '#01f744' },
                      ],
                    },
                  },
                },
                {
                  name: '未完成',
                  value: 100 - props.dataValue,
                  label: { show: false },
                  itemStyle: { color: '#00374C' },
                },
              ],
            },
            /** 饼图上刻度 */
            {
              type: 'gauge',
              center: ['50%', '50%'],
              radius: '96%', // 错位调整此处
              startAngle: 0,
              endAngle: 360,
              splitNumber: 12,
              axisLine: { show: false },
              splitLine: {
                // length: 39,
                length: '18%',
                lineStyle: {
                  width: 6,
                  color: '#002837',
                },
              },
              axisTick: { show: false },
              axisLabel: { show: false },
            },
          ],
        });
      }, 100);
    };

    onMounted(() => {
      onInitEchart();
    });

    onUnmounted(() => {
      clearInterval(timeInterval.value);
    });

    return { completeEchartRef };
  },
});
</script>

<style lang="less" scoped>
.compete-area {
  width: 100%;
  height: 100%;
}
</style>
