<template>
  <div class="widgets-config">
    <div class="widgets-config__title">基础配置：</div>
    <div class="widgets-config-list">
      <Tabs
        v-model:activeKey="activeKey"
        type="editable-card"
        hideAdd
        size="small"
        @edit="onEdit"
        :tabBarGutter="0"
        @change="changeTab"
      >
        <TabPane :key="item.id" v-for="item in configData">
          <template #tab>
            <Tooltip>
              <template #title>{{ item.label }}</template>
              <div class="tab-title">
                {{ item.label }}
              </div>
            </Tooltip>
          </template>
          <div class="item-text">
            <span>文本内容：</span>
            <Input placeholder="请输入" v-model:value="item.label" />
          </div>
          <template
            v-if="item.widgetsType == 'btn' || item.widgetsType == 'text'"
          >
            <div class="item-text">
              <span>文本颜色：</span>
              <Input type="color" v-model:value="item.fontColor" />
            </div>
            <div class="item-text">
              <span>文本字号：</span>
              <Input
                type="number"
                min="12"
                placeholder="请输入"
                v-model:value="item.fontSize"
              />
            </div>
            <div class="item-text" v-if="item.widgetsType == 'text'">
              <span>背景颜色：</span>
              <Input type="color" v-model:value="item.bgColor" />
            </div>
          </template>
          <div class="item-text" v-show="item.widgetsType == 'btn'">
            <span>按钮类型：</span
            ><Select
              class="selected"
              placeholder="请选择"
              v-model:value="item.type"
              :options="btnTypeList"
            />
          </div>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from 'vue';
import { Input, Select, Tabs, TabPane, Tooltip } from 'ant-design-vue';
import { btnTypeList } from '../lowCodeData';
export default defineComponent({
  components: {
    Input,
    Select,
    Tabs,
    TabPane,
    Tooltip,
  },
  props: {
    layoutData: {
      default: [],
    },
  },
  emits: ['change-tab', 'del-item'],
  setup(props, { emit }) {
    const activeKey = ref(props.layoutData[0]?.id);
    const configData = computed(() => {
      return props.layoutData;
    });

    const onEdit = (key) => {
      if (activeKey.value == key) {
        const index = configData.value.findIndex((item) => item.id == key);
        if (index == 0) {
          activeKey.value =
            configData.value.length > 1 ? configData.value[index + 1].id : '';
        } else {
          activeKey.value = configData.value[index - 1].id;
        }
      }
      emit('del-item', key);
    };

    const handleChangeTab = (key) => {
      activeKey.value = key;
    };

    const changeTab = (activeKey) => {
      const target = configData.value.find((item) => item.id == activeKey);
      if (target) emit('change-tab', target);
    };
    return {
      activeKey,
      btnTypeList,
      configData,
      onEdit,
      changeTab,
      handleChangeTab,
    };
  },
});
</script>

<style lang="less" scoped>
.widgets-config {
  width: 300px;
  margin-left: 15px;
  &__title {
    font-size: @font-common-size;
    font-weight: bold;
    margin-bottom: 10px;
  }
  &-list {
    ::v-deep(.ant-tabs-top > .ant-tabs-nav) {
      margin: 0;
    }
    ::v-deep(.ant-tabs-tabpane) {
      border: 1px solid #e8e8e8;
      border-top: none;
      min-height: 200px;
      padding: 16px 12px;
    }

    .item-text {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      margin-bottom: 10px;
      span {
        width: 80px;
        text-align: right;
      }
      input {
        flex: 1;
      }
      .selected {
        flex: 1;
      }
    }

    .tab-title {
      max-width: 70px;
      min-width: 20px;
      font-size: 14px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>
<style lang="less">
.ant-tabs-dropdown-menu-item > span {
  display: flex;
  div {
    max-width: 70px;
    min-width: 20px;
    font-size: 14px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
