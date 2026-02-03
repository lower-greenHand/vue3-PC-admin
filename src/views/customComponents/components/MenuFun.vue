<template>
  <div class="menu-fun h-full rounded-md p-4">
    <div class="text-xl font-semibold mb-4">题型列表</div>
    <draggable
      :animation="150"
      class="list-group h-full"
      :list="menuFunList"
      item-key="id"
      :group="{ name: 'component', pull: 'clone', put: false }"
      :clone="onHandleClone"
    >
      <template #item="{ element }">
        <div class="list-group-item">
          <SvgIcon :name="element.icon" size="18" /> {{ element.name }}
        </div>
      </template>
    </draggable>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import draggable from 'vuedraggable';
import SvgIcon from '/@/components/SvgIcon/index.vue';
import { v4 as uuidv4 } from 'uuid';
import { menuFunList } from '../data';
export default defineComponent({
  name: 'MenuFun',
  components: {
    draggable,
    SvgIcon,
  },
  setup() {
    const keyValue = ref(1);
    // 克隆时处理元素数据
    const onHandleClone = (element) => {
      keyValue.value++;
      const fieldName = element.field + '_' + keyValue.value;
      const newObj = {};
      newObj[fieldName] = element.component === 'Select' ? undefined : '';
      return {
        ...element,
        field: fieldName,
        id: uuidv4(),
        ...newObj,
      };
    };

    return { menuFunList, onHandleClone };
  },
});
</script>

<style lang="less" scoped>
.menu-fun {
  border: 1px solid #dadadae6;
  .list-group {
    overflow-y: auto;
    .list-group-item {
      padding: 8px 16px;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      gap: 6px;
      &:nth-child(2n) {
        background-color: #f2f1f1;
      }
      &:nth-child(2n-1) {
        background-color: rgb(218, 218, 218);
      }
      &:hover {
        background-color: #787eee;
        cursor: context-menu;
        color: #fff;
      }
    }
  }
}
</style>
