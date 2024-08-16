<template>
  <div class="container">
    <BorderBox12>
      <div class="completion_title">
        <ModuleTitle title="区域地图" />
      </div>
      <div class="city-map-echart">
        <div ref="cityEchartRef" :style="{ width, height }"></div>
      </div>
    </BorderBox12>
  </div>
</template>

<script>
import { defineComponent, markRaw, onMounted, ref } from 'vue';
import { BorderBox12 } from '@kjgl77/datav-vue3';
import ModuleTitle from '../ModuleTitle.vue';
import * as echarts from 'echarts';
import { chinaGeoCoordMap, chinaDatas, anhuiData } from './data';
export default defineComponent({
  name: 'RightMidArea',
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
    const cityEchartRef = ref(null);
    const myCityEchart = ref(null);
    const seriesData = ref([]); // echart数据配置
    onMounted(async () => {
      // 初始化城市坐标及聚焦点
      initCityLoc();
      // 初始化echart
      initEchart();
    });

    const initCityLoc = () => {
      [['合肥市', chinaDatas]].forEach((item, i) => {
        seriesData.value.push(
          {
            type: 'lines',
            zlevel: 2,
            effect: {
              show: true,
              period: 4, //箭头指向速度，值越小速度越快
              trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
              symbol: 'arrow', //箭头图标
              symbolSize: 5, //图标大小
            },
            lineStyle: {
              width: 1, //尾迹线条宽度
              opacity: 1, //尾迹线条透明度
              curveness: 0.3, //尾迹线条曲直度
            },
            data: convertData(item[1]),
          },
          {
            type: 'effectScatter',
            coordinateSystem: 'geo',
            zlevel: 2,
            rippleEffect: {
              //涟漪特效
              period: 4, //动画时间，值越小速度越快
              brushType: 'stroke', //波纹绘制方式 stroke, fill
              scale: 4, //波纹圆环最大限制，值越大波纹越大
            },
            label: {
              show: true,
              position: 'right', //显示位置
              offset: [5, 0], //偏移设置
              formatter: function (params) {
                //圆环显示文字
                return params.data.name;
              },
              fontSize: 13,
            },
            emphasis: {
              label: {
                show: true,
              },
            },
            symbol: 'circle',
            symbolSize: function (val) {
              // return 5 + val[2] * 5; //圆环大小
              return 5; //圆环大小
            },
            itemStyle: {
              color: '#f00',
            },
            data: item[1].map(function (dataItem) {
              return {
                name: dataItem[0].name,
                value: chinaGeoCoordMap[dataItem[0].name].concat([
                  dataItem[0].value,
                ]),
              };
            }),
          },
          //被攻击点
          {
            type: 'scatter',
            coordinateSystem: 'geo',
            zlevel: 2,
            rippleEffect: {
              period: 4,
              brushType: 'stroke',
              scale: 4,
            },
            label: {
              show: true,
              position: 'right',
              color: '#0f0',
              formatter: '{b}',
            },
            emphasis: {
              label: {
                show: true,
                color: '#f60',
              },
            },
            symbol: 'pin',
            symbolSize: 50,
            data: [
              {
                name: item[0],
                value: chinaGeoCoordMap[item[0]].concat([10]),
              },
            ],
          }
        );
      });
    };

    const convertData = (data) => {
      var res = [];
      for (var i = 0; i < data.length; i++) {
        var dataItem = data[i];
        var fromCoord = chinaGeoCoordMap[dataItem[0].name];
        var toCoord = [117.29, 32.0581];
        if (fromCoord && toCoord) {
          res.push({
            coords: [fromCoord, toCoord],
            value: dataItem[0].value,
          });
        }
      }
      return res;
    };

    const initEchart = () => {
      myCityEchart.value = markRaw(echarts.init(cityEchartRef.value));
      myCityEchart.value.showLoading();
      echarts.registerMap('anhui', anhuiData);
      myCityEchart.value.hideLoading();
      myCityEchart.value.setOption(
        {
          tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(166, 200, 76, 0.82)',
            borderColor: '#FFFFCC',
            showDelay: 0,
            hideDelay: 0,
            enterable: true,
            transitionDuration: 0,
            extraCssText: 'z-index:100',
            formatter: function (params, ticket, callback) {
              //根据业务自己拓展要显示的内容
              var res = '';
              var name = params.name;
              var value = params.value[params.seriesIndex + 1];
              res =
                "<span style='color:#fff;'>" +
                name +
                '</span><br/>数据：' +
                value;
              return res;
            },
          },
          visualMap: {
            //图例值控制
            min: 0,
            max: 100,
            calculable: false,
            show: true,
            left: 10,
            bottom: 10,
            color: ['#f44336', '#fc9700', '#ffde00', '#ffde00', '#00eaff'],
            textStyle: {
              color: '#fff',
            },
          },
          geo: {
            map: 'anhui',
            zoom: 1.2,
            label: {
              show: false,
            },
            roam: true, // 是否允许缩放
            itemStyle: {
              color: 'rgba(51, 69, 89, .5)', //地图背景色
              borderColor: '#516a89', //省市边界线00fcff 516a89
              borderWidth: 1,
            },
            emphasis: {
              itemStyle: {
                color: 'rgba(37, 43, 61, .5)', //悬浮背景
              },
              label: {
                show: false,
              },
            },
          },
          series: seriesData.value,
        },
        true
      );
    };
    return { cityEchartRef };
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
  .city-map-echart {
    margin: 0 25px;
    height: 320px;
    // border: 1px solid red;
  }
}
</style>
