<template>
  <div class="container">
    <BorderBox12>
      <div class="completion_title">
        <ModuleTitle title="网站认可度" />
      </div>
      <div class="complete-echart">
        <div class="echart-w">
          <CompleteEchart :data-value="80" text-tips="认可" />
        </div>
        <div class="echart-w">
          <CompleteEchart :data-value="10" text-tips="不认可" />
        </div>
      </div>
    </BorderBox12>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { BorderBox12 } from '@kjgl77/datav-vue3';
import ModuleTitle from '../ModuleTitle.vue';
import CompleteEchart from './components/CompleteEchart.vue';
export default defineComponent({
  name: 'RightTopArea',
  components: {
    BorderBox12,
    ModuleTitle,
    CompleteEchart,
  },
  setup() {
    return {};
  },
});
</script>

<style lang="less" scoped>
.container {
  margin-top: 10px;
  width: 100%;
  height: 100%;
  .completion_title {
    padding: 15px 30px;
  }
  .complete-echart {
    margin: 0 25px;
    height: 130px;
    display: flex;
    gap: 10px;
    justify-content: space-between;
    .echart-w {
      width: 50%;
    }
  }
}
</style>
