<template>
  <div class="container">
    <BorderBox12>
      <div class="rate-title">
        <ModuleTitle title="网站点赞量" />
      </div>
      <div class="bar-chart">
        <div ref="barEchart" :style="{ width, height }"></div>
      </div>
    </BorderBox12>
  </div>
</template>

<script>
import { defineComponent, markRaw, onMounted, onUnmounted, ref } from 'vue';
import { BorderBox12 } from '@kjgl77/datav-vue3';
import ModuleTitle from '../ModuleTitle.vue';
import { dataArray, color_list } from './data';
import * as echarts from 'echarts';
export default defineComponent({
  name: 'RightBottomArea',
  components: {
    BorderBox12,
    ModuleTitle,
  },
  props: {
    width: {
      default: '100%',
    },
    height: {
      default: '145px',
    },
  },
  setup() {
    const barEchart = ref(null);
    const myBarEchart = ref(null);
    const timeInterval = ref(null);

    onMounted(() => {
      myBarEchart.value = markRaw(echarts.init(barEchart.value));
      myBarEchart.value.on('mouseover', onStop);
      myBarEchart.value.on('mouseout', goMove);
      myBarEchart.value.setOption(
        {
          // backgroundColor:'rgba(0, 0, 0, .8)',
          tooltip: {
            trigger: 'axis',
            textStyle: {
              fontSize: 18,
            },
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#283b56',
              },
            },
            formatter: (v) => {
              let [a] = v;
              return `
                    <div class='u-p-2'>
                        <div>${a.name}：<span style='color:#1296db'>${a.value}</span> 次</div>
                    </div>
                `;
            },
          },
          grid: {
            top: '30',
            left: '50',
            right: '10',
            bottom: '20',
          },
          // X轴
          xAxis: {
            type: 'category',
            boundaryGap: true,
            data: dataArray.xdataName,
            axisLine: {
              lineStyle: {
                color: '#15faff',
              },
            },
            axisLabel: {
              fontSize: 12,
              color: '#15faff',
              rotate: 0,
            },
            axisTick: {
              show: false,
            }, //坐标轴刻度
          },
          // Y轴
          yAxis: {
            type: 'value',
            scale: true,
            min: 0,
            name: '点赞量',
            splitNumber: 4,
            nameTextStyle: {
              color: '#fff',
              fontSize: 12,
              padding: [0, 0, 0, 10],
            },
            splitLine: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: '#fff',
              },
            },
            axisLabel: {
              fontSize: 12,
              color: '#fff',
            },
          },
          // 给X轴设置滚动条
          dataZoom: [
            {
              start: 0, // 默认为 0
              end: 50, // 默认为100
              type: 'slider',
              show: false,
              xAxisIndex: [0],
              handleSize: 10, //滑动条的 左右2个滑动条的大小
              height: 0, // 组件高度
            },
            //下面这个属性是里面拖到
            {
              type: 'inside',
              show: true,
              xAxisIndex: [0],
              start: 0, // 默认为1
              end: 50, // 100 - 1500 / 31, //默认为100
            },
          ],
          series: [
            {
              name: '不同网站点赞',
              type: 'pictorialBar',
              barWidth: 40,
              // 三角矢量柱状图
              symbol:
                'path://M-0.000,431.000 C59.528,394.477 61.000,-0.000 61.000,-0.000 C61.000,-0.000 62.472,394.477 122.000,431.000 L-0.000,431.000 Z',
              // 是否裁剪图形
              symbolClip: false,
              data: dataArray.contractnum,
              itemStyle: {
                color: (params) => {
                  return new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    color_list[params.dataIndex]
                  );
                },
              },
              label: {
                show: true,
                position: 'top',
                formatter: (params) => {
                  return params.name;
                },
                fontSize: 12,
                color: '#fff',
              },
            },
          ],
        },
        true
      );
      autoMove();
    });

    const autoMove = () => {
      timeInterval.value = setInterval(() => {
        let option = myBarEchart.value.getOption(); // 获得option对象
        if (Number(option.dataZoom[0].end) >= 100) {
          option.dataZoom[0].end = 50;
          option.dataZoom[0].start = 0;
        } else {
          option.dataZoom[0].end =
            option.dataZoom[0].end + 1 * (100 / option.series[0].data.length);
          option.dataZoom[0].start =
            option.dataZoom[0].start + 1 * (100 / option.series[0].data.length);
        }
        myBarEchart.value.setOption(option, true);
      }, 2500);
    };

    // 鼠标按住停止滚动
    const onStop = () => {
      clearInterval(timeInterval.value);
    };

    // 鼠标松开继续滚动
    const goMove = () => {
      autoMove();
    };
    onUnmounted(() => {
      clearInterval(timeInterval.value);
    });
    return { barEchart };
  },
});
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  .rate-title {
    padding: 12px 30px 6px 30px;
  }
  .bar-chart {
    margin: 0 20px;
    height: 145px;
  }
}
</style>
