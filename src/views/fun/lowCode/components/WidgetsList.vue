<template>
  <div class="widgets-list">
    <div class="widgets-list__title">组件列表</div>
    <div class="widgets-list__area" v-if="widgetsTypeList">
      <draggable
        v-model="widgetsTypeList"
        :sort="false"
        :animation="1000"
        item-key="key"
        :forceFallback="true"
        :fallback-on-body="true"
        :preventOnFilter="false"
        chosenClass="draggable-selected"
        drag-class="draggable-selected"
        @start.prevent="onStart"
        @end.prevent="handleEnd"
      >
        <template #item="{ element: fun }">
          <div class="drag-widgets">
            <SvgIcon :name="fun.icon" :size="fun.size" />
            <div style="margin-left: 5px">{{ fun.label }}</div>
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script>
import { defineComponent, onUnmounted } from 'vue';
import { Button } from 'ant-design-vue';
import draggable from 'vuedraggable';
import { widgetsTypeList } from '../lowCodeData';
import Bus from '/@/utils/bus.js';
import SvgIcon from '/@/components/SvgIcon/index.vue';
export default defineComponent({
  components: {
    draggable,
    Button,
    SvgIcon,
  },
  emits: ['add-new-node'],
  setup(_, { emit }) {
    const onStart = (ele) => {
      ele.preventDefault();
    };
    const handleEnd = (ele) => {
      ele.preventDefault();
      // emit('add-new-node', ele);
      Bus.emit('new-add-nodes', ele);
    };

    onUnmounted(() => {
      Bus.off('new-add-nodes');
    });
    return { widgetsTypeList, onStart, handleEnd };
  },
});
</script>

<style lang="less" scoped>
.widgets-list {
  width: 200px;
  &__title {
    font-size: @font-common-size;
    font-weight: bold;
    margin-bottom: 5px;
  }
  &__area {
    max-height: calc(100% - 35px);
    overflow-y: auto;
    .drag-widgets {
      width: 180px;
      height: 32px;
      margin: 0 10px;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px dashed #d0d0d0;
      &:hover {
        cursor: move;
      }
    }
  }
}
</style>
<style lang="less">
.draggable-selected {
  border: 1px solid blue !important;
  z-index: 1000 !important;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
