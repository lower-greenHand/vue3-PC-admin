<template>
  <div
    class="data-content"
    ref="scrollDom"
    :style="{ height: height + 'px' }"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <template v-if="scrollList && scrollList.length">
      <template v-for="item in scrollList" :key="item.id">
        <slot name="bodyItem" :item="item">
          <div class="history-item">
            <div class="history-item-title">
              <div>{{ item.id }}、</div>
              <div>{{ item.eventName }}（ {{ item.occurTime }}）</div>
            </div>
            <div class="history-item-des">简介：{{ item.description }}</div>
            <slot></slot>
          </div>
        </slot>
      </template>
    </template>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
export default defineComponent({
  name: 'ScrollList',
  props: {
    height: 300,
    scrollList: {
      default: () => [],
    },
  },
  setup() {
    const scrollDom = ref(null);
    const scrollTime = ref(null);
    /**
     * 开始滚动列表
     * scrollHeight  总高度
     * scrollTop 滚动条到总部距离
     * clientHeight 可是区域高度
     */
    const startScrollList = () => {
      let scrollEle = scrollDom.value;
      if (!scrollEle) {
        scrollEle = scrollDom.value;
      } else {
        if (scrollEle.children.length) {
          //只有两个的时候不让滚动
          if (scrollEle.children.length == 2) {
            clearInterval(scrollTime.value);
            return false;
          }
          scrollEle.scrollTop += 1;
          if (
            scrollEle.scrollTop ==
            scrollEle.scrollHeight - scrollEle.clientHeight
          ) {
            const firstEle = scrollEle.children[0];
            scrollEle.removeChild(firstEle);
            scrollEle.append(firstEle);
          }
        }
      }
    };

    const handleScroll = () => {
      scrollTime.value = setInterval(startScrollList, 50);
    };

    // 鼠标移动到列表上时停止滚动
    const handleMouseEnter = () => {
      clearInterval(scrollTime.value);
    };

    // 鼠标离开列表区域时开始滚动
    const handleMouseLeave = () => {
      handleScroll();
    };

    onMounted(() => {
      handleScroll();
    });

    // 组件销毁时终止
    onUnmounted(() => {
      clearInterval(scrollTime.value);
    });
    return { scrollDom, handleMouseEnter, handleMouseLeave };
  },
});
</script>

<style lang="less" scoped>
.data-content {
  width: 100%;
  height: 300px;
  overflow-y: auto;
  padding-top: 5px;
  .history-item {
    padding: 10px;
    margin-bottom: 15px;
    background: #f1f4fe;
    border-radius: 4px;
    &-title {
      display: flex;
      align-content: center;
      font-size: 16px;
      font-weight: bold;
    }
    &-des {
      margin-top: 5px;
    }
  }
  .title_2 {
    margin-bottom: 15px;
    background: #ffe141;
  }
}

.data-content::-webkit-scrollbar {
  width: 0;
}
</style>
