<template>
  <div class="low-code">
    <WidgetsList @add-new-node="handleAddNode" />
    <LayoutArea ref="layoutAreaRef" />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import WidgetsList from './components/WidgetsList.vue';
import LayoutArea from './components/LayoutArea.vue';
export default defineComponent({
  components: {
    WidgetsList,
    LayoutArea,
  },
  setup() {
    const layoutAreaRef = ref(null);

    const handleAddNode = (event) => {
      layoutAreaRef.value.addNewNode(event);
    };
    return { layoutAreaRef, handleAddNode };
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
