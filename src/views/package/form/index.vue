<template>
  <div class="demo">
    <VueDragResize
      :sticks="['tr']"
      :x="20"
      :y="20"
      :w="100"
      :h="70"
      :parent-limitation="true"
      @resizing="handleResize"
      @dragging="handleResize"
    >
      <div
        class="line"
        :style="{ width: lineObj.width + 'px', height: lineObj.height + 'px' }"
      >
        <div
          class="line-arrow"
          :style="{
            width: lineW + 'px',
            top: `${lineObj.height - 2}px`,
            transform: `rotate(${360 - lineRangle}deg)`,
          }"
        >
          0000
        </div>
      </div>
    </VueDragResize>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import VueDragResize from 'vue-drag-resize/src';
export default defineComponent({
  components: {
    VueDragResize,
  },
  setup() {
    const lineObj = reactive<any>({
      width: 100,
      height: 70,
    });
    const lineW = ref<number>(Number(Math.sqrt(100 ** 2 + 70 ** 2).toFixed(2)));
    const lineRangle = ref<any>(
      Number((Math.atan(70 / 100) * (180 / Math.PI)).toFixed(2))
    );
    const handleResize = (e) => {
      lineObj.width = e.width;
      lineObj.height = e.height;
      lineW.value = Number(Math.sqrt(e.width ** 2 + e.height ** 2).toFixed(2));
      lineRangle.value = Number(
        (Math.atan(e.height / e.width) * (180 / Math.PI)).toFixed(2)
      );
    };
    return { handleResize, lineW, lineRangle, lineObj };
  },
});
</script>

<style lang="less" scoped>
.demo {
  width: 100%;
  height: calc(100vh - 150px);
  border: 1px solid red;
  .line {
    position: relative;
    border: 1px solid blue;
    .line-arrow {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 1.5px;
      border: 1px solid green;
      transform-origin: left bottom;
    }
  }
}
</style>
