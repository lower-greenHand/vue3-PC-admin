<template>
  <div class="container">
    <BorderBox12>
      <div class="rate-title">
        <ModuleTitle title="代码访问下载" />
      </div>
      <div class="line-echart">
        <div ref="lineEchart" :style="{ width, height }"></div>
      </div>
    </BorderBox12>
  </div>
</template>

<script>
import { defineComponent, onMounted, markRaw, ref } from 'vue';
import { BorderBox12 } from '@kjgl77/datav-vue3';
import ModuleTitle from '../ModuleTitle.vue';
import * as echarts from 'echarts';
import { mouthData, visitData, downloadData } from './data';
export default defineComponent({
  name: 'LeftBottomArea',
  components: {
    BorderBox12,
    ModuleTitle,
  },
  props: {
    width: {
      default: '100%',
    },
    height: {
      default: '137px',
    },
  },
  setup() {
    const lineEchart = ref(null);
    const myLineEchart = ref(null);

    const dataMount_1 = ref([{ coords: [] }]); // 访问量
    const dataMount_2 = ref([{ coords: [] }]); // 下载量

    onMounted(async () => {
      await initData();
      await initEchart();
    });

    const initEchart = () => {
      myLineEchart.value = markRaw(echarts.init(lineEchart.value));
      myLineEchart.value.setOption(
        {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              lineStyle: {
                color: '#15ecf4',
              },
            },
            backgroundColor: 'rgba(0,0,0,.8)',
            extraCssText:
              'box-shadow: 4px 4px 10px rgba(21, 250, 255,.6);color:#fff',
            formatter: function (params) {
              var result = params[0].name + '<br>';
              params.forEach(function (item) {
                result +=
                  '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' +
                  item.color +
                  '"></span>';
                // 判断设置增长还是降低
                if (parseFloat(item.data) >= 50) {
                  result +=
                    item.seriesName +
                    ': ' +
                    '<span >增长' +
                    item.data +
                    '%</span><br>';
                } else if (parseFloat(item.data) < 50) {
                  result +=
                    item.seriesName +
                    ': ' +
                    '<span >降低' +
                    item.data +
                    '%</span><br>';
                }
              });
              return result;
            },
          },
          legend: {
            data: ['访问', '下载'],
            textStyle: {
              fontSize: 12,
              color: 'rgb(0,253,255,0.6)',
            },
            top: '0.5%',
            right: '5%',
          },
          grid: {
            top: 25,
            bottom: 25,
            left: 45,
            right: 20,
          },
          xAxis: {
            axisLine: {
              show: true,
              lineStyle: {
                color: '#15faff',
              },
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: true,
            },
            data: mouthData,
          },
          yAxis: {
            max: 100,
            splitNumber: 4,
            interval: 25,
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              lineStyle: {
                type: 'dashed',
                color: '#4b4d64',
              },
            },
            axisLabel: {
              formatter: '{value} %',
              //改变刻度字体样式
              color: '#ffffff',
            },
          },
          series: [
            {
              name: '访问',
              type: 'line',
              // smooth: true,
              symbol: 'none',
              symbolSize: 10,
              areaStyle: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: 'rgba(255, 204,1, .9)',
                    },
                    {
                      offset: 0.8,
                      color: 'rgba(6, 8, 41,.1)',
                    },
                  ],
                  false
                ),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10,
              },
              itemStyle: {
                color: '#ffcb00',
              },
              data: visitData.low,
            },
            {
              name: '访问',
              type: 'lines',
              coordinateSystem: 'cartesian2d',
              zlevel: 1,
              polyline: true,
              smooth: true,
              symbol: 'circle',
              effect: {
                show: true,
                trailLength: 0.4,
                symbol: 'circle',
                period: 8, //光点滑动速度
                symbolSize: 8,
              },
              lineStyle: {
                color: '#ffcb00',
                width: 0,
                opacity: 0,
                curveness: 0,
              },
              data: dataMount_1.value,
            },
            {
              name: '下载',
              type: 'line',
              // smooth: true,
              symbol: 'none',
              symbolSize: 10,
              areaStyle: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: 'rgba(21, 250, 255,.9)',
                    },
                    {
                      offset: 0.8,
                      color: 'rgba(6, 8, 41,.1)',
                    },
                  ],
                  false
                ),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10,
              },
              itemStyle: {
                color: '#15faff',
              },
              data: downloadData.low,
            },
            {
              name: '下载',
              type: 'lines',
              coordinateSystem: 'cartesian2d',
              zlevel: 1,
              smooth: true,
              polyline: true,
              symbol: 'circle',
              effect: {
                show: true,
                trailLength: 0.4, // 光点尾迹的长度，调整这个值可以改变光点的轨迹长度
                symbol: 'circle',
                period: 8, // 光点滑动速度，越小滑动越快
                symbolSize: 8,
              },
              lineStyle: {
                color: '#15faff',
                width: 0,
                opacity: 0,
                curveness: 0,
              },
              data: dataMount_2.value,
            },
          ],
        },
        true
      );
    };

    const initData = () => {
      visitData.xcategory.forEach((item, index) => {
        dataMount_1.value[0]['coords'].push([item, visitData.low[index]]);
      });
      downloadData.xcategory.forEach((item, index) => {
        dataMount_2.value[0]['coords'].push([item, downloadData.low[index]]);
      });
    };

    return { lineEchart };
  },
});
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  .rate-title {
    padding: 12px 30px;
  }
  .line-echart {
    height: 137px;
    margin: 0 20px;
  }
}
</style>
