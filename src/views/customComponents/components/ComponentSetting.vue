<template>
  <div class="component_setting rounded-md p-4">
    <div class="text-xl font-semibold">题目配置</div>
    <div v-if="selectedTopic">
      <div class="mt-3 flex items-center gap-2">
        <div class="min-w-[70px]">题目名称：</div>
        <Input
          placeholder="请输入"
          :maxlength="6"
          v-model:value="selectedTopic.label"
        />
      </div>
      <div class="mt-3 flex gap-2">
        <div class="min-w-[70px]">创建选项：</div>
        <div
          class="flex-1 p-3"
          style="border: 1px solid red; min-height: 200px"
        >
          <div class="flex gap-2 items-center">
            label:<Input placeholder="请输入label" />
          </div>
          <div class="flex gap-2 items-center mt-1">
            value:<Input placeholder="请输入value" />
          </div>
          <Button type="default"> + 添加选项 </Button>
        </div>
      </div>
    </div>
    <div v-else class="mt-[100px]">
      <Empty description="您当前还没选择题目" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, ref, watch } from 'vue';
import { Input, Empty, Button } from 'ant-design-vue';
export default defineComponent({
  name: 'ComponentSetting',
  components: {
    Input,
    Empty,
    Button,
  },
  emits: ['updateData'],
  setup(_, { emit }) {
    const selectedTopic = ref();

    const stopSelectedTopic = watch(
      () => selectedTopic.value,
      (val) => {
        if (val) {
          val.label = val.label.trim();
          emit('updateData', val);
        }
      },
      {
        deep: true,
        immediate: true,
      }
    );

    onUnmounted(() => {
      stopSelectedTopic();
    });

    // 获取选中的题目
    const getSelectQuestion = (data) => {
      selectedTopic.value = data;
      // console.log('🚀 ~ getSelectQuestion ~ data:', data);
    };
    return { selectedTopic, getSelectQuestion };
  },
});
</script>

<style lang="less" scoped>
.component_setting {
  border: 1px solid #dadadae6;
  overflow-y: auto;
  width: 400px;
  height: calc(100vh - 85px);

  ::v-deep(.ant-empty-description) {
    color: #b8b8b8;
  }
}
</style>
