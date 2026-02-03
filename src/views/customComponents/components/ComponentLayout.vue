<template>
  <div class="flex h-full w-full gap-6">
    <div class="component-layout rounded-md p-4 flex-1">
      <Form labelAlign="right">
        <draggable
          :animation="150"
          class="list-group pb-40"
          :list="componentList"
          group="component"
          item-key="id"
          @change="onHandleChange"
          @move="onMoveItem"
        >
          <template #item="{ element }">
            <div
              class="list-group-item"
              @click="onClickItem(element)"
              :style="{
                backgroundColor:
                  element.id === selectedCloneId ? '#f5f5f5' : '#fff',
              }"
            >
              <FormItem
                :name="element.field"
                :label="element.label || '标签'"
                :labelCol="{
                  style: {
                    minWidth: '100px',
                    width: '100px',
                    pointerEvents: 'none',
                  },
                }"
              >
                <template v-if="element?.isSlots">
                  <Upload name="file">
                    <Button type="ghost"> <upload-outlined /> Upload </Button>
                  </Upload>
                </template>
                <component
                  v-else
                  v-model:[element.modelProp]="element[element.field]"
                  :is="getComponents(element.component)"
                  v-bind="element.componentProps"
                  :style="{ width: element.componentProps.width ?? '100%' }"
                />
              </FormItem>
            </div>
          </template>
        </draggable>
      </Form>
      <div class="mt-5">
        请在上方区域进行题目的拖拽添加
        <SvgIcon name="gesture-top-icon" size="20" />
      </div>
    </div>
    <ComponentSetting ref="componentSettingRef" @updateData="onUpdateData" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import draggable from 'vuedraggable';
import { Form, Upload, Button, Divider } from 'ant-design-vue';
import { getComponents } from '../data';
import SvgIcon from '/@/components/SvgIcon/index.vue';
import { UploadOutlined } from '@ant-design/icons-vue';
import ComponentSetting from './ComponentSetting.vue';
export default defineComponent({
  name: 'ComponentLayout',
  components: {
    draggable,
    Form,
    FormItem: Form.Item,
    Button,
    Upload,
    UploadOutlined,
    Divider,
    ComponentSetting,
    SvgIcon,
  },
  setup() {
    const componentList = ref<any>([]);
    const selectedCloneId = ref('');

    const onHandleChange = (content) => {
      selectedCloneId.value = content?.added?.element?.id;
      if (componentSettingRef.value) {
        componentSettingRef.value?.getSelectQuestion(content?.added?.element);
      }
      // console.log('🚀 ~ onHandleChange ~ content:', content);
    };

    const onMoveItem = (element) => {
      console.log('🚀 ~ onMoveItem ~ element:', element);
    };

    const componentSettingRef = ref();
    const onClickItem = (item) => {
      item.label = item.label || '标签';
      selectedCloneId.value = item.id;
      if (componentSettingRef.value) {
        componentSettingRef.value?.getSelectQuestion(item);
      }
      // console.log('🚀 ~ onClickItem ~ item:', item);
    };

    const onUpdateData = (element) => {
      componentList.value = componentList.value.map((item) => {
        if (item.id === element.id) {
          return element;
        }
        return item;
      });
    };

    return {
      componentList,
      getComponents,
      onHandleChange,
      onMoveItem,
      onClickItem,
      selectedCloneId,
      componentSettingRef,
      onUpdateData,
    };
  },
});
</script>

<style lang="less" scoped>
.component-layout {
  border: 1px solid #dadadae6;
  overflow-y: auto;
  height: calc(100vh - 85px);
  .list-group {
    padding-top: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0 16px;
    border-bottom: 1px dashed rgb(215, 215, 215);
    .list-group-item {
      padding: 8px 0;
      position: relative;
      ::v-deep(.ant-form-item) {
        margin-bottom: 0;
      }
      &:hover {
        background-color: #f5f5f5;
        cursor: pointer;
        border-radius: 2px;
      }

      &:nth-child(2n-1) {
        &::after {
          content: '';
          width: 1px;
          height: 40px;
          background-color: #f2f2f2e6;
          position: absolute;
          top: calc(50% - 20px);
          bottom: 0px;
          right: -8px;
        }
      }
    }
    // &:hover {
    //border: 1px dashed rgb(215, 215, 215);
    //}
  }
}
</style>
