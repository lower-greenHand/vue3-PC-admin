<template>
  <div class="low-code">
    <WidgetsList />
    <LayoutArea />
    <WidgetsConfig />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import WidgetsList from './components/WidgetsList.vue';
import LayoutArea from './components/LayoutArea.vue';
import WidgetsConfig from './components/WidgetsConfig.vue';
export default defineComponent({
  components: {
    WidgetsList,
    LayoutArea,
    WidgetsConfig,
  },
  setup() {
    return {};
  },
});
</script>

<style lang="less" scoped>
.low-code {
  width: 100%;
  height: 100%;
  display: flex;
}
</style>
