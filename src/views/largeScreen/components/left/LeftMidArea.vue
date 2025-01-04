<template>
  <div class="container">
    <BorderBox12>
      <div class="completion_title">
        <ModuleTitle title="监控渠道分析" />
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
import { areaData } from './data';
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
    const accessData = ref([]);
    const firstData = ref(JSON.parse(JSON.stringify(areaData)));
    const allMax = ref(0); // 最大值
    const data_1 = ref([0, 0, 0, 0, 0, 0]); //用于控制中间的面积
    const data_2 = ref([0, 0, 0, 0, 0, 0]); //用于控制中间的面积
    const data_3 = ref([0, 0, 0, 0, 0, 0]); //用于控制中间的面积
    const data_4 = ref([0, 0, 0, 0, 0, 0]); //用于控制中间的面积
    const data_5 = ref([0, 0, 0, 0, 0, 0]); //用于控制中间的面积
    const data_6 = ref([0, 0, 0, 0, 0, 0]); //用于控制中间的面积

    onMounted(async () => {
      await initData();
      await initEchart();
    });

    // 初始化echart
    const initEchart = () => {
      partEchart.value = markRaw(echarts.init(partEchartRef.value));
      partEchart.value.setOption(
        {
          // backgroundColor: '#092A4E',
          color: [
            '#2E64FF',
            '#F0D418',
            '#FF9B42',
            '#FF6B6B',
            '#8E42FF',
            '#00e4ff',
          ],
          legend: {
            trigger: 'item',
            // orient: 'vertical',
            top: '0px',
            left: '10px',
            textStyle: {
              color: '#fff',
            },
          },
          tooltip: {
            trigger: 'item',
            formatter: function (params) {
              return params.name + ': ' + params.value + '次';
            },
          },
          radar: {
            zlevel: 11,
            shape: 'circle',
            scale: true,
            indicator: firstData.value,
            center: ['50%', '54.5%'],
            radius: '20%',
            axisNameGap: '0',
            startAngle: 90,
            axisName: {
              show: false,
              color: 'red',
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: 'rgba(32,126,255, .5)',
              },
            },
            splitLine: {
              lineStyle: {
                color: 'rgba(32,126,255, .5)',
              },
            },
            splitArea: {
              color: 'rgba(32,126,255, 0.1)',
            },
          },
          polar: {
            radius: '25%',
            center: ['50%', '54.5%'],
          },
          angleAxis: {
            zlevel: 0,
            min: 0,
            max: 360,
            axisLabel: {
              show: false,
            },
            splitLine: {
              show: false,
            },
          },
          radiusAxis: {
            zlevel: 0,
            min: 0,
            max: allMax.value,
            axisLabel: {
              color: 'rgba(29,208,240,.5)',
            },
            splitLine: {
              show: false,
            },
          },
          series: [
            {
              type: 'radar',
              symbolSize: 12,
              symbol: 'circle',
              tooltip: {
                trigger: 'none',
              },
              itemStyle: {
                label: {
                  show: true,
                  formatter: function (params) {
                    if (params.value !== 0) {
                      return params.value + '次';
                    } else {
                      return '';
                    }
                  },
                  color: '#ffffff',
                  fontSize: 12,
                  distance: 0,
                },
              },
              areaStyle: {
                color: {
                  type: 'radial',
                  x: 0.5,
                  y: 0.5,
                  r: 0.5,
                  colorStops: [
                    {
                      offset: 0,
                      color: 'rgba(32,126,255, 0.5)', // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: 'rgba(32,126,255, 0.1)', // 100% 处的颜色
                    },
                  ],
                  global: false, // 缺省为 false
                },
              },
              data: [
                {
                  value: accessData.value,
                },
                {
                  value: data_1.value,
                  itemStyle: {
                    color: '#2e64ff',
                  },
                  lineStyle: {
                    color: 'transparent', //设置折线的颜色
                  },
                },
                {
                  value: data_2.value,
                  itemStyle: {
                    color: '#f0d418',
                  },
                  lineStyle: {
                    color: 'transparent', //设置折线的颜色
                  },
                },
                {
                  value: data_3.value,
                  itemStyle: {
                    color: '#ff9b42',
                  },
                  lineStyle: {
                    color: 'transparent', //设置折线的颜色
                  },
                },
                {
                  value: data_4.value,
                  itemStyle: {
                    color: '#ff6b6b',
                  },
                  lineStyle: {
                    color: 'transparent', //设置折线的颜色
                  },
                },
                {
                  value: data_5.value,
                  itemStyle: {
                    color: '#8e42ff',
                  },
                  lineStyle: {
                    color: 'transparent', //设置折线的颜色
                  },
                },
                {
                  value: data_6.value,
                  itemStyle: {
                    color: '#00e4ff',
                  },
                  lineStyle: {
                    color: 'transparent', //设置折线的颜色
                  },
                },
                {
                  value: [0, 0, 0, 0, 0, 0],
                  // name: '违章占比',
                  symbolSize: 13,
                  itemStyle: {
                    color: 'rgba(40, 97, 132)',
                  },
                },
              ],
              zlevel: 20,
              z: 4,
            },
            {
              type: 'pie',
              startAngle: 90,
              clockwise: false, //逆时针
              data: areaData.map((item) => {
                return {
                  name: item.name,
                  value: item.value,
                };
              }),
              top: '30px',
              radius: ['35%', '50%'],
              zlevel: -1,
              label: {
                // formatter: '{d}%',
                // position: 'top',
                fontSize: '12',
                color: '#fff',
              },
            },
          ],
        },
        true
      );
    };

    //  初始化数据
    const initData = () => {
      firstData.value.forEach((item) => {
        accessData.value.push(item.value);
      });
      let maxNum = Math.max(accessData.value);
      allMax.value = ceilNumber(maxNum);
      firstData.value.forEach((item) => {
        item.max = allMax.value;
      });
      data_1.value[0] = accessData.value[0];
      data_2.value[1] = accessData.value[1];
      data_3.value[2] = accessData.value[2];
      data_4.value[3] = accessData.value[3];
      data_5.value[4] = accessData.value[4];
      data_6.value[5] = accessData.value[5];
    };

    // 向上取整十，整百，整千，整万的方法
    const ceilNumber = (number) => {
      let bite = 0;
      if (number < 10) {
        return 10;
      }
      while (number >= 10) {
        number /= 10;
        bite += 1;
      }
      return Math.ceil(number) * Math.pow(10, bite);
    };

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
