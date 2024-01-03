<template>
  <div
    class="container"
    ref="container"
    @mousemove="handleMouseMove"
    @mousedown="handleMouseDown"
    @mouseup="handleMouseUp"
  >
    <div class="rotate-container">
      <div class="line"></div>
      <div class="move">。</div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const isDragging = ref(false);
    const angle = ref(0);
    const container = ref(null);
    const handleMouseDown = (event) => {
      isDragging.value = true;
    };
    const handleMouseMove = (event) => {
      if (isDragging.value) {
        const centerX = container.value.offsetWidth;
        const centerY = container.value.offsetHeight;
        const dx = event.pageX - centerX;
        const dy = event.pageY - centerY;
        const angle = Math.atan2(dy, dx);
        console.log(angle);
        // angle.value = angle;
        rotateLine(angle);
      }
    };
    const handleMouseUp = (event) => {
      isDragging.value = false;
    };
    const rotateLine = (angle) => {
      const line = document.querySelector('.line');
      line.style.transform = `rotate(${angle}rad)`;
    };
    return { handleMouseDown, container, handleMouseMove, handleMouseUp };
  },
});
</script>

<style lang="less" scoped>
.container {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #000;
}

.rotate-container {
  position: absolute;
  // border: 1px solid red;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 2px;
  display: flex;
}

.line {
  position: absolute;
  top: -1px;
  left: 0;
  width: 100%;
  height: 100%;
  transform: rotate(225deg);
  background: #000;
  transform-origin: left center;
}
.move {
  position: absolute;
  top: -10px;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
