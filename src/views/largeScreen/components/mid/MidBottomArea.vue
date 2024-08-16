<template>
  <div class="container">
    <BorderBox12>
      <div class="rate-title">
        <ModuleTitle title="模块贡献率" />
      </div>
      <div class="scroll-list">
        <ScrollRankingBoard :config="configData" style="width: 100%" />
      </div>
    </BorderBox12>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import { BorderBox12, ScrollRankingBoard } from '@kjgl77/datav-vue3';
import ModuleTitle from '../ModuleTitle.vue';
export default defineComponent({
  name: 'MidBottomArea',
  components: {
    BorderBox12,
    ModuleTitle,
    ScrollRankingBoard,
  },
  setup() {
    const configData = reactive({
      data: [
        {
          name: 'Mamba',
          value: 88,
        },
        {
          name: '小五',
          value: 68,
        },
        {
          name: '小美',
          value: 50,
        },
        {
          name: 'Jeck',
          value: 32,
        },
        {
          name: 'Michael',
          value: 30,
        },
        {
          name: '李白',
          value: 25,
        },
        {
          name: '杜甫',
          value: 25,
        },
        {
          name: '辛弃疾',
          value: 15,
        },
        {
          name: '大壮',
          value: 5,
        },
      ],
      unit: '%',
      waitTime: 3000,
      fontSize: 16,
      color: '#00e4ff',
    });
    return { configData };
  },
});
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  .rate-title {
    padding: 15px 30px;
  }
  .scroll-list {
    margin: 0 20px;
    height: 220px;
    ::v-deep(.dv-scroll-ranking-board .ranking-info .info-name) {
      padding-left: 12px;
    }
  }
}
</style>
