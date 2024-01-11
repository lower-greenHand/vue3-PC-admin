<template>
  <div class="widgets-module">
    <div class="widgets-layout" ref="layoutRef">
      <template v-if="layoutData">
        <template v-for="item in layoutData" :key="item.id">
          <VueDragResize
            :minw="item.minw"
            :minh="item.minh"
            :z="item.z"
            :x="item.x"
            :y="item.y"
            :w="item.w"
            :h="item.h"
            :isActive="false"
            :is-resizable="item.resizable"
            :parent-limitation="true"
            :sticks="item.sticks"
            @click="handleClick(item)"
            @resizing="(e) => handleResize(e, item)"
            @dragging="(e) => handleResize(e, item)"
          >
            <!-- text -->
            <template v-if="item.widgetsType == 'text'">
              <div
                class="widgets-text"
                :style="{
                  width: item.w + 'px',
                  height: item.h + 'px',
                  color: item.fontColor,
                  fontSize: item.fontSize + 'px',
                  background: item.bgColor,
                }"
              >
                {{ item.label }}
              </div>
            </template>
            <!-- button -->
            <template v-else-if="item.widgetsType == 'btn'">
              <Button
                :type="item.type"
                :style="{
                  width: item.w + 'px',
                  height: item.h + 'px',
                  color: item.fontColor,
                  fontSize: item.fontSize + 'px',
                }"
                >{{ item.label }}</Button
              >
            </template>
            <!-- input -->
            <template v-else-if="item.widgetsType == 'input'">
              <Input
                :id="'input_' + item.id"
                v-model:value="item.inputContent"
                :style="{ width: item.w + 'px', height: item.h + 'px' }"
                placeholder="请输入"
                @click="handleInputFocus(item)"
              />
            </template>
            <!-- upload -->
            <template v-else-if="item.widgetsType == 'upload'">
              <UploadImg
                :height="item.h"
                :width="item.w"
                :widgets-data="item"
                @click-img="handleClickImg"
              />
            </template>
          </VueDragResize>
        </template>
      </template>
    </div>
    <WidgetsConfig
      ref="widgetConfigRef"
      :layout-data="layoutData"
      @change-tab="onChangeTab"
      @del-item="hangeDelItem"
    />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import Bus from '/@/utils/bus.js';
import { message, Button, Input } from 'ant-design-vue';
import VueDragResize from 'vue-drag-resize/src';
import { widgetsDragList } from '../lowCodeData';
import UploadImg from './UploadImg.vue';
import WidgetsConfig from './WidgetsConfig.vue';
export default defineComponent({
  components: {
    VueDragResize,
    Button,
    Input,
    UploadImg,
    WidgetsConfig,
  },
  setup() {
    const layoutRef = ref(null);
    const layoutData = ref([]);
    const layoutZ = ref(100);
    const clickCount = ref(0);
    const clickTime = ref(null);
    const widgetConfigRef = ref(null);

    const addNewNode = (target) => {
      const screenX = target?.originalEvent?.clientX,
        screenY = target?.originalEvent?.clientY;
      const containerRect = layoutRef.value.getBoundingClientRect(); // 布局区域的位置
      if (
        screenX - 90 < containerRect.x ||
        screenY < containerRect.y ||
        screenX > containerRect.width + containerRect.x ||
        screenY > containerRect.height + containerRect.y
      ) {
        message.warning('请把节点拖入到画布中');
        return;
      }
      let leftX = screenX - containerRect.x;
      let topY = screenY - containerRect.y;
      leftX -= 95;
      topY -= 16;
      layoutData.value = layoutData.value.map((item) => {
        item.resizable = false;
        return item;
      });
      const widgetsType = target.item.__draggable_context.element.key;
      const layoutObj = {
        id: new Date().valueOf(),
        minw: widgetsDragList[widgetsType].minw,
        minh: widgetsDragList[widgetsType].minh,
        x: leftX,
        y: topY,
        w: widgetsDragList[widgetsType].w,
        h: widgetsDragList[widgetsType].h,
        sticks: widgetsDragList[widgetsType].sticks,
        z: layoutZ.value + 5,
        resizable: true,
        inputContent: '',
        widgetsType: widgetsType,
        type: widgetsDragList[widgetsType].type,
        label: widgetsDragList[widgetsType].label,
        fontColor: widgetsDragList[widgetsType].fontColor,
        fontSize: widgetsDragList[widgetsType].fontSize,
        bgColor: widgetsDragList[widgetsType].bgColor,
        imgUrl: '',
      };
      layoutData.value = layoutData.value.concat(layoutObj);
      widgetConfigRef.value.handleChangeTab(layoutObj.id);
    };

    // 新建node节点
    Bus.on('new-add-nodes', (target) => {
      addNewNode(target);
    });

    // 拖拽回调函数
    const handleResize = (event, target) => {
      layoutData.value = layoutData.value.map((item) => {
        if (target.id == item.id) {
          item.x = event.left;
          item.y = event.top;
          item.w = event.width;
          item.h = event.height;
        }
        return item;
      });
    };

    // 控制拖拽组件
    const handleClick = (source) => {
      layoutData.value = layoutData.value.map((item) => {
        if (source.id == item.id) item.resizable = true;
        else item.resizable = false;
        return item;
      });
      widgetConfigRef.value.handleChangeTab(source.id);
    };

    // input双击获取焦点
    const handleInputFocus = (item) => {
      clickCount.value++;
      if (clickCount.value == 1) {
        clickTime.value = setTimeout(() => {
          clickCount.value = 0;
          clearTimeout(clickTime.value);
          clickTime.value = null;
        }, 300);
      } else if (clickCount.value == 2) {
        clearTimeout(clickTime.value);
        clickTime.value = null;
        clickCount.value = 0;
        const inputElement = document.getElementById(`input_${item.id}`);
        if (inputElement) {
          inputElement.focus();
        }
      }
    };

    // 上传图片获取焦点
    const handleClickImg = (source) => {
      handleClick(source);
    };

    // 切换tab
    const onChangeTab = (target) => {
      handleClick(target);
    };

    const hangeDelItem = (key) => {
      layoutData.value = layoutData.value.filter((item) => item.id != key);
    };

    return {
      layoutRef,
      layoutData,
      widgetConfigRef,
      handleResize,
      handleClick,
      handleInputFocus,
      handleClickImg,
      addNewNode,
      onChangeTab,
      hangeDelItem,
    };
  },
});
</script>

<style lang="less" scoped>
.widgets-module {
  display: flex;
  flex: auto;
  .widgets-layout {
    padding: 5px;
    flex: 1;
    position: relative;
    height: 100%;
    background: linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
    background-size: 10px 10px;
    ::v-deep(.vdr-stick) {
      border: none;
      background: green;
      width: 5px !important;
      height: 5px !important;
      border-radius: 100%;
    }
    ::v-deep(.content-container) {
      cursor: move;
    }
    .widgets-text {
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px dashed #d9d9d9;
    }
  }
}
</style>
