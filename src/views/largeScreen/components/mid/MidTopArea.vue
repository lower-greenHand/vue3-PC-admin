<template>
  <div class="china-map">
    <div ref="chinaMapRef" :style="{ width, height }"></div>
  </div>
</template>

<script>
import { defineComponent, onMounted, markRaw, ref } from 'vue';
import * as echarts from 'echarts';
import { mapInfo, cityData, labelData } from './echartMap';
export default defineComponent({
  name: 'MidTopArea',
  props: {
    width: {
      default: '100%',
    },
    height: {
      default: '100%',
    },
  },
  setup() {
    const chinaMapRef = ref(null);
    const myChinaMap = ref(null);
    onMounted(() => {
      initMapEchart();
    });

    const initMapEchart = () => {
      myChinaMap.value = markRaw(echarts.init(chinaMapRef.value));
      myChinaMap.value.showLoading();
      echarts.registerMap('china', mapInfo);
      myChinaMap.value.hideLoading();
      myChinaMap.value.on('georoam', (params) => {
        let option = myChinaMap.value.getOption(); //获得option对象
        if (params.zoom != null && params.zoom != undefined) {
          //捕捉到缩放时
          option.geo[0].zoom = option.series[0].zoom; //下层geo的缩放等级跟着上层的geo一起改变
          option.geo[0].center = option.series[0].center; //下层的geo的中心位置随着上层geo一起改变
        } else {
          //捕捉到拖曳时
          option.geo[0].center = option.series[0].center; //下层的geo的中心位置随着上层geo一起改变
        }
        myChinaMap.value.setOption(option); //设置option
      });
      myChinaMap.value.setOption(
        {
          // backgroundColor:"#021640",
          title: {
            text: '不同区域浏览量',
            top: '20px',
            left: '30px',
            textStyle: {
              color: '#fff',
              fontSize: '20px',
            },
          },
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
              var value =
                params.value && params.value.length > 0 ? params.value[2] : '';
              if (value) {
                res =
                  "<span style='color:#fff;'>" +
                  name +
                  "</span ><br/><span style='color:#fff;'>浏览量：</span>" +
                  "<span style='font-size:20px;color:#fff'>" +
                  value +
                  '</span>';
              } else {
                res = '';
              }

              return res;
            },
          },
          geo: {
            map: 'china',
            aspectScale: 0.75, //长宽比
            zoom: 1.1,
            top: 80,
            roam: true, // 是否允许缩放
            itemStyle: {
              areaColor: '#d47e63',
              shadowColor: '#002666',
              shadowOffsetX: 12,
              shadowOffsetY: 16,
              // borderWidth:2,
              borderColor: '#d47e63',
            },
            emphasis: {
              itemStyle: {
                areaColor: '#2AB8FF',
                borderWidth: 0,
                color: 'green',
                show: true,
              },
            },
            regions: [
              {
                name: '南海诸岛',
                itemStyle: {
                  areaColor: 'rgba(0, 10, 52, 1)',
                  borderColor: 'rgba(0, 10, 52, 1)',
                  opacity: 0,
                  label: {
                    show: true,
                    color: '#009cc9',
                  },
                },
              },
            ],
          },
          visualMap: {
            //图例值控制
            min: 0,
            max: 10000,
            calculable: false,
            show: true,
            right: 10,
            // seriesIndex: 1,
            bottom: 50,
            color: ['#00eaff', '#fc9700', '#ffde00', '#ffde00', 'red'],
            // inRange: {
            //   symbolSize: [10, 20],
            // },
            textStyle: {
              color: '#fff',
            },
          },
          series: [
            // 常规地图
            {
              type: 'map',
              roam: true, // 是否适用缩放
              layoutSize: '90%',
              aspectScale: 0.75,
              zoom: 1.1,
              map: 'china', // 使用
              top: 80,
              label: {
                show: true,
                color: '#1DE9B6', // 直接在 label 中配置 textStyle 属性
              },
              emphasis: {
                label: {
                  color: 'rgb(183,185,14)', // 直接在 label 中配置 textStyle 属性
                },
              },
              itemStyle: {
                // 区域线
                borderColor: 'rgb(147, 235, 248,.8)',
                borderWidth: 0.2,
                areaColor: {
                  type: 'linear',
                  x: 0.2,
                  y: 0.8,
                  r: 0.8,
                  colorStops: [
                    {
                      offset: 0,
                      color: '#002283', // 0% 处的颜色
                    },
                    {
                      offset: 0.3,
                      color: '#011f6d', // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: '#021640', // 100% 处的颜色
                    },
                  ],
                  globalCoord: true, // 缺省为 false
                },
              },
              emphasis: {
                // 鼠标悬浮时颜色
                itemStyle: {
                  areaColor: {
                    type: 'radial',
                    x: 0.2,
                    y: 0.8,
                    r: 0.8,
                    colorStops: [
                      {
                        offset: 0,
                        color: '#091739', // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: '#0b1843', // 100% 处的颜色
                      },
                    ],
                    globalCoord: true, // 缺省为 false
                  },
                  borderWidth: 1,
                  borderColor: '#f9bc90',
                },
                label: {
                  color: '#fff',
                },
              },
            },
            // 区域散点图
            {
              type: 'effectScatter',
              coordinateSystem: 'geo',
              zlevel: 2,
              symbolSize: 10,
              rippleEffect: {
                //坐标点动画
                period: 2,
                scale: 4,
                brushType: 'fill',
              },
              label: {
                show: false,
                position: 'right',
                formatter: '{b}',
                color: '#b3e2f2',
                fontWeight: '400',
                fontSize: 12,
              },
              data: cityData,
              itemStyle: {
                //坐标点颜色
                show: false,
                color: '#ff3f3a',
                shadowBlur: 20,
                shadowColor: '#fff',
              },
              emphasis: {
                itemStyle: {
                  areaColor: '#f00',
                },
              },
            },
            {
              name: 'lable',
              type: 'scatter',
              coordinateSystem: 'geo',
              symbol: 'pin',
              symbolSize: [75, 70],
              emphasis: {
                scale: true,
              },
              zlevel: 2,
              label: {
                show: true,
                color: '#fff', // 直接在 label 中配置 textStyle 属性
                lineHeight: 15,
                formatter(params) {
                  return params.data.value[2];
                },
              },
              itemStyle: {
                color: '#6495ED', //标志颜色
                opacity: 0.8,
                borderColor: '#aee9fb',
                borderWidth: 0.6,
              },
              showEffectOn: 'render',
              rippleEffect: {
                brushType: 'stroke',
              },
              data: labelData,
            },
          ],
        },
        true
      );
    };
    return { chinaMapRef };
  },
});
</script>

<style lang="less" scoped>
.china-map {
  height: 100%;
}
</style>
