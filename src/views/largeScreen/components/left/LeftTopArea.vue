<template>
  <div class="container">
    <BorderBox12>
      <div class="rate-title">
        <ModuleTitle title="浏览率" />
      </div>
      <div class="preview-echart">
        <div ref="viewEchart" :style="{ width, height }"></div>
      </div>
    </BorderBox12>
  </div>
</template>

<script>
import { defineComponent, onMounted, markRaw, ref } from 'vue';
import { BorderBox12 } from '@kjgl77/datav-vue3';
import 'echarts-liquidfill';
import ModuleTitle from '../ModuleTitle.vue';
import * as echarts from 'echarts';
export default defineComponent({
  name: 'LeftTopArea',
  components: {
    BorderBox12,
    ModuleTitle,
  },
  props: {
    width: {
      default: '100%',
    },
    height: {
      default: '130px',
    },
  },
  setup() {
    const viewEchart = ref(null); // 浏览量数据
    const myViewEchart = ref(null);

    const initViewEchart = () => {
      myViewEchart.value = markRaw(echarts.init(viewEchart.value));
      myViewEchart.value.setOption({
        title: [
          {
            text: '本年浏览率',
            x: '2%',
            y: '77%',
            textStyle: {
              fontSize: 16,
              fontWeight: '500',
              // color: '#5dc3ea',
              color: '#fff',
              lineHeight: 16,
              textAlign: 'center',
            },
          },
          {
            text: '本月浏览率',
            x: '38%',
            y: '77%',
            textStyle: {
              fontSize: 16,
              fontWeight: '500',
              // color: '#5dc3ea',
              color: '#fff',
              lineHeight: 16,
              textAlign: 'center',
            },
          },
          {
            text: '当日浏览率',
            x: '73%',
            y: '77%',
            textStyle: {
              fontSize: 16,
              fontWeight: '500',
              // color: '#5dc3ea',
              color: '#fff',
              lineHeight: 16,
              textAlign: 'center',
            },
          },
        ],
        series: [
          {
            type: 'liquidFill',
            radius: '70%',
            center: ['15%', '36%'],
            color: [
              {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#446bf5',
                  },
                  {
                    offset: 1,
                    color: '#2ca3e2',
                  },
                ],
                globalCoord: false,
              },
            ],
            data: [0.45, 0.45], // data个数代表波浪数
            backgroundStyle: {
              borderWidth: 1,
              color: 'RGBA(51, 66, 127, 0.7)',
            },
            label: {
              fontSize: 22,
              color: '#fff',
            },
            outline: {
              borderDistance: 0,
              itemStyle: {
                borderWidth: 2,
                borderColor: '#112165',
              },
            },
          },
          {
            type: 'liquidFill',
            radius: '70%',
            center: ['50%', '36%'],
            color: [
              {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#2aa1e3',
                  },
                  {
                    offset: 1,
                    color: '#08bbc9',
                  },
                ],
                globalCoord: false,
              },
            ],
            data: [0.86, 0.86], // data个数代表波浪数
            backgroundStyle: {
              borderWidth: 1,
              color: 'RGBA(51, 66, 127, 0.7)',
            },
            label: {
              fontSize: 22,
              color: '#fff',
            },
            outline: {
              borderDistance: 0,
              itemStyle: {
                borderWidth: 2,
                borderColor: '#112165',
              },
            },
          },
          {
            type: 'liquidFill',
            radius: '70%',
            center: ['85%', '36%'],
            color: [
              {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#1aaba8',
                  },
                  {
                    offset: 1,
                    color: '#0b988f',
                  },
                ],
                globalCoord: false,
              },
            ],
            data: [0.56, 0.56], // data个数代表波浪数
            backgroundStyle: {
              borderWidth: 1,
              color: 'RGBA(51, 66, 127, 0.7)',
            },
            label: {
              fontSize: 22,
              color: '#fff',
            },
            outline: {
              borderDistance: 0,
              itemStyle: {
                borderWidth: 2,
                borderColor: '#112165',
              },
            },
          },
        ],
      });
    };

    onMounted(() => {
      initViewEchart();
    });
    return { viewEchart };
  },
});
</script>

<style lang="less" scoped>
.container {
  margin-top: 10px;
  width: 100%;
  height: 100%;
  .rate-title {
    padding: 15px 30px;
  }
  .preview-echart {
    height: 130px;
    margin: 0 25px;
  }
}
</style>
