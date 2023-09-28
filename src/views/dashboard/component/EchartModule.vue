<template>
  <div class="mamb-echart">
    <div class="title">流动趋势图</div>
    <div class="echart-case">
      <div ref="echartCase" :style="{ width, height }"></div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, markRaw, nextTick } from 'vue';
import { Row, Col } from 'ant-design-vue';
import * as echarts from 'echarts';
import {
  typeList,
  mouthList,
  accessData,
  downAcount,
  recognitionRate,
} from '../basicData';
import Bus from '/@/utils/bus.js';

export default defineComponent({
  components: {
    Row,
    Col,
  },
  props: {
    width: {
      default: '100%',
    },
    height: {
      default: '300px',
    },
  },
  setup() {
    const myEchart = ref(null);
    const echartCase = ref(null);

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
        myEchart.value.resize({
          animation: {
            duration: 300,
            easing: 'quadraticIn',
          },
        });
      });
    };

    // 初始化柱状图，折线图数据
    const initEchartData = () => {
      // markRaw：不会被vue响应式跟踪、处理
      myEchart.value = markRaw(echarts.init(echartCase.value));
      myEchart.value.setOption({
        //提示
        tooltip: {
          trigger: 'axis',
          backgroundColor: '#fff',
          borderWidth: 0,
          axisPointer: {
            // 阴影层
            type: 'shadow', // line
            // lineStyle: {
            //   color: 'rgba(20, 80, 245, 1)',
            //   // width: 80,
            //   type: 'solid',
            // },
          },
          // formatter: '{b0}<br />{a1}  {c1}<br />{a0}  {c0}<br />{a2}  {c2}',
          formatter: (params) => {
            // 自定义tooltips
            let label_2 = `<div style="margin:5px 10px;color: #141414;">
                                <div style="font-size: 16px;margin-bottom:5px font-weight:bold">
                                 ${params[0].axisValue}
                                </div>`;
            params.forEach((item) => {
              const result = `<div style="font-size: 14px;margin-bottom:10px;display:flex;margin-top:10px;
                                  justify-content: flex-start;align-items:center">
                                  <div style="width:10px;height:10px;border-radius: 2px;background: ${item.color};margin-right:5px"></div>
                                  <div style="color:#1414147f">${item.seriesName}</div>
                                  <div style="color: #141414;margin-left:10px;text-align: right;flex:auto">
                                    ${item.value}
                                  </div>
                              </div>`;
              label_2 += result;
            });
            return label_2;
          },
        },
        // echart事例类型
        legend: {
          data: typeList,
          right: '2%',
          top: '2%',
          itemHeight: 10,
          itemWidth: 20,
          textStyle: {
            fontSize: 14,
          },
        },
        // 表配置
        grid: {
          top: '25%',
          left: 'left',
          right: '0.2%',
          bottom: '0',
          containLabel: true, // 自动调整区间
        },
        // X轴配置
        xAxis: [
          {
            type: 'category',
            data: mouthList,
            axisPointer: {
              type: 'none',
              // shadowStyle: {
              //   color: 'rgba(0,0,0, 0)',
              // },
            },
            axisLabel: {
              show: true,
              fontSize: 12,
              color: '#000',
            },
          },
          {
            type: 'category',
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: { show: false },
            splitArea: { show: false },
            splitLine: { show: false },
            data: mouthList,
          },
        ],
        // Y轴配置
        yAxis: [
          {
            type: 'value',
            name: '',
            min: 0,
            max: 10000,
            splitNumber: 5,
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed',
                color: '#E5E6EB',
                width: 0.5,
              },
            },
            axisLabel: {
              color: '#000',
              formatter: '{value}',
            },
          },
          {
            type: 'value',
            name: '认可率',
            min: 0,
            max: 100,
            splitLine: {
              show: false,
            },
            splitNumber: 5,
            axisLabel: {
              color: '#000',
              formatter: '{value}',
            },
          },
        ],
        // 数据
        series: [
          {
            name: '下载数量',
            type: 'bar',
            barWidth: 30,
            xAxisIndex: 1,
            zlevel: 3,
            itemStyle: {
              borderRadius: [10, 10, 0, 0],
              color: '#CCDDFF',
              // color: new echarts.graphic.LinearGradient(0, 0, 0, 0.8, [
              //   { offset: 0, color: '#0093FF' },
              //   { offset: 1, color: '#0055E9' },
              // ]), // 渐变
            },
            tooltip: {
              valueFormatter: function (value) {
                return value;
              },
            },
            data: downAcount,
          },
          {
            name: '访问人数',
            type: 'bar',
            barWidth: 45,
            xAxisIndex: 0,
            zlevel: 2,
            tooltip: {
              valueFormatter: function (value) {
                return value;
              },
            },
            itemStyle: {
              borderRadius: [10, 10, 0, 0],
              color: '#99BBFF',
              // color: new echarts.graphic.LinearGradient(0, 0, 0, 0.8, [
              //   { offset: 0, color: '#91C9FF' },
              //   { offset: 1, color: '#9FD0FF' },
              // ]),
            },
            data: accessData,
          },
          {
            smooth: true,
            name: '认可率',
            type: 'line',
            yAxisIndex: 1,
            zlevel: 1,
            symbolSize: 1,
            tooltip: {
              // 处理鼠标悬浮提示
              valueFormatter: function (value) {
                return value;
              },
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 0.8, [
                { offset: 0, color: '#00FFFF' },
                { offset: 1, color: 'rgba(163,208,252,0)' },
              ]),
            },
            itemStyle: {
              color: '#00FFFF',
            },
            data: recognitionRate,
          },
        ],
      });
    };
    onMounted(() => {
      initEchartData();
    });

    return {
      myEchart,
      echartCase,
    };
  },
});
</script>

<style lang="less" scoped>
.mamb-echart {
  padding: 16px 0;
  width: 100%;
  .title {
    font-size: 18px;
    font-weight: bold;
  }
  .echart-case {
    width: 98%;
    margin-top: 16px;
  }
}
</style>
